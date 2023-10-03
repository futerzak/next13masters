import { redirect } from 'next/navigation'

export const metadata = {
    title: "Wszystkie produkty - FUTERZAK sklep",
};

export default async function ProductsPage() {
    redirect("/products/1");
}


