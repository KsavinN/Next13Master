/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Metadata } from "next";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";
import { getProductById } from "@/api/products";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { formatPrice } from "@/utils/formatPrice";
import { ProductItemVariantsList } from "@/ui/molecules/ProductItemVariantsList";
import { ProductReview } from "@/ui/organisms/ProductReview";
import { FormSubmitButton } from "@/ui/atoms/FormSubmitButton";
import { addOrUpdateProductToCart } from "@/api/cart";

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
	const product = await getProductById(id);

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
	const product = await getProductById(productId);

	if (!product) throw notFound();

	async function addToCartAction(formData: FormData) {
		"use server";
		const id = await addOrUpdateProductToCart(
			String(formData.get("productId")),
			Number(formData.get("productPrice")),
		);

		revalidateTag("cart");

		return id;
	}

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
					<section>
						<h1 className="font-bold">{product.name}</h1>
						<p>{product.categories[0]?.name}</p>
						<p>{formatPrice(product.price)}</p>
						<p>{product.description}</p>
					</section>
					<ProductItemVariantsList productId={productId} />
					<section className="mt-10 flex items-center">
						<form action={addToCartAction}>
							<input
								type="text"
								name="productId"
								value={product.id}
								hidden
								readOnly
							/>
							<input
								type="number"
								name="productPrice"
								value={product.price}
								hidden
								readOnly
							/>
							<FormSubmitButton
								data-testid="add-to-cart-button"
								label={"Add To Cart"}
							/>
						</form>
					</section>
				</article>
			</section>
			<Suspense>
				<ProductReview productId={productId} />
			</Suspense>
			<Suspense>
				<SuggestedProductsList category={categorySlug} />
			</Suspense>
		</>
	);
}
