"use server";
import { executeGraphql } from "@/api/graphqlApi";
import { ReviewCreateDocument } from "@/gql/graphql";

export const addReviewAction = async (formData: FormData) => {
	const input = {
		headline: formData.get("headline") as string,
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		content: formData.get("content") as string,
		rating: parseInt(formData.get("rating") as string) || 1,
		productId: formData.get("productId") as string,
	};

	const result = await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			...input,
		},
		isTokenNeeded: true,
	});
	console.log(result);
};
