import React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { SearchOnPage } from "../atoms/SearchOnPage";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { getCartFromCookies } from "@/api/cart";

export async function Navigation() {
	// const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
	const categories = [
		{ id: 1, slug: 't-shirts', name: 'T-Shirts' },
		{ id: 2, slug: 'hoodies', name: 'Hoodies' },
		{ id: 3, slug: 'accessories', name: 'Accessories' }
	];

	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.length ?? 0;
	return (
		<header className="flex items-center justify-between bg-gray-800 px-8 py-4 text-white">
			<nav className="flex flex-row gap-2">
				<ul className="flex justify-center space-x-4">
					<li>
						<ActiveLink
							className="text-red-300 hover:text-red-900"
							activeClassName="border-b-2 border-red-900"
							href={"/"}
							exact
						>
							Home
						</ActiveLink>
					</li>
					<li>
						<ActiveLink
							className="text-red-300 hover:text-red-900"
							activeClassName="border-b-2 border-red-900"
							href={"/products"}
						>
							All
						</ActiveLink>
					</li>
					{categories.map((category) => (
						<ActiveLink
							key={category.id}
							className="text-red-300 hover:text-red-900"
							activeClassName="border-b-2 border-red-900"
							href={`/categories/${category.slug}`}
						>
							{category.name}
						</ActiveLink>
					))}
				</ul>
			</nav>
			<div className="flex gap-4">
				<SearchOnPage />

				<Link href="/cart/sidebar">
					<div className="flex items-center">
						<ShoppingCartIcon size={24} />
						<span className="ml-1">{quantity}</span>
					</div>
				</Link>
			</div>
		</header>
	);
}
