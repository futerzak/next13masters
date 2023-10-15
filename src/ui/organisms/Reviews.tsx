"use client"
import React, { experimental_useOptimistic as useOptimistic } from "react";
import { ReviewsList } from "@/ui/atoms/ReviewsList";
import { ReviewForm } from "@/ui/atoms/ReviewForm";
import { type Review, type Product } from "@/gql/graphql";


export function Reviews({ product }: { product: Product; }) {
    const [reviews, setReviews] = useOptimistic<Review[]>(
        product.reviews
    );

    const addReview = (review: Review) => {
        setReviews(prevReviews => [...prevReviews, review]);
    };

    return (
        <section className="mt-8 flex w-full justify-start gap-10">
            <ReviewForm productId={product.id} setReview={addReview} />
            <ReviewsList reviews={reviews} />
        </section>
    );
}
