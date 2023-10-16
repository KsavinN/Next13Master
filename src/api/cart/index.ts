import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartCreateDocument,
	CartGetByIdDocument,
	CartUpsertItemDocument,
} from "@/gql/graphql";

export async function getCart() {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return null;
	}

	const queryResponse = await executeGraphql(CartGetByIdDocument, {
		id: cartId,
	});
	return queryResponse.order;
}

export async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const queryResponse = await executeGraphql(
			CartGetByIdDocument,
			{
				id: cartId,
			},
			{ throttle: 9000 },
		);
		return queryResponse.order;
	}

	const { createOrder } = await executeGraphql(
		CartCreateDocument,
		{},
		{ mutation: true, throttle: 5000 },
	);

	if (!createOrder) {
		throw Error("Failed to create cart");
	}

	cookies().set("cartId", createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
	});
	return createOrder;
}

export async function addProductToCart(
	orderId: string,
	productId: string,
	price: number,
) {
	const cart = await getCart();
	if (!cart) {
		throw Error("Failed to get cart");
	}

	const orderItem = cart?.orderItems.find(
		(item) => item.product?.id === productId,
	);
	const quantity = orderItem ? orderItem.quantity + 1 : 1;

	await executeGraphql(
		CartUpsertItemDocument,
		{
			orderId: orderItem?.id || orderId,
			productId,
			price: orderItem ? quantity * price : price,
			quantity,
		},
		{ mutation: true, throttle: 5000 },
	);
}
