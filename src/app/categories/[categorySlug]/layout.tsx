import React from 'react'
import { ActiveLink } from '@/ui/atoms/ActiveLink'
import { executeGraphql } from '@/api/graphqlApi';
import { ProductsGetByCategorySlugDocument } from '@/gql/graphql';
// import { paginationSize } from '@/utils/pagination';

export default async function CategoriesLayout({ children, params }: {
    children: React.ReactNode, params: { categorySlug: string }
}) {
    const items = [];
    const { categories: [{ products }] } = await executeGraphql(ProductsGetByCategorySlugDocument, {
        slug: params.categorySlug,
    });
    const pagesCount = Math.ceil(products.length / (2)) // change to paginationSize const
    for (let i = 1; i <= pagesCount; i++) {
        items.push(
            <li key={i}>
                <ActiveLink href={`/categories/${params.categorySlug}/${i}`} className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300" activeClassName={'bg-blue-200'}>{i}</ActiveLink>
            </li>
        );
    }

    return (
        <>
            <nav className='mt-2' aria-label="pagination">
                <ul className='flex space-x-2 justify-center'>{items}</ul>
            </nav>
            {children}
        </>
    );
}