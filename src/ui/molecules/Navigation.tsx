import Image from "next/image";
import React from "react";
import { SearchOnPage } from "../atoms/SearchOnPage";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";

export async function Navigation() {
    const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
            <div className="flex items-center">
                <Image src="https://via.placeholder.com/150x32" alt="Logo" className="h-8 mr-2" width={150} height={32} />
                <p className="text-lg font-bold">My App</p>
            </div>
            <nav className="flex flex-row gap-2">
                <SearchOnPage />
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
        </header >
    );
}

