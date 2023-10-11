"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { debounce } from "@/utils/debounce";

export function SearchOnPage() {
	const router = useRouter();
	const debouncedSearch = debounce((searchValue: string) => {
		router.push(`/search?query=${encodeURIComponent(searchValue)}`);
	}, 500);

	return (
		<input
			className="px-2 text-black"
			type="search"
			onChange={(e) => debouncedSearch(e.target.value)}
		/>
	);
}
