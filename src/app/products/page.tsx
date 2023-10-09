import { notFound } from 'next/navigation'
import { executeGraphql } from '@/api/graphqlApi';
import { ProductsGetListWithPaginationDocument } from '@/gql/graphql';
import { ProductsList } from '@/ui/organisms/ProductsList';

export const metadata = {
    title: "Wszystkie produkty - FUTERZAK sklep",
};

export default async function ProductsPage() {
    // redirect("/products/1");
    const { products } = await executeGraphql(ProductsGetListWithPaginationDocument, { first: 20, skip: 0 });

    if (!products.length) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24" >
            <section className="flex justify-between" >
                <ProductsList products={products} />
            </section>
        </main>
    )
}


