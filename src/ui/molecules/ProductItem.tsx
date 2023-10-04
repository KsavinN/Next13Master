import { type ProductItemType } from "@/types";

type Props = { product: ProductItemType };

export const ProdcutItem = ({ product }: Props) => {
	return <h1>{product.name}</h1>;
};
