import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	CartGetByIdDocument,
	CartCreateDocument,
	GetOrderItemByOrderIdAndProductIdDocument,
	CartUpsertItemDocument,
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

	const { orderItems } = await executeGraphql({
		query: GetOrderItemByOrderIdAndProductIdDocument,
		variables: {
			cartId,
			productId,
		},
		cache: "no-cache",
	});
	console.log(orderItems);

	await executeGraphql({
		query: CartUpsertItemDocument,
		variables: {
			cartId,
			productId,
			total: product.price,
			orderItemId: orderItems[0]?.id,
		},
		isTokenNeeded: true,
		cache: "no-cache",
	});
}
export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		return;
	}

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
	if (!cart) {
		return;
	}
	return cart;
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
