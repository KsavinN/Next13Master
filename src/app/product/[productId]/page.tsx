import type { Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductGraphql } from "@/api/products";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { formatPrice } from "@/utils/formatPrice";

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
	const product = await getProductGraphql(id);

	if (!product) throw notFound();

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: product.images,
		},
	};
}

export default async function ProductPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	const product = await getProductGraphql(productId);

	if (!product) throw notFound();

	const categorySlug = product.categories[0]?.slug;

	return (
		<>
			<section
				data-testid="single-product"
				className="ml-auto mr-auto flex flex-col justify-center p-24 md:flex-row  lg:w-3/4"
			>
				<article className="md:basis:4/5 mr-5 lg:basis-3/5 ">
					<NextImage
						className="mb-5 ml-auto mr-auto object-cover object-center"
						width={500}
						height={400}
						src={product.images[0]?.url ?? ""}
						alt={product.name}
					/>
				</article>
				<article className="md:basis-1/5 lg:basis-2/5">
					<h1 className="font-bold">{product.name}</h1>
					<p>{product.categories[0]?.name}</p>
					<p>{formatPrice(product.price)}</p>
					<p>{product.description}</p>
				</article>
			</section>
			<Suspense>
				<SuggestedProductsList category={categorySlug} />
			</Suspense>
		</>
	);
}
