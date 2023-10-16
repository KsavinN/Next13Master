import type { ProductItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = { products: ProductItemFragment[] };

export const ProductsList = ({ products }: ProductListProps) => {
	return (
		<ul
			data-testid="products-list"
			className="grid h-full w-full grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3"
		>
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
