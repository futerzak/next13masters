import Image from "next/image";

export const ProductImage = ({ image }: { image: { src: string; alt: string; }; }) => (
    <picture className="max-w-xs aspect-square rounded-lg overflow-hidden">
        <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
        />
    </picture>
);
