import React from "react";

export function ReviewsList({ reviews }: ReviewsProps) {
    return (
        <div className="flex flex-col ">
            <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
            {reviews.map((review) => (
                <article key={review.id} className="mb-4 rounded-md border border-gray-400 p-4">
                    <h3 className="mb-2 text-lg font-bold">{review.headline}</h3>
                    <p className="mb-2 text-gray-600">{review.content}</p>
                    <p className="mb-2 text-gray-600">Rating: {review.rating}</p>
                    <p className="mb-2 text-gray-600">By: {review.name}</p>
                </article>
            ))}
        </div>
    );
}
export interface Review {
    id: string;
    headline: string;
    content: string;
    rating: number;
    name: string;
}

export interface ReviewsProps {
    reviews: Review[];
}
