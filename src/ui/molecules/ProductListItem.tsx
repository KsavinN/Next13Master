import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import type { ProductItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductItemFragment;
};

export const ProductListItem = ({
	product: { categories, price, name, id, images },
}: ProductListItemProps) => {
	const category = categories[0]?.name ?? "";
	const coverImg = { src: images[0]?.url ?? "", alt: name };
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
