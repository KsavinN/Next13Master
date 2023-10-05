import type { Metadata } from "next";
import {
	getProduct,
	mapProductApiTypeToProductItem,
} from "@/api/products";

type Props = {
	params: {
		productId: string;
	};
};

export async function generateMetadata({
	params,
}: Props): Promise<Metadata> {
	// read route params
	const id = params.productId;

	// fetch data
	const product = await getProduct(id);

	return {
		title: product.title,
		description: product.longDescription,
		openGraph: {
			title: product.title,
			description: product.longDescription,
			images: [{ url: product.image }],
		},
	};
}

export default async function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	const data = await getProduct(productId).then(
		mapProductApiTypeToProductItem,
	);
	return (
		<section
			data-testid="single-product"
			className="ml-auto mr-auto flex min-h-screen flex-col justify-center p-24 md:flex-row  lg:w-3/4"
		>
			<article className="md:basis:4/5 mr-5 lg:basis-3/5 ">
				<img
					className="mb-5 ml-auto mr-auto object-cover object-center"
					width={500}
					height={400}
					src={data.coverImg.src}
					alt={data.coverImg.alt}
				/>
			</article>
			<article className="md:basis-1/5 lg:basis-2/5">
				<h1>{data.name}</h1>
				<p>{data.category}</p>
				<p>{data.price}</p>
				<p>{data.longDescription}</p>
			</article>
		</section>
	);
}
