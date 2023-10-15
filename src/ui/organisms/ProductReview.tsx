import { getProductReviewById } from "@/api/review";
import { ProductReviewForm } from "@/ui/molecules/ProductReviewForm";

type ReviewFormOptimisticProps = {
	productId: string;
};

export const ProductReview = async ({
	productId,
}: ReviewFormOptimisticProps) => {
	const reviews = await getProductReviewById(productId);

	return (
		<section className="mb-10 flex flex-col gap-10 px-6 py-6 sm:flex-row sm:px-36">
			<ProductReviewForm productId={productId} reviews={reviews} />
		</section>
	);
};
