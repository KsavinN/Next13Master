import { type ProductItemType } from "@/types";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = { products: ProductItemType[] };

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul className="grid h-full grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3">
			{products.map((product) => {
				return (
					<ProductListItem
						data-testid="products-list"
						key={product.id}
						product={product}
					/>
				);
			})}
		</ul>
	);
};
