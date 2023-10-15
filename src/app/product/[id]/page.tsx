import React, { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import { type Product, ProductGetByIdDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/molecules/RelatedProducts";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addProductToCart } from "@/api/cart";
import { formatPrice } from "@/utils/formatPrice";
import { Variants } from "@/ui/atoms/Variants";
import { Reviews } from "@/ui/organisms/Reviews";

export async function generateMetadata({ params }: { params: { id: string } }) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: params.id,
		},
		next: {
			revalidate: 30,
		}
	});
	return {
		title: product?.name || "",
		description: product?.description || "",
	};
}

export default async function ProductPage({ params }: { params: { id: string } }) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: params.id,
		},
		next: {
			revalidate: 5,
		}
	});

	if (!product) {
		notFound();
	}

	const addProductToCartAction = async () => {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, product.id);

		revalidateTag(`cart`);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<section className="flex justify-between">
				{product ? (
					<form action={addProductToCartAction} className="flex w-full justify-between">
						<article className="w-1/2">
							<Image
								src={product.images[0].url}
								alt={product.name}
								className="w-full"
								width={320}
								height={430}
							/>
						</article>
						<article className="w-1/2 px-8">
							<h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
							<p className="mb-4 text-lg text-gray-600">{product.description}</p>
							<p className="mb-4 text-lg text-gray-600">Price: {formatPrice(product.price)}</p>
							{!!product.variants.length && <Variants variants={product.variants} />}
							<AddToCartButton />
						</article>
					</form>
				) : (
					<p>Product not found</p>
				)}
			</section>
			<section className="mt-8 flex w-full justify-between">
				<Suspense>
					<RelatedProducts productId={product.id} collectionSlug={product.collections[0].slug} />
				</Suspense>
			</section>
			<Reviews product={product as Product} />
		</main>
	);
}


