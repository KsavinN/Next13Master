import {
	OFFSET_PRODUCTS_DEFAULT,
	getProductsCountsGraphql,
	getProductsList,
} from "@/api/products";
import { type ProductOrderByInput } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductList";
import { range } from "@/utils/range";

type Props = {
	params: {
		page: string;
	};
	searchParams: {
		sort: ProductOrderByInput;
	};
};

export const generateStaticParams = async () => {
	const productsCount = await getProductsCountsGraphql();
	const numberOfPages = Math.ceil(
		productsCount / OFFSET_PRODUCTS_DEFAULT,
	);
	return range(1, numberOfPages).map((page) => ({
		page: String(page),
	}));
};

export default async function ProductsWithPaginationPage({
	params: { page },
	searchParams,
}: Props) {
	const pageNumber = Number(page);
	const { sort } = searchParams;
	const productData = await getProductsList({
		page: pageNumber,
		sort,
	});

	return <ProductsList products={productData} />;
}
