import Link from "next/link";
import { getCollectionList } from "@/api/collections";

export default async function Home() {
	const collections = await getCollectionList();
	return (
		<section className="flex min-h-screen flex-col gap-5 p-24">
			<h1 className="font-bold">Trending Collections</h1>
			<section>
				<ul className="flex gap-5">
					{collections.map((collection) => (
						<li
							key={collection.id}
							className="border-2 p-3 hover:scale-110"
						>
							<Link href={`/collections/${collection.slug}`}>
								<h2 className="font-bold">{collection.name}</h2>
								<p>{collection.description}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
