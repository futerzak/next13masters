import React from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument, ProductsGetByCollectionSlugDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export const generateMetadata = async ({ params }: { params: { collectionSlug: string } }) => {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });

	const collection = collections.find((collection) => collection.slug === params.collectionSlug);

	return {
		title: `${collection?.name} `,
		description: collection?.description || "",
	};
};

export default async function CollectionsPage({ params }: { params: { collectionSlug: string } }) {
	const { collections: [collection] } = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument, variables: {
			slug: params.collectionSlug
		}
	});

	return (
		<div className="bg-gray-100 py-8">
			<h2 className="text-2xl font-bold mb-4">{collection.name}</h2>
			<ProductsList products={collection.products} />
		</div>
	);
}
