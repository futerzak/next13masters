import React from "react";
import Link from "next/link";
import { SearchOnPage } from "../atoms/SearchOnPage";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { getCartFromCookies } from "@/api/cart";

export async function Navigation() {
    const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
    const cart = await getCartFromCookies();
    const quantity = cart?.orderItems.length ?? 0;
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
            <nav className="flex flex-row gap-2">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/"}
                            exact
                        >Home</ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={"/products"}
                        >All</ActiveLink>
                    </li>
                    {categories.map((category) => (
                        <ActiveLink
                            key={category.id}
                            className="text-red-300 hover:text-red-900"
                            activeClassName="border-b-2 border-red-900"
                            href={`/categories/${category.slug}`}
                        >{category.name}</ActiveLink>
                    ))}
                </ul>
            </nav>
            <div className="flex gap-4">
                <SearchOnPage />
                <Link href="/cart">CART ICON <span>{quantity}</span></Link>
            </div>
        </header >
    );
}

