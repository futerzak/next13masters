import React, { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cookies } from "next/headers";
import { executeGraphql } from '@/api/graphqlApi'
import { ProductGetByIdDocument, CartGetByIdDocument, CartCreateDocument, CartAddItemDocument } from '@/gql/graphql'
import { RelatedProduct } from '@/ui/molecules/RelatedProduct'
import { AddToCartButton } from '@/ui/atoms/AddToCartButton';

async function addProductToCart(cartId: string, productId: string) {
    const { product } = await executeGraphql(ProductGetByIdDocument, {
        id: productId,
    });
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    await executeGraphql(CartAddItemDocument, {
        cartId,
        productId,
        total: product.price,
    });
}

async function getOrCreateCart() {
    const cartId = cookies().get("cartId")?.value;
    if (cartId) {
        const { order: cart } = await executeGraphql(CartGetByIdDocument, {
            id: cartId,
        });
        if (cart) {
            return cart;
        }
    }

    const { createOrder: newCart } = await executeGraphql(CartCreateDocument);
    if (!newCart) {
        throw new Error("Failed to create cart");
    }

    cookies().set("cartId", newCart.id);
    return newCart;
}

export async function generateMetadata({ params }: { params: { id: string } }) {

    const { product } = await executeGraphql(ProductGetByIdDocument, {
        id: params.id,
    });
    return {
        title: `${product?.name} - FUTERZAK sklep`,
        description: product?.description || '',
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {

    const { product } = await executeGraphql(ProductGetByIdDocument, {
        id: params.id,
    });

    if (!product) {
        notFound();
    }

    const addProductToCartAction = async () => {
        "use server";
        const cart = await getOrCreateCart();
        await addProductToCart(cart.id, product.id);
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="flex justify-between">
                {product ?
                    <form action={addProductToCartAction} className="flex justify-between w-full">
                        <input type="text" name="productId" value={product.id} hidden />
                        <article className="w-1/2">
                            <Image src={product.images[0].url} alt={product.name} className="w-full" width={320} height={430} />
                        </article>
                        <article className="w-1/2 px-8">
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                            <p className="text-gray-600 text-lg mb-4">Price: {product.price / 100} zł</p>
                            {!!product.variants.length && <Variants variants={product.variants} />}
                            <AddToCartButton />
                        </article>
                    </form>
                    : <p>Product not found</p>}
            </section>
            <section className="flex justify-between w-full mt-8">
                <Suspense>
                    <RelatedProduct productId={product.id} collectionSlug={product.collections[0].slug} />
                </Suspense>
            </section>
            <section>
                <ReviewForm />
            </section>
        </main>
    )

}


function ReviewForm() {
    return (
        <form aria-testid="add-review-form">
            <input type="text" name='headline' />
            <input type="text" name="name" />
            <input type="text" name="email" />
            <input type="text" name="content" />
            <input type="number" name="rating" />
            <button type="submit">Send</button>
        </form>
    )
}



function Variants({ variants }: { variants: { id: string, name?: string, color?: string, size?: string }[] }) {
    return (
        <div className="mb-4">
            <label htmlFor="variants" className="text-gray-600 text-lg mb-2 block">Variants:</label>
            <select id="variants" name="variants">
                {variants.map((variant) => (
                    <option key={variant.id} value={JSON.stringify(variant)}>{variant.name}</option>
                ))}
            </select>
        </div>
    )
}