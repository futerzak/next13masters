"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function AddToCartButton() {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			disabled={status.pending}
			className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white disabled:cursor-wait disabled:bg-slate-400"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</button>
	);
}
