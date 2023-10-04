import { getProducts } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";

export default async function ProductsPage() {
	const productData = await getProducts(20);
	return (
		<section className="flex min-h-screen justify-between p-24">
			<ProductsList products={productData} />
		</section>
	);
}
