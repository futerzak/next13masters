import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductDescription } from "@/ui/atoms/ProductDescription";
import { ProductImage } from "@/ui/atoms/ProductImage";

export const Product = ({ product }: { product: ProductListItemFragment & { averageRating?: number } }) => {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-md">
			<article className="flex flex-col">
				<ProductImage image={{ src: product.images[0].url, alt: "" }} />
				<div className="flex flex-col justify-between p-4">
					<ProductDescription product={{ name: product.name, price: product.price, averageRating: product.averageRating }} />
				</div>
			</article>
		</div>
	);
};
