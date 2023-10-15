import { type Metadata } from "next";
import {
	getCollectionBySlug,
	getProductByCollectionSlug,
} from "@/api/collections";
import { ProductsList } from "@/ui/organisms/ProductList";

type Props = {
	params: {
		collection: string;
	};
};

export async function generateMetadata({
	params: { collection },
}: Props): Promise<Metadata> {
	const collectionData = await getCollectionBySlug(collection);
	return {
		title: collectionData?.name ?? "",
		openGraph: {
			title: collection,
			description: collectionData?.description ?? "",
		},
	};
}

export default async function SingleCollectionPage({
	params: { collection },
}: Props) {
	const collectionData = await getCollectionBySlug(collection);
	const productsInCollection =
		await getProductByCollectionSlug(collection);
	return (
		<section className="mx-auto min-h-screen max-w-7xl">
			<h1 className="pb-20 text-4xl font-extrabold first-letter:uppercase">
				{collectionData?.name}
			</h1>
			<ProductsList products={productsInCollection} />
		</section>
	);
}
