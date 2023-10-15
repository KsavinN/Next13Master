import { formatPrice } from "@/utils/formatPrice";

type ProductListItemDescriptionProps = {
	product: {
		name: string;
		category: string;
		price: number;
	};
};

export const ProductListItemDescription = ({
	product,
}: ProductListItemDescriptionProps) => {
	const { name, price, category } = product;
	return (
		<div className="mt-1 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-white">{name}</h3>
				<p className="text-sm text-white">Category: {category}</p>
			</div>
			<p className="text-sm font-medium text-white">
				Price: {formatPrice(price / 100)}
			</p>
		</div>
	);
};
