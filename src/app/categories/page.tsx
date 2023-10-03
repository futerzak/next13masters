import { executeGraphql } from "@/api/graphqlApi";
import { CategoriesGetListDocument } from "@/gql/graphql";

export default async function CategoriesPage() {
    const { categories } = await executeGraphql(CategoriesGetListDocument);
    console.log(categories)
    return (
        <main>
            <h1>Categories</h1>
            {!categories.length ? <p>No categories</p> : <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <a href={`/categories/${category.slug}`}>{category.name}</a>
                    </li>
                ))}
            </ul>}
        </main>
    )
}