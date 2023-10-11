import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument } from "@/gql/graphql";

export default async function CollectionsPage() {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });
	return (
		<main>
			<h1>Collections</h1>
			{!collections.length ? (
				<p>Coming soon...</p>
			) : (
				<ul>
					{collections.map((collection) => (
						<li key={collection.id}>
							<a href={`/collections/${collection.slug}`}>{collection.name}</a>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
