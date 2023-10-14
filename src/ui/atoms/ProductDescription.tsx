import { Star } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";


export const ProductDescription = ({ product }: { product: { name: string; price: number; averageRating?: number } }) => (
	<div className="flex flex-col justify-between">
		<h3 className="text-md font-bold">{product.name}</h3>
		<div className="flex justify-between">
			<p className="text-sm font-semibold" data-testid="product-price">
				{formatPrice(product.price)}
			</p>
			{product.averageRating && <p className="text-sm font-semibold" data-testid="product-rating"><Star height={20} className="inline" /> {Number(product.averageRating).toFixed(2)}</p>}
		</div>
	</div>
);
