import {
	ReviewCreateDocument,
	ReviewsGetByProductIdDocument,
	ReviewPublishDocument,
	type ReviewItemFragment,
	ProductUpdateAverageRatingDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductReviewById = async (productId: string) => {
	const queryResponse = await executeGraphql(
		ReviewsGetByProductIdDocument,
		{ id: productId },
	);

	if (!queryResponse)
		throw TypeError(`Review not found for product:${productId}`);

	return queryResponse.product?.reviews;
};

export const createReview = async (review: ReviewItemFragment) => {
	const queryResponse = await executeGraphql(
		ReviewCreateDocument,
		review,
		{
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
		},
	);

	if (!queryResponse) throw TypeError(`Review not created`);

	return queryResponse;
};

export const publishReview = async (reviewId: string) => {
	const queryResponse = await executeGraphql(
		ReviewPublishDocument,
		{ id: reviewId },
		{
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
		},
	);

	if (!queryResponse) throw TypeError(`Review not created`);

	return queryResponse;
};

export const updateAverageRatingOfProduct = async (
	productId: string,
) => {
	const reviews = await getProductReviewById(productId);
	if (!reviews) return;
	const count = reviews.length;
	const totalRating = reviews.reduce((aggregator, review) => {
		return aggregator + review.rating;
	}, 0);

	const averageRating =
		count === 0 ? 0.0 : Math.round((totalRating / count) * 100) / 100;
	if (isNaN(averageRating))
		throw TypeError(`Average rating is not a number`);

	const status = await executeGraphql(
		ProductUpdateAverageRatingDocument,
		{ productId, averageRating },
		{ mutation: true },
	);
	if (!status) throw TypeError(`Average rating not updated`);
	return status;
};
