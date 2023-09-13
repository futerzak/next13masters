import React from 'react'
import Image from 'next/image'
import { type ProductType } from '@/ui/molecules/Product'
import { getProductById } from '@/utils/api/productsApi'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product: ProductType | undefined = await getProductById(params.id)
    return {
        title: `${product.title} - FUTERZAK sklep`,
        description: product.description || '',
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    try {
        const product: ProductType | undefined = await getProductById(params.id)
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <section className="flex justify-between" >
                    {product ?
                        <section className="flex justify-between w-full">
                            <article className="w-1/2">
                                <Image src={product.image} alt={product.title} className="w-full" />
                            </article>
                            <article className="w-1/2 px-8">
                                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                                <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                                <p className="text-gray-600 text-lg mb-4">Price: {product.price} zł</p>
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Add to cart
                                </button>
                            </article>
                        </section>
                        : <p>Product not found</p>}
                </section>
            </main>
        )
    } catch (error) {
        console.log(error)
        return <p>Product not found</p>
    }
}


