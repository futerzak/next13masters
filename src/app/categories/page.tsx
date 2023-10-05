import NextImage from "next/image";
import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";


export default async function CategoriesPage() {
    const { categories } = await executeGraphql(CategoriesGetListDocument);

    return (
        <main>
            <h1 className="text-3xl font-bold mb-8">Categories</h1>
            {!categories.length ? <p>No categories</p> :
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <li key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                                    <h2 className="text-lg font-bold mb-2">{category.name}</h2>
                                    <p className="text-gray-700">{category.description}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>}
        </main>
    )
}