import { notFound } from "next/navigation";
import Link from "next/link";
import { executeGraphql } from "@/api/graphqlApi";
import { CollectionsGetListDocument, ProductsGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function Home() {
  const { products } = await executeGraphql({ query: ProductsGetListDocument });
  const { collections } = await executeGraphql({ query: CollectionsGetListDocument });

  if (!products.length) {
    notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsList products={products.slice(0, 4)} />
      {!collections.length ? <p>Coming soon...</p> : <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link href={`/collections/${collection.slug}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>}
    </main >
  );
}
