"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartDeleteProductDocument,
	CartSetProductQuantityDocument,
	type CartFragment,
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
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
		},
	);

	revalidateTag("cart");
	return changeItem;
};

export const deleteItem = (itemId: string) => {
	const deleteItem = executeGraphql(
		CartDeleteProductDocument,
		{
			itemId,
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
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
