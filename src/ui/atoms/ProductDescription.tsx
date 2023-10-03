export const ProductDescription = ({ product }: { product: { name: string; price: number; }; }) => (
    <div className="flex flex-col justify-between">
        <h3 className="text-md font-bold">{product.name}</h3>
        <p className="text-sm font-semibold">{new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(product.price / 100)}</p>
    </div>
)