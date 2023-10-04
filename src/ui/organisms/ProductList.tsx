import { type ProductItemType } from "@/types";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = { products: ProductItemType[] };

export const ProductsList = ({ products }: ProductListProps) => {
	return (
		<ul
			data-testid="products-list"
			className="grid h-full grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3"
		>
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
