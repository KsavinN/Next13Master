import { executeGraphql } from "@/api/graphqlApi";
import {
	CategoriesGetListDocument,
	ProductByCategorySlugDocument,
} from "@/gql/graphql";

export const getCategoryListGraphql = async () => {
	const queryResponse = await executeGraphql(
		CategoriesGetListDocument,
		{},
	);

	if (!queryResponse) {
		throw TypeError(`Category list not found`);
	}

	return queryResponse.categories;
};

type getProductByCategorySlugParams = {
	limit?: number;
	page?: number;
	categorySlug: string;
};

const OFFSET_PRODUCTS_DEFAULT = 3;

export const getProductByCategorySlug = async (
	params: getProductByCategorySlugParams,
) => {
	const limit = params?.limit
		? params.limit
		: OFFSET_PRODUCTS_DEFAULT;
	const offset = params?.page ? (params.page - 1) * limit : 0;
	const queryResponse = await executeGraphql(
		ProductByCategorySlugDocument,
		{
			limit,
			offset,
			slug: params.categorySlug,
		},
	);

	if (!queryResponse) {
		throw TypeError(`Product list not found`);
	}

	return queryResponse.productsConnection.products.map(
		(node) => node.node,
	);
};
