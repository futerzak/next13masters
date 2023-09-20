import React from 'react'
import { notFound } from 'next/navigation';
import { ProductsList } from '@/ui/organisms/ProductsList'
import { ProductsGetListDocument } from '@/gql/graphql';
import { executeGraphql } from '@/api/graphqlApi';

export const metadata = {
    title: "Wszystkie produkty - FUTERZAK sklep",
};

export default async function ProductsPage() {
    const { products } = await executeGraphql(ProductsGetListDocument);

    if (!products) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24" >
            <section className="flex justify-between" >
                {products.length ? <ProductsList products={products.slice(0, 4)} /> : <p>Products not found</p>}
            </section>
        </main>

    )
}


