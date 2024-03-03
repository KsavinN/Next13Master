import { formatPrice } from "@/utils/formatPrice";

type ProductListItemDescriptionProps = {
	product: {
		name: string;
		category: string;
		price: number;
		averageRating?: number | null;
	};
};

export const ProductListItemDescription = ({
	product,
}: ProductListItemDescriptionProps) => {
	const { name, price, category, averageRating } = product;
	return (
		<article className="mt-1 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-white">{name}</h3>
				<p className="text-sm text-white">Category: {category}</p>
			</div>
			<p className="text-sm font-medium text-white">
				Price:{" "}
				<span data-testid="product-price">
					{formatPrice(price / 100)}
				</span>
			</p>
			<p className="text-sm font-medium">
				Rating:{" "}
				<span data-testid="product-rating">{averageRating || 0}</span>
			</p>
		</article>
	);
};
