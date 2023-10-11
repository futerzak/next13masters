"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { CardRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
		isTokenNeeded: true,
		cache: "no-store",
	});
};

export const removeItem = (itemId: string) => {
	return executeGraphql({
		query: CardRemoveProductDocument,
		variables: {
			itemId,
		},
		cache: "no-store",
		isTokenNeeded: true,
	});
};
