import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { executeGraphql } from '@/api/graphqlApi'
import { ProductGetByIdDocument } from '@/gql/graphql'
import { RelatedProduct } from '@/ui/molecules/RelatedProduct'

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
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="flex justify-between" >
                {product ?
                    <section className="flex justify-between w-full">
                        <article className="w-1/2">
                            <Image src={product.images[0].url} alt={product.name} className="w-full" width={320} height={430} />
                        </article>
                        <article className="w-1/2 px-8">
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                            <p className="text-gray-600 text-lg mb-4">Price: {product.price / 100} zł</p>
                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                Add to cart
                            </button>
                        </article>
                    </section>
                    : <p>Product not found</p>}
            </section>
            <section className="flex justify-between w-full mt-8">
                <RelatedProduct productId={product.id} collectionSlug={product.collections[0].slug} />
            </section>
        </main>
    )

}

