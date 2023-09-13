import React from 'react'
import { fetchProductsWithPagination } from '@/utils/api/productsApi'
import { type ProductType } from '@/ui/molecules/Product'
import { ProductsList } from '@/ui/organisms/ProductsList'

export default async function PaginationProductList({ params }: { params: { page: number } }) {
    try {
        const products: ProductType[] | [] = await fetchProductsWithPagination(20, params.page)
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
