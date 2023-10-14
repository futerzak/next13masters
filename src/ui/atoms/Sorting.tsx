"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Sorting = () => {
	const [selectedOption, setSelectedOption] = useState("");
	const router = useRouter()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const orderBy = params.get("orderBy");
		if (orderBy) {
			setSelectedOption(orderBy);
		}
	}, []);

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target
		setSelectedOption(value);
		if (!!value) {
			router.push(`/products/1?orderBy=${value}`)
		}
	};

	return (
		<select value={selectedOption} onChange={handleOptionChange} data-testid="sort-by-dropdown">
			<option value="">sortowanie</option>
			<option value="price_ASC" data-testid="sort-by-price">
				Sort by price (asc)
			</option>
			<option value="price_DESC" data-testid="sort-by-price">
				Sort by price (desc)
			</option>
			<option value="rating_ASC" data-testid="sort-by-rating">Sort by rating (asc)</option>
			<option value="rating_DESC" data-testid="sort-by-rating">Sort by rating (desc)</option>
		</select>
	);
};
