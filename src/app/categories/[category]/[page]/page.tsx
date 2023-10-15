import { type Metadata } from "next";
import { getProductByCategorySlug } from "@/api/categories";
import { ProductsList } from "@/ui/organisms/ProductList";

type Props = {
	params: {
		page: string;
		category: string;
	};
};

const CapitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	return {
		title: CapitalizeFirstLetter(params.category),
	};
}

export default async function CategoryPage({
	params: { page, category },
}: Props) {
	const pageNumber = Number(page);
	const productData = await getProductByCategorySlug({
		page: pageNumber,
		categorySlug: category,
	});
	return (
		<section>
			<h1>{CapitalizeFirstLetter(category)}</h1>
			<ProductsList products={productData} />
		</section>
	);
}
