import { getCart } from "@/api/cart";
import { ContinueShoppingButton } from "@/ui/atoms/ContinueShoppingButton";
import { CartEmpty } from "@/ui/molecules/CartEmpty";
import { CartProductList } from "@/ui/molecules/CartProductList";

export default async function CartPage() {
	"use server";
	const cart = await getCart();
	if (!cart || cart.orderItems.length <= 0) {
		return <CartEmpty />;
	}

	return (
		<section className="flex w-full flex-col">
			<div className="flex h-24 w-full flex-row items-center justify-between border-t-4 border-amber-600 bg-neutral-200 px-6 py-1 sm:px-36">
				<h1 className="text-2xl font-black text-black">Cart Shop</h1>
				<ContinueShoppingButton />
			</div>
			<ul className="mx-auto flex w-full max-w-3xl flex-col gap-5 py-6">
				<CartProductList cart={cart} />
			</ul>
		</section>
	);
}
