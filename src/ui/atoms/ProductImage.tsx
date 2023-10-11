import NextImage from "next/image";

export const ProductImage = ({ image }: { image: { src: string; alt: string } }) => (
	<picture className="aspect-square max-w-xs overflow-hidden rounded-lg transition-transform hover:scale-110">
		<NextImage src={image.src} alt={image.alt} width={300} height={300} />
	</picture>
);
