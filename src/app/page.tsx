
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default function Home() {
  const products: ProductListItemFragment[] = [
    {
      id: "1",
      name: "Product 1",
      description: "This is the first product",
      price: 9.99,
      categories: [{ name: "Category 1" }],
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: "2",
      name: "Product 2",
      description: "This is the second product",
      price: 19.99,
      categories: [{ name: "Category 2" }],
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: "3",
      name: "Product 3",
      description: "This is the third product",
      price: 29.99,
      categories: [{ name: "Category 3" }],
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: "4",
      name: "Product 4",
      description: "This is the fourth product",
      price: 39.99,
      categories: [{ name: "Category 4" }],
      images: [{ url: "https://via.placeholder.com/150" }],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsList products={products} />
    </main >
  );
}