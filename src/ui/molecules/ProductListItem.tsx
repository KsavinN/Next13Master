import Link from "next/link";
import { type ProductItemType } from "@/types";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({
	product: { category: category, price, name, id, coverImg },
}: ProductListItemProps) => {
	return (
		<li className="h-full list-none p-4">
			<article className="hover:scale-110">
				<Link href={`/product/${id}`} prefetch>
					<ProductCoverImage {...coverImg} />
					<ProductListItemDescription
						product={{ name, category, price }}
					/>
				</Link>
			</article>
		</li>
	);
};
