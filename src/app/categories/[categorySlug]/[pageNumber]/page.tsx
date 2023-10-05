
import React from 'react'
// import { paginationSize } from '@/utils/pagination';
import { executeGraphql } from '@/api/graphqlApi';
import { ProductsGetByCategorySlugDocument } from '@/gql/graphql';
import { ProductsList } from '@/ui/organisms/ProductsList';

export async function generateMetadata({ params }: { params: { categorySlug: string, pageNumber: string } }) {
    const { categorySlug } = params;

    const { categories: [{ name, description }] } = await executeGraphql(ProductsGetByCategorySlugDocument, {
        slug: categorySlug,
    });
    return {
        title: name || '',
        description: description || '',
        openGraph: {
            title: name || '',
            description: description || '',
        },
    }
}

export default async function CategorySlugPage({ params }: { params: { categorySlug: string, pageNumber: string } }) {
    const { categorySlug, pageNumber } = params;

    const { categories: [{ products, name }] } = await executeGraphql(ProductsGetByCategorySlugDocument, {
        slug: categorySlug,
        skip: (parseInt(pageNumber) - 1) * 2,
        first: 2,
    });

    return (
        <main className="flex min-h-screen flex-col items-center p-5 gap-10" >
            <h2>{name}</h2>
            <section className="flex justify-between" >
                <ProductsList products={products} />
            </section>
        </main>
    )
}
