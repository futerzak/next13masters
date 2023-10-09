import React, { } from 'react'
import { ProductsSearchGetListDocument } from '@/gql/graphql';
import { ProductsList } from '@/ui/organisms/ProductsList';
import { executeGraphql } from '@/api/graphqlApi';

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams
    const { products } = await executeGraphql({ query: ProductsSearchGetListDocument, variables: { query } });

    return (
        <main >
            <h1 className="text-4xl font-bold  my-10" >Search results for: {query}</h1>
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                {products.length ? <section className="flex justify-between" >
                    <ProductsList products={products} />
                </section> : <p className="text-2xl font-bold">No results for this query</p>}
            </div>
        </main >
    )
}

