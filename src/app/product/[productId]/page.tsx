import type { Metadata, ResolvingMetadata } from "next";
import { getProduct } from "@/api/products";

type Props = {
	params: {
		productId: string;
	};
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const id = params.productId;

	// fetch data
	const product = await getProduct(id);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: product.name,
		description: product.longDescription,
		openGraph: {
			images: ["/some-specific-page-image.jpg", ...previousImages],
		},
	};
}

export default async function ProdcutPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	const data = await getProduct(productId);
	return (
		<section className="ml-auto mr-auto flex min-h-screen w-3/4 justify-center p-24">
			<article className="mr-5 basis-3/5">
				<img
					className="ml-auto mr-auto object-cover object-center"
					width={700}
					height={400}
					src={data.coverImg.src}
					alt={data.coverImg.alt}
				/>
			</article>
			<article className="basis-2/5">
				<h1>{data.name}</h1>
				<p>{data.category}</p>
				<p>{data.price}</p>
				<p>{data.longDescription}</p>
			</article>
		</section>
	);
}
