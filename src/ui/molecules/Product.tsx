import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";

export const Product = ({ product }: { product: ProductListItemFragment }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <article className="flex flex-col md:flex-row">
                <ProductImage image={{ src: product.images[0].url, alt: '' }} />
                <div className="p-4 flex flex-col justify-between">
                    <ProductDescription product={{ name: product.name, price: product.price }} />
                </div>
            </article>
        </div>
    );
};


