import { getProductByCategorySlug } from "@/api/categories";
import { ProductsList } from "@/ui/organisms/ProductList";

type Props = {
	params: {
		page: string;
		category: string;
	};
};

export default async function CategoryPage({
	params: { page, category },
}: Props) {
	const pageNumber = Number(page);
	const productData = await getProductByCategorySlug({
		page: pageNumber,
		categorySlug: category,
	});
	return <ProductsList products={productData} />;
}
