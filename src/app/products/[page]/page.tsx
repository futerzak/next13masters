import React from "react";
import { notFound } from "next/navigation";
import { Sorting } from "@/ui/atoms/Sorting";
import { paginationSize } from "@/utils/pagination";
import {
	type ProductOrderByInput,
	ProductsGetAllDocument,
	ProductsGetListWithPaginationDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsList } from "@/ui/organisms/ProductsList";

export const generateStaticParams = async () => {
	const params = [];
	const { products } = await executeGraphql({ query: ProductsGetAllDocument });
	const pagesCount = Math.ceil(products.length / paginationSize);
	for (let i = 1; i <= pagesCount; i++) {
		params.push({ page: i.toString() });
	}
	return params;
};

export async function generateMetadata({ params }: { params: { page: string } }) {
	return {
		title: `Products page ${params.page} - FUTERZAK sklep`,
		description: "Products page",
	};
}

export default async function PaginationProductList({
	params,
	searchParams,
}: {
	params: { page: number };
	searchParams: { orderBy: ProductOrderByInput };
}) {
	const { products } = await executeGraphql({
		query: ProductsGetListWithPaginationDocument,
		variables: {
			first: paginationSize,
			skip: (params.page - 1) * paginationSize,
			orderBy: searchParams.orderBy,
		},
		next: {
			revalidate: 30,
		}
	});

	if (!products.length) {
		notFound();
	}

	return (
		<main className="flex min-h-fit flex-col items-center justify-between p-24">
			<Sorting />
			<section className="flex justify-between">
				<ProductsList products={products} />
			</section>
		</main>
	);
}
