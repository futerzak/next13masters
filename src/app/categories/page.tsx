import NextImage from "next/image";
import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";

export default async function CategoriesPage() {
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });

	return (
		<main>
			<h1 className="mb-8 text-3xl font-bold">Categories</h1>
			{!categories.length ? (
				<p>No categories</p>
			) : (
				<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
					{categories.map((category) => (
						<li key={category.id} className="overflow-hidden rounded-lg bg-white shadow-md">
							<a href={`/categories/${category.slug}`}>
								<div className="relative h-48">
									<NextImage
										src={`https://source.unsplash.com/400x300/?${category.name}`}
										alt={category.name}
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<div className="p-4">
									<h2 className="mb-2 text-lg font-bold">{category.name}</h2>
									<p className="text-gray-700">{category.description}</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
