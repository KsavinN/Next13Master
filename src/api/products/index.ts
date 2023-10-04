import type { ProductApiType, ProductItemType } from "@/types";

const BASE_URL_PRODUCT =
	"https://naszsklep-api.vercel.app/api/products";

const mapProductApiTypeToProductItem = (
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

export const getProducts = async (
	take?: number,
): Promise<ProductItemType[]> => {
	const data = await fetch(
		`${BASE_URL_PRODUCT}${take ? `?/take/${take}` : ""}`,
	);
	const productsData = (await data.json()) as ProductApiType[];
	return productsData.map(mapProductApiTypeToProductItem);
};

export const getProduct = async (
	id: string,
): Promise<ProductItemType> => {
	const data = await fetch(`${BASE_URL_PRODUCT}/${id}`);
	const productData = await data
		.json()
		.then(mapProductApiTypeToProductItem);

	return productData;
};
