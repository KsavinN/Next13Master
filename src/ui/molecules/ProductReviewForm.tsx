"use client";
import React, { useOptimistic, useRef } from "react";
import { type ReviewItemFragment } from "@/gql/graphql";
import { ProductReviewRatingInput } from "@/ui/atoms/ProductReviewRatingInput";
import { ProductReviewInput } from "@/ui/atoms/ProductReviewInput";
import { FormSubmitButton } from "@/ui/atoms/FormSubmitButton";
import { ReviewItem } from "@/ui//atoms/ReviewItem";
import { addReviewAction } from "@/app/product/[productId]/actions";

type ProductReviewFormProps = {
	productId: string;
	reviews: ReviewItemFragment[];
};
export const ProductReviewForm = ({
	productId,
	reviews,
}: ProductReviewFormProps) => {
	const ref = useRef<HTMLFormElement>(null);
	const [optimisticReview, setOptimisticReview] = useOptimistic(
		reviews,
		(state, review: ReviewItemFragment) => [...state, review],
	);

	async function addOptimisticReviews(formData: FormData) {
		const newReview: ReviewItemFragment = {
			id: productId,
			headline: String(formData.get("headline")),
			content: String(formData.get("content")),
			rating: Number(formData.get("rating")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
		};

		setOptimisticReview(newReview);
		await addReviewAction(productId, formData);
		ref.current?.reset();
	}

	return (
		<>
			<div className="h-96 w-full sm:basis-1/3">
				<form
					ref={ref}
					className="flex flex-col gap-2"
					data-testid="add-review-form"
				>
					<ProductReviewInput
						label={"Title"}
						type={"text"}
						name={"headline"}
					/>
					<label htmlFor="content">Content</label>
					<textarea
						className="rounded-md border border-neutral-400 p-2 text-black"
						name="content"
						id="content"
						placeholder="Add your comment.."
						rows={3}
						required
					/>
					<ProductReviewRatingInput />
					<ProductReviewInput
						label={"Name"}
						type={"text"}
						name={"name"}
					/>
					<ProductReviewInput
						label={"Email"}
						type={"email"}
						name={"email"}
					/>
					<FormSubmitButton
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						formAction={addOptimisticReviews}
						label={"Add Review"}
					/>
				</form>
			</div>
			{reviews && (
				<div
					data-testid="review-products"
					className="h-auto w-full sm:basis-2/3"
				>
					{optimisticReview.map((review) => (
						<ReviewItem key={review.id} review={review} />
					))}
				</div>
			)}
		</>
	);
};
