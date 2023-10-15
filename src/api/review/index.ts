import {
	ReviewCreateDocument,
	ReviewGetByProductIdDocument,
	ReviewPublishDocument,
	type ReviewItemFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductReviewById = async (productId: string) => {
	const queryResponse = await executeGraphql(
		ReviewGetByProductIdDocument,
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
