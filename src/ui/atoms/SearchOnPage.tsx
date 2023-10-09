"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { debounce } from "@/utils/debounce";


export function SearchOnPage() {
    const router = useRouter();
    const debouncedSearch = debounce((searchValue: string) => {
        router.push(`/search?query=${encodeURIComponent(searchValue)}`);
    }, 500)

    return (
        <input className="text-black px-2" type="search" onChange={(e) => debouncedSearch(e.target.value)} />
    );

}


