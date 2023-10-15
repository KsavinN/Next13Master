import {
	OFFSET_PRODUCTS_DEFAULT,
	getProductsCountsByCategorySlugGraphql,
} from "@/api/products";
import { ProductsPagination } from "@/ui/organisms/ProductsPagination";

export default async function CategoryProductsPageLayout({
	children,
	params: { page, category },
}: {
	children: React.ReactNode;
	params: {
		page: string;
		category: string;
	};
}) {
	const productsCount =
		await getProductsCountsByCategorySlugGraphql(category);
	const numberOfPages = Math.ceil(
		productsCount / OFFSET_PRODUCTS_DEFAULT,
	);
	return (
		<section className="min-h-screen justify-between p-24">
			<ProductsPagination
				className="mb-5"
				activePage={page}
				pages={numberOfPages}
				paginationType="category"
				categoryName={category}
			/>
			<section>{children}</section>
		</section>
	);
}
