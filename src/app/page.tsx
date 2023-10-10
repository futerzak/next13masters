import { notFound } from "next/navigation";
import Link from "next/link";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function Home() {
  const { products } = await executeGraphql({
    query: ProductsGetListDocument,
    next: {
      revalidate: 1,
    }
  });

  if (!products.length) {
    notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsList products={products.slice(0, 4)} />
      <Link href="/collections/summer-vibes">Summer Vibes</Link>
    </main >
  );
}
