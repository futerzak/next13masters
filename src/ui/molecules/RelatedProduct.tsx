import React from "react";
import { executeGraphql } from "@/api/graphqlApi";
import { ProductRelatedGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export async function RelatedProduct({ productId, collectionSlug }: { productId: string; collectionSlug: string; }) {
    const { products } = await executeGraphql(ProductRelatedGetListDocument, {
        productId,
        collectionSlug
    });
    return (
        <aside data-testid="related-products">
            <ProductsList products={products.slice(0, 4)} />
        </aside>
    );
}
