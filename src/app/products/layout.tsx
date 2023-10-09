import React from 'react'
import { ActiveLink } from '@/ui/atoms/ActiveLink'
import { executeGraphql } from '@/api/graphqlApi';
import { ProductsGetAllDocument } from '@/gql/graphql';
import { paginationSize } from '@/utils/pagination';

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
    const items = [];
    const { products } = await executeGraphql({ query: ProductsGetAllDocument });
    const pagesCount = Math.ceil(products.length / (paginationSize))
    for (let i = 1; i <= pagesCount; i++) {
        items.push(
            <li key={i}>
                <ActiveLink href={`/products/${i}`} className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300" activeClassName={'bg-blue-200'}>{i}</ActiveLink>
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
