import { notFound } from "next/navigation";
import { ProductsList } from "@/ui/organisms/ProductList";
import { getSearchProductsList } from "@/api/products";

type SearchPageProps = {
	searchParams: Record<string, string>;
};

export default async function SearchPage({
	searchParams,
}: SearchPageProps) {
	if (!searchParams.query) {
		return notFound();
	}

	const products = await getSearchProductsList(searchParams.query);

	if (!products) {
		return notFound();
	}

	return (
		<>
			<h1>Search results for: {searchParams.query}</h1>
			<ProductsList products={products} />
		</>
	);
}
