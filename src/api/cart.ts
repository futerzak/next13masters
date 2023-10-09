import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	CartGetByIdDocument,
	CartCreateDocument,
	CartAddItemDocument,
} from "@/gql/graphql";

export async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
		},
		isTokenNeeded: true,
	});
}
export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			isTokenNeeded: true,
			next: {
				tags: ["cart"],
			},
		});
		if (cart) {
			return cart;
		}
	}
}

export async function getOrCreateCart() {
	const cart = await getCartFromCookies();
	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		isTokenNeeded: true,
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
}
