"use client";
import React, { useState } from "react";

export const ProductReviewRatingInput = () => {
	const [rating, setRating] = useState(0);
	return (
		<>
			<label htmlFor="rating-id">Rating</label>
			<input
				min="0"
				max="5"
				step="1"
				type="range"
				value={rating}
				name="rating"
				id="rating-id"
				onChange={(event) => setRating(Number(event.target.value))}
				required
			/>
		</>
	);
};
