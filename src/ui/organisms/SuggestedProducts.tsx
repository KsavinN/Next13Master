import NextImage from "next/image";
import { getProductByCategorySlug } from "@/api/categories";
import { getProductsCountsByCategorySlugGraphql } from "@/api/products";
import { formatPrice } from "@/utils/formatPrice";

type SuggestedProductsProps = {
	category?: string;
};
const OFFSET_SUGGESTED_PRODUCTS_DEFAULT = 4;

export const SuggestedProductsList = async ({
	category,
}: SuggestedProductsProps) => {
	if (!category) return null;

	const productsCount =
		await getProductsCountsByCategorySlugGraphql(category);
	const numberOfPages = Math.ceil(
		productsCount / OFFSET_SUGGESTED_PRODUCTS_DEFAULT,
	);
	const suggestedProducts = await getProductByCategorySlug({
		categorySlug: category,
		page: Math.floor(Math.random() * numberOfPages),
		limit: OFFSET_SUGGESTED_PRODUCTS_DEFAULT,
	});

	return (
		<section className="flex h-full w-full flex-col items-center justify-center p-5">
			<h2 className="mb-5 text-center text-3xl font-bold">
				Suggested Products
			</h2>
			<ul
				className="flex flex-wrap justify-center gap-5"
				data-testid="related-products"
			>
				{suggestedProducts.map((product) => (
					<li
						key={product.id}
						className="flex h-96 w-64 flex-col items-center justify-center"
					>
						<NextImage
							className="h-64 w-64"
							height={400}
							width={400}
							src={product.images[0]?.url ?? ""}
							alt={product.name}
						/>
						<h3 className="text-2 mb-5 font-bold">{product.name}</h3>
						<p className="mb-5 text-xl">
							{formatPrice(product.price)}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
};
