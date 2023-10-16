"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SortByRating = () => {
	const searchParams = useSearchParams();
	const isSortByRating = Boolean(searchParams.get("sortByRating"));
	const [sortByRating, setSortByRating] = useState(isSortByRating);
	const router = useRouter();

	const handleSortByRating = async () => {
		if (!sortByRating) {
			router.push(`/products/1?sortByRating=true`);
		} else {
			router.push(`/products/1`);
		}
		setSortByRating((prev) => !prev);
	};

	return (
		<button
			data-testid="sort-by-rating"
			onClick={handleSortByRating}
			className={`w-fit cursor-pointer rounded-lg border p-2 ${
				sortByRating ? "bg-slate-500 text-white" : "bg-white"
			}`}
		>
			Sort by rating
		</button>
	);
};
