import { type ProductItemType } from "@/types";
import { ProductList } from "@/ui/organisms/ProductList";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Accessories",
		name: "Grey T-shirt",
		price: 35,
		coverImg: {
			alt: "Brown leather wallet",
			src: "/tshirt-1.png",
		},
	},
	{
		id: "2",
		category: "Accessories",
		name: "Leather Wallet",
		price: 35,
		coverImg: {
			alt: "Brown leather wallet",
			src: "/tshirt-2.png",
		},
	},
	{
		id: "3",
		category: "Accessories",
		name: "Leather Wallet",
		price: 35,
		coverImg: {
			alt: "Brown leather wallet",
			src: "/tshirt-3.png",
		},
	},
	{
		id: "4",
		category: "Accessories",
		name: "Leather Wallet",
		price: 35,
		coverImg: {
			alt: "Brown leather wallet",
			src: "/wallet.png",
		},
	},
];

export default function Home() {
	return (
		<section className="flex min-h-screen justify-between p-24">
			<ProductList products={products} />
		</section>
	);
}
