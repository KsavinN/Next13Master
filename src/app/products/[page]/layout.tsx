import {
	OFFSET_PRODUCTS_DEFAULT,
	getProductsCountsGraphql,
} from "@/api/products";
import { ProductsPagination } from "@/ui/organisms/ProductsPagination";

export default async function ProductPageLayout({
	children,
	params: { page },
}: {
	children: React.ReactNode;
	params: {
		page: string;
	};
}) {
	const productsCount = await getProductsCountsGraphql();
	const numberOfPages = Math.ceil(
		productsCount / OFFSET_PRODUCTS_DEFAULT,
	);
	return (
		<section className="min-h-screen justify-between p-24">
			<ProductsPagination
				className="mb-5"
				activePage={page}
				pages={numberOfPages}
			/>
			<section>{children}</section>
		</section>
	);
}
