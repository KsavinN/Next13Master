"use server";
import { revalidateTag } from "next/cache";
import { type ReviewItemFragment } from "@/gql/graphql";
import { createReview, publishReview } from "@/api/review";

export const addReviewAction = async (
	productId: string,
	formData: FormData,
) => {
	const reviewForm: ReviewItemFragment = {
		id: productId,
		headline: String(formData.get("headline")),
		content: String(formData.get("content")),
		rating: Number(formData.get("rating")),
		name: String(formData.get("name")),
		email: String(formData.get("email")),
	};

	const { createReview: reviewId } = await createReview(reviewForm);

	if (!reviewId) {
		throw TypeError(
			"Something went wrong during the review creation!",
		);
	}

	await publishReview(reviewId.id);

	revalidateTag("review");
};
