
import React from 'react'
// import { paginationSize } from '@/utils/pagination';
import { executeGraphql } from '@/api/graphqlApi';
import { ProductsGetByCategorySlugDocument } from '@/gql/graphql';
import { ProductsList } from '@/ui/organisms/ProductsList';

export default async function CategorySlugPage({ params }: { params: { categorySlug: string, pageNumber: string } }) {

    const { categorySlug, pageNumber } = params;
    const { categories: [{ products }] } = await executeGraphql(ProductsGetByCategorySlugDocument, {
        slug: categorySlug,
        skip: (parseInt(pageNumber) - 1) * 2,
        first: 2,
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24" >
            <section className="flex justify-between" >
                <ProductsList products={products} />
            </section>
        </main>
    )
}
