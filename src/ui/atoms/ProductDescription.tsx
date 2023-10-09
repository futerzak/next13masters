import { formatPrice } from "@/utils/formatPrice";

export const ProductDescription = ({ product }: { product: { name: string; price: number; }; }) => (
    <div className="flex flex-col justify-between">
        <h3 className="text-md font-bold">{product.name}</h3>
        <p className="text-sm font-semibold" data-testid="product-price">
            {formatPrice(product.price)}
        </p>
    </div>
)