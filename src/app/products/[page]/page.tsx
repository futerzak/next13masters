import React from 'react'
import { notFound } from 'next/navigation'
import { paginationSize } from '@/utils/pagination'
import { ProductsGetAllDocument, ProductsGetListWithPaginationDocument } from '@/gql/graphql'
import { executeGraphql } from '@/api/graphqlApi'
import { ProductsList } from '@/ui/organisms/ProductsList'


export const generateStaticParams = async () => {
    const params = []
    const { products } = await executeGraphql({ query: ProductsGetAllDocument });
    const pagesCount = Math.ceil(products.length / (paginationSize))
    for (let i = 1; i <= pagesCount; i++) {
        params.push({ page: i.toString() })
    }
    return params
}

export async function generateMetadata({ params }: { params: { page: string } }) {
    return {
        title: `Products page ${params.page} - FUTERZAK sklep`,
        description: 'Products page',
    }
}

export default async function PaginationProductList({ params }: { params: { page: number } }) {
    const { products } = await executeGraphql({ query: ProductsGetListWithPaginationDocument, variables: { first: paginationSize, skip: (params.page - 1) * paginationSize } });

    if (!products.length) {
        notFound();
    }

    return (
        <main className="flex min-h-fit flex-col items-center justify-between p-24" >
            <Sorting />
            <section className="flex justify-between" >
                <ProductsList products={products} />
            </section>
        </main >
    )
}


const Sorting = () => {
    return (<>
        <select data-testid="sort-by" value={123}>
            <option data-testid="sort-by-price" value="price-asc">Sort by price (asc)</option>
            <option data-testid="sort-by-price" value="price-desc">Sort by price (desc)</option>
            <option data-testid="sort-by-rating" value="rating-asc">Sort by rating (asc)</option>
            <option data-testid="sort-by-rating" value="rating-desc">Sort by rating (desc)</option>
        </select >
    </>
    )
}