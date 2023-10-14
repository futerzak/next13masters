import React from "react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetAllDocument } from "@/gql/graphql";
import { paginationSize } from "@/utils/pagination";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
	const items = [];
	const { products } = await executeGraphql({
		query: ProductsGetAllDocument,
		next: {
			revalidate: 30,
		}
	});
	const pagesCount = Math.ceil(products.length / paginationSize);
	for (let i = 1; i <= pagesCount; i++) {
		items.push(
			<li key={i}>
				<ActiveLink
					href={`/products/${i}`}
					className="rounded-md bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300"
					activeClassName={"border-gray-500 border-2"}
				>
					{i}
				</ActiveLink>
			</li>,
		);
	}

	return (
		<>
			{children}
			<nav className="mt-2" aria-label="pagination">
				<ul className="flex justify-center space-x-2">{items}</ul>
			</nav>
		</>
	);
}
