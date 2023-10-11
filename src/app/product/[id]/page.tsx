import React, { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductGetByIdDocument, ReviewCreateDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/molecules/RelatedProducts";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addProductToCart } from "@/api/cart";
import { formatPrice } from "@/utils/formatPrice";

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
			revalidate: 30,
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
			<section className="mt-8 flex w-full justify-start gap-10">
				<ReviewForm productId={product.id} />
				<Reviews reviews={product.reviews} />
			</section>
		</main>
	);
}

interface Review {
	id: string;
	headline: string;
	content: string;
	rating: number;
	name: string;
}

interface ReviewsProps {
	reviews: Review[];
}

function Reviews({ reviews }: ReviewsProps) {
	return (
		<div className="flex flex-col ">
			<h2 className="mb-4 text-2xl font-bold">Reviews</h2>
			{reviews.map((review) => (
				<article key={review.id} className="mb-4 rounded-md border border-gray-400 p-4">
					<h3 className="mb-2 text-lg font-bold">{review.headline}</h3>
					<p className="mb-2 text-gray-600">{review.content}</p>
					<p className="mb-2 text-gray-600">Rating: {review.rating}</p>
					<p className="mb-2 text-gray-600">By: {review.name}</p>
				</article>
			))}
		</div>
	);
}

function ReviewForm({ productId }: { productId: string }) {
	const addReviewAction = async (formData: FormData) => {
		"use server";

		const input = {
			headline: formData.get("headline") as string,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			content: formData.get("content") as string,
			rating: parseInt(formData.get("rating") as string) || 1,
			productId: productId,
		};

		await executeGraphql({
			query: ReviewCreateDocument,
			variables: {
				...input,
			},
			isTokenNeeded: true,
		});
	};

	return (
		<form action={addReviewAction} className="flex flex-col" data-testid="add-review-form">
			<label htmlFor="headline" className="mb-2 block text-lg text-gray-600">
				Headline:
			</label>
			<input
				type="text"
				name="headline"
				id="headline"
				className="mb-4 rounded-md border border-gray-400 p-2"
			/>
			<label htmlFor="name" className="mb-2 block text-lg text-gray-600">
				Name:
			</label>
			<input
				type="text"
				name="name"
				id="name"
				className="mb-4 rounded-md border border-gray-400 p-2"
			/>
			<label htmlFor="email" className="mb-2 block text-lg text-gray-600">
				Email:
			</label>
			<input
				type="text"
				name="email"
				id="email"
				className="mb-4 rounded-md border border-gray-400 p-2"
			/>
			<label htmlFor="content" className="mb-2 block text-lg text-gray-600">
				Content:
			</label>
			<input
				type="text"
				name="content"
				id="content"
				className="mb-4 rounded-md border border-gray-400 p-2"
			/>
			<label htmlFor="rating" className="mb-2 block text-lg text-gray-600">
				Rating:
			</label>
			<input
				min={1}
				max={5}
				type="range"
				name="rating"
				id="rating"
				className="mb-4 rounded-md border border-gray-400 p-2"
			/>
			<button
				type="submit"
				className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Send
			</button>
		</form>
	);
}

function Variants({
	variants,
}: {
	variants: { id: string; name?: string; color?: string; size?: string }[];
}) {
	return (
		<div className="mb-4">
			<label htmlFor="variants" className="mb-2 block text-lg text-gray-600">
				Variants:
			</label>
			<select id="variants" name="variants">
				{variants.map((variant) => (
					<option key={variant.id} value={JSON.stringify(variant)}>
						{variant.name}
					</option>
				))}
			</select>
		</div>
	);
}
