import React from 'react'
import { ProductsList } from '@/ui/organisms/ProductsList'
import { type ProductType } from '@/ui/molecules/Product';
import { fetchProductsWithLimit } from '@/utils/api/productsApi';

export const metadata = {
    title: "Wszystkie produkty - FUTERZAK sklep",
};

export default async function ProductsPage() {
    try {
        const products: ProductType[] | [] = await fetchProductsWithLimit(20)
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24" >
                <section className="flex justify-between" >
                    {products.length ? <ProductsList products={products} /> : <p>Products not found</p>}
                </section>
            </main>

        )
    } catch (error) {
        console.log(error)
        return <p>Products not found</p>
    }
}


