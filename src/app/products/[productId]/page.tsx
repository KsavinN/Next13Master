export default function ProdcutPage({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return (
		<section className="flex min-h-screen justify-between p-24">
			Product: {productId}
		</section>
	);
}
