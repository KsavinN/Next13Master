"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartSetProductQuantityDocument,
	type CartFragment,
	CartRemoveItemDocument,
} from "@/gql/graphql";

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
	price: number,
) => {
	const changeItem = await executeGraphql(
		CartSetProductQuantityDocument,
		{
			itemId,
			quantity,
			total: price * quantity,
		},
		{
			cache: "no-store",
			mutation: true,
		},
	);

	revalidateTag("cart");
	return changeItem;
};

export const deleteItem = (orderId: string) => {
	const deleteItem = executeGraphql(
		CartRemoveItemDocument,
		{
			orderId,
		},
		{
			mutation: true,
		},
	);

	revalidateTag("cart");
	return deleteItem;
};

export const paymentAction = async (cart: CartFragment) => {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing a STRIPE_SECRET_KEY");
	}

	//TODO implement in future

	// const cart = await getCartByIdFromCookie();
	if (!cart) {
		return;
	}

	return null;
};
