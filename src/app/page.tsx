import { notFound } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
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
    <main className="flex min-h-fit flex-col items-center justify-between p-24">
      <h2>Collections</h2>
      <Collections />
      <h2>Products</h2>
      <ProductsList products={products.slice(0, 4)} />
    </main >
  );
}

const Collections = () => {
  const collections = [
    { name: 'Summer Vibes', slug: 'summer-vibes', image: 'https://media.graphassets.com/Qb2JcdjORl6e3K1JXnhQ' },
    { name: 'New Arrivals', slug: 'new-arrivals', image: 'https://media.graphassets.com/LdwTjLJKRj63YxVyFJQs' },
    { name: 'Elegant Extras', slug: 'elegant-extras', image: 'https://media.graphassets.com/8CrPmTovTuOMZJxqXVHu' },
  ];
  return (
    <div className="grid grid-cols-3 gap-8 w-full">
      {collections.map((collection) => (
        <Link key={collection.slug} href={`/collections/${collection.slug}`}>
          <div key={collection.slug} className="flex flex-col items-center hover:scale-110 transition-all">
            <Image src={collection.image} alt={collection.name} width={500} height={300} className="rounded-lg" />
            <h3>{collection.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}