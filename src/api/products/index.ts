import type { ProductApiType, ProductItemType } from "@/types";

const BASE_URL_PRODUCT =
	"https://naszsklep-api.vercel.app/api/products";

export const OFFSET_PRODUCTS_DEFAULT = 50;

export const mapProductApiTypeToProductItem = (
	product: ProductApiType,
): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		price: product.price,
		category: product.category,
		longDescription: product.longDescription,
		coverImg: {
			src: product.image,
			alt: product.description,
		},
	};
};

type getProductsParams = { page?: number; take?: number };

export const getProducts = async (
	params?: getProductsParams,
): Promise<ProductItemType[]> => {
	const createUrl = (params?: getProductsParams): string => {
		const take = params?.take ? params.take : OFFSET_PRODUCTS_DEFAULT;
		if (params?.page) {
			return params?.page
				? `?take=${take}&offset=${(params.page - 1) * take}`
				: "";
		} else {
			return take ? `?take=${take}` : "";
		}
	};
	const data = await fetch(`${BASE_URL_PRODUCT}${createUrl(params)}`);
	const productsData = (await data.json()) as ProductApiType[];
	return productsData.map(mapProductApiTypeToProductItem);
};

export const getAllProductsListLength = async () => {
	const ProductsList = await getProducts({ take: -1 });
	return ProductsList.length;
};

export const getProduct = async (
	id: string,
): Promise<ProductApiType> => {
	const data = await fetch(`${BASE_URL_PRODUCT}/${id}`);
	const productData = (await data.json()) as ProductApiType;

	return productData;
};
