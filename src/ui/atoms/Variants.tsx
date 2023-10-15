import React from "react";

export function Variants({
    variants,
}: {
    variants: { id: string; name?: string; color?: string; size?: string; }[];
}) {
    return (
        <div className="mb-4">
            <label htmlFor="variants" className="mb-2 block text-lg text-gray-600">
                Variants:
            </label>
            <select id="variants" name="variants">
                {variants.map((variant) => (
                    <option key={variant.id} value={JSON.stringify(variant)}>
                        {variant.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
