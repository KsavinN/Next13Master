import React from "react";

type ProductReviewInputProps = {
	label: string;
	type: React.HTMLInputTypeAttribute;
	name: string;
};
export const ProductReviewInput = ({
	label,
	type,
	name,
}: ProductReviewInputProps) => {
	return (
		<>
			<label htmlFor={`${name}-id`}>{label}</label>
			<input
				className="h-8 rounded-md border border-neutral-400 p-2 text-black"
				type={type}
				name={name}
				id={`${name}-id`}
				required
			/>
		</>
	);
};
