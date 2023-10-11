export function formatPrice(price: number): string {
	return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(price / 100);
}
