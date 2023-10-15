import { executeGraphql } from "@/api/graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductItemFragment,
	ProductGetListDocument,
	ProductsCountsDocument,
	ProductsCountsByCategorySlugDocument,
} from "@/gql/graphql";

export const OFFSET_PRODUCTS_DEFAULT = 6;

type getProductsListGraphqlParams = {
	limit?: number;
	page?: number;
};

export const getProductsListGraphql = async (
	params?: getProductsListGraphqlParams,
) => {
	const limit = params?.limit
		? params.limit
		: OFFSET_PRODUCTS_DEFAULT;
	const offset = params?.page ? (params.page - 1) * limit : 0;
	const queryResponse = await executeGraphql(ProductGetListDocument, {
		limit,
		offset,
	});

	if (!queryResponse) {
		throw TypeError(`Product list not found`);
	}

	return queryResponse.productsConnection.products.map(
		(node) => node.node,
	);
};

export const getProductsCountsGraphql = async () => {
	const queryResponse = await executeGraphql(
		ProductsCountsDocument,
		{},
	);

	if (!queryResponse) {
		throw TypeError(`Product list not found`);
	}
	return queryResponse.productsConnection.aggregate.count;
};

export const getProductsCountsByCategorySlugGraphql = async (
	categorySlug: string,
) => {
	const queryResponse = await executeGraphql(
		ProductsCountsByCategorySlugDocument,
		{ slug: categorySlug },
	);

	if (!queryResponse) {
		throw TypeError(`Product list not found in ${categorySlug}`);
	}
	return queryResponse.productsConnection.aggregate.count;
};

export const getProductGraphql = async (
	id: string,
): Promise<ProductItemFragment | null | undefined> => {
	const queryResponse = await executeGraphql(ProductGetByIdDocument, {
		id,
	});
	if (!queryResponse) {
		throw TypeError(`Product not found`);
	}
	return queryResponse.product;
};
