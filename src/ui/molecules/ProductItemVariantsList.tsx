import { getProductGetVariantsList } from "@/api/products";
import { ProductVariantsSelect } from "@/ui/atoms/ProductVariantsSelect";

type Props = {
	productId: string;
};

export const ProductItemVariantsList = async ({
	productId,
}: Props) => {
	const variants = await getProductGetVariantsList(productId);

	return <ProductVariantsSelect variants={variants} />;
};
