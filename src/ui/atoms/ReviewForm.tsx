import React from "react";
import { type Review } from "@/gql/graphql";
import { addReviewAction } from "@/utils/addReviewAction";

export function ReviewForm({ productId, setReview }: { productId: string; setReview: (review: Review) => void; }) {
    return (
        <form className="flex flex-col" data-testid="add-review-form">
            <input type="hidden" name="productId" value={productId} />
            <label htmlFor="headline" className="mb-2 block text-lg text-gray-600">
                Headline:
            </label>
            <input
                type="text"
                name="headline"
                id="headline"
                className="mb-4 rounded-md border border-gray-400 p-2" />
            <label htmlFor="name" className="mb-2 block text-lg text-gray-600">
                Name:
            </label>
            <input
                type="text"
                name="name"
                id="name"
                className="mb-4 rounded-md border border-gray-400 p-2" />
            <label htmlFor="email" className="mb-2 block text-lg text-gray-600">
                Email:
            </label>
            <input
                type="text"
                name="email"
                id="email"
                className="mb-4 rounded-md border border-gray-400 p-2" />
            <label htmlFor="content" className="mb-2 block text-lg text-gray-600">
                Content:
            </label>
            <input
                type="text"
                name="content"
                id="content"
                className="mb-4 rounded-md border border-gray-400 p-2" />
            <label htmlFor="rating" className="mb-2 block text-lg text-gray-600">
                Rating:
            </label>
            <input
                min={1}
                max={5}
                type="range"
                name="rating"
                id="rating"
                className="mb-4 rounded-md border border-gray-400 p-2" />
            <button
                type="submit"
                formAction={async (formData: FormData) => {
                    setReview(
                        {
                            headline: formData.get("headline") as string,
                            name: formData.get("name") as string,
                            email: formData.get("email") as string,
                            content: formData.get("content") as string,
                            rating: parseInt(formData.get("rating") as string) || 1,
                            id: "",
                            stage: "DRAFT",
                            createdAt: undefined,
                            documentInStages: [],
                            history: [],
                            scheduledIn: [],
                            updatedAt: undefined
                        }
                    )
                    await addReviewAction(formData)
                }}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                Send
            </button>
        </form>
    );
}
