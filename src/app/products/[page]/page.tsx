import {
	OFFSET_PRODUCTS_DEFAULT,
	getAllProductsListLength,
	getProducts,
} from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";
import { range } from "@/utils/range";

type Props = {
	params: {
		page: string;
	};
};

export const generateStaticParams = async () => {
	const products = await getAllProductsListLength();
	const numberOfPages = Math.ceil(products / OFFSET_PRODUCTS_DEFAULT);
	return range(1, numberOfPages).map((page) => ({
		page: String(page),
	}));
};

export default async function ProductsWithPaginationPage({
	params: { page },
}: Props) {
	const pageNumber = Number(page);
	const productData = await getProducts({
		page: pageNumber,
	});
	return <ProductsList products={productData} />;
}
