"use client"

import React, { useState, useEffect } from 'react';

export const Sorting = () => {
    const [selectedOption, setSelectedOption] = useState('price_ASC');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderBy = params.get('orderBy');
        if (orderBy) {
            setSelectedOption(orderBy);
        }
    }, []);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        window.location.href = `/products/1?orderBy=${event.target.value}`;
    };

    return (
        <select value={selectedOption} onChange={handleOptionChange} data-testid="sort-by-dropdown">
            <option value="price_ASC" data-testid="sort-by-price">Sort by price (asc)</option>
            <option value="price_DESC" data-testid="sort-by-price">Sort by price (desc)</option>
            {/* <option value="rating_ASC" testid="sort-by-rating">Sort by rating (asc)</option>
            <option value="rating_DESC" testid="sort-by-rating">Sort by rating (desc)</option> */}
        </select>
    );
};
