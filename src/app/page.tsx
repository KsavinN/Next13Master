import Link from "next/link";
import { getCollectionList } from "@/api/collections";
import { getProductsList as getProductsList } from "@/api/products";
import { ProductsList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const collections = await getCollectionList();
	const products = await getProductsList({ limit: 6 });
	return (
		<section className="flex min-h-screen flex-col gap-5 p-8">
			<section>
				<h1 className="mb-5 font-bold">Trending Collections</h1>
				<ul className="flex justify-between gap-5">
					{collections.map((collection) => (
						<li
							key={collection.id}
							className="border-2 p-3 hover:scale-110"
						>
							<Link href={`/collections/${collection.slug}`}>
								<h2 className="font-bold">{collection.name}</h2>
							</Link>
							<p>{collection.description}</p>
						</li>
					))}
				</ul>
			</section>
			<ProductsList products={products} />
		</section>
	);
}
