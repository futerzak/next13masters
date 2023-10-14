import React from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductRelatedGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

type RelatedProductProps = {
	productId: string;
	collectionSlug: string;
};

export async function RelatedProducts({ productId, collectionSlug }: RelatedProductProps) {
	const { products } = await executeGraphql({
		query: ProductRelatedGetListDocument,
		variables: {
			productId,
			collectionSlug,
		},
		next: {
			revalidate: 30,
		}
	});
	return (
		<aside data-testid="related-products">
			<h3 className="m-2 font-bold">Zobacz inne z tej kolekcji</h3>
			<ProductsList products={products.slice(0, 4)} />
		</aside>
	);
}
