import React from 'react'
import { notFound } from 'next/navigation';
import { ProductsList } from '@/ui/organisms/ProductsList'
import { type ProductListItemFragment, } from '@/gql/graphql';
import { fetchProductsWithLimit } from '@/api/productsApi';

export const metadata = {
    title: "Wszystkie produkty - FUTERZAK sklep",
};

type ProductType = {
    id: string;
    title: string;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
    longDescription: string;
    price: number;
};

const productsMapper = (products: ProductType[]): ProductListItemFragment[] => products.map((product) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    price: product.price,
    categories: [{ name: product.category }],
    images: [{ url: product.image }],
}));


export default async function ProductsPage() {
    try {
        const products: ProductType[] | [] = await fetchProductsWithLimit(20)

        if (!products) {
            notFound();
        }
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24" >
                <section className="flex justify-between" >
                    {products.length ? <ProductsList products={productsMapper(products)} /> : <p>Products not found</p>}
                </section>
            </main>

        )
    } catch (error) {
        console.log(error)
        return <p>Products not found</p>
    }
}

// const { products } = await executeGraphql(ProductsGetListDocument);

// if (!products) {
//     notFound();
// }

// return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24" >
//         <section className="flex justify-between" >
//             {products.length ? <ProductsList products={products.slice(0, 20)} /> : <p>Products not found</p>}
//         </section>
//     </main>

// )
// }


