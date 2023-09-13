export const ProductDescription = ({ product }: { product: { name: string; price: number; }; }) => <div className="flex flex-col justify-between">
    <h3 className="text-2xl font-bold">{product.name}</h3>
    <p className="text-xl font-semibold">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(product.price / 100)}</p>
</div>;
