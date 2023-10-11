import React from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetByCategorySlugDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { paginationSize } from "@/utils/pagination";

export async function generateMetadata({
	params,
}: {
	params: { categorySlug: string; pageNumber: string };
}) {
	const { categorySlug } = params;

	const {
		categories: [{ name, description }],
	} = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
		},
	});
	return {
		title: name || "",
		description: description || "",
		openGraph: {
			title: name || "",
			description: description || "",
		},
	};
}

export default async function CategorySlugPage({
	params,
}: {
	params: { categorySlug: string; pageNumber: string };
}) {
	const { categorySlug, pageNumber } = params;

	const {
		categories: [{ products, name }],
	} = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
			skip: (parseInt(pageNumber) - 1) * paginationSize,
			first: paginationSize,
		},
	});

	return (
		<main className="flex min-h-fit flex-col items-center gap-10 p-5">
			<h2>{name}</h2>
			<section className="flex justify-between">
				<ProductsList products={products} />
			</section>
		</main>
	);
}
