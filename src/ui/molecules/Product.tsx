import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";

export type ProductType = {
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

export const Product = ({ product }: { product: ProductType }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <article className="flex flex-col md:flex-row">
                <ProductImage image={{ src: product.image, alt: product.title }} />
                <div className="p-4 flex flex-col justify-between">
                    <ProductDescription product={{ name: product.title, price: product.price }} />
                    <div className="flex items-center mt-4">
                        <span className="text-sm text-gray-600">{product.rating.rate.toFixed(1)}</span>
                        <svg className="h-4 w-4 fill-current text-yellow-500 ml-2" viewBox="0 0 24 24">
                            <path d="M12 2.69l2.76 6.29a1 1 0 0 0 .9.59h7.1a1 1 0 0 1 .73 1.68l-5.46 4.72a1 1 0 0 0-.29.88l2.06 6.68a1 1 0 0 1-1.54 1.12L12 18.81l-6.36 4.07a1 1 0 0 1-1.54-1.12l2.06-6.68a1 1 0 0 0-.29-.88L.37 11.26a1 1 0 0 1 .73-1.68h7.1a1 1 0 0 0 .9-.59L12 2.69z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-2">{product.rating.count} reviews</span>
                    </div>
                </div>
            </article>
        </div>
    );
};


