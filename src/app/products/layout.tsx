import React from 'react'
import { ActiveLink } from '@/ui/atoms/ActiveLink'

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    const items = [];
    for (let i = 1; i <= 10; i++) {
        items.push(
            <li key={i}>
                <ActiveLink href={`/products/${i}`} className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300" activeClassName={''}>{i}</ActiveLink>
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
