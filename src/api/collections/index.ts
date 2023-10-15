import {
	CollectionsGetCollectionBySlugDocument,
	CollectionsGetListDocument,
	ProductsGetListByCollectionSlagDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/graphqlApi";

export const getCollectionBySlug = async (collectionSlug: string) => {
	const queryResponse = await executeGraphql(
		CollectionsGetCollectionBySlugDocument,
		{ slug: collectionSlug },
	);

	if (!queryResponse) {
		throw TypeError(
			`Collection not found for  collection:${collectionSlug}`,
		);
	}

	return queryResponse.collections[0];
};

export const getCollectionList = async () => {
	const queryResponse = await executeGraphql(
		CollectionsGetListDocument,
		{},
	);
	if (!queryResponse) {
		throw TypeError(`Collection list not found`);
	}
	return queryResponse.collections;
};

export const getProductByCollectionSlug = async (
	collectionName: string,
) => {
	const queryResponse = await executeGraphql(
		ProductsGetListByCollectionSlagDocument,
		{ slug: collectionName },
	);

	if (!queryResponse)
		throw TypeError(`Product list not found in ${collectionName}`);

	return queryResponse.products;
};
