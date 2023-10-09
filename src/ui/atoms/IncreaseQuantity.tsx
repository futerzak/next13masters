"use client";
import { experimental_useOptimistic as useOptimistic } from "react";


export function IncreaseQuantity({ itemId, quantity }: { itemId: string; quantity: number }) {
    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (_state, newQuantity: number) => newQuantity,
    );
    return (
        <form className="flex">
            <span className="w-8 text-center">{optimisticQuantity}</span>
            <button
                className="h-6 w-6 border"
                type="submit"
                formAction={async () => {
                    setOptimisticQuantity(optimisticQuantity + 1);
                    await changeItemQuantity(itemId, optimisticQuantity + 1);
                }}
            >
                +
            </button>
        </form>
    );
}

async function changeItemQuantity(itemId: string, quantity: number) {
    throw new Error("Function not implemented.");
}