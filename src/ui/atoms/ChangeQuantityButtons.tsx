"use client";
import { useOptimistic } from "react";
import { changeItemQuantity } from "@/app/cart/actions";


export function ChangeQuantityButtons({ itemId, quantity }: { itemId: string; quantity: number }) {
    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (_state, newQuantity: number) => newQuantity,
    );
    return (
        <form className="flex">
            <button
                className="h-6 w-6 border"
                type="submit"
                formAction={async () => {
                    setOptimisticQuantity(optimisticQuantity - 1);
                    await changeItemQuantity(itemId, optimisticQuantity - 1);
                }}
                data-testid="decrement"
            >
                -
            </button>
            <span className="w-8 text-center" data-testid="quantity">{optimisticQuantity}</span>
            <button
                className="h-6 w-6 border"
                type="submit"
                formAction={async () => {
                    setOptimisticQuantity(optimisticQuantity + 1);
                    await changeItemQuantity(itemId, optimisticQuantity + 1);
                }}
                data-testid="increment"
            >
                +
            </button>
        </form>
    );
}

