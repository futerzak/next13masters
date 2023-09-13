import React from "react";
import Link from "next/link";
import { Product, type ProductType } from "@/ui/molecules/Product";

export const ProductsList = ({ products }: { products: ProductType[]; }) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8" data-testid="products-list">
            {products.map((product) => (
                <li key={product.id}>
                    <Link href={`/product/${product.id}`}>
                        <Product product={product} />
                    </Link>
                </li>
            ))}
        </ul>

    );
};
