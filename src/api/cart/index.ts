import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartCreateAndAddProductDocument,
	CartGetByIdDocument,
	CartUpsertProductDocument,
} from "@/gql/graphql";

export const createCartAndAddFirstProduct = async (
	productId: string,
	total: number,
) => {
	const { createOrder: newCart } = await executeGraphql(
		CartCreateAndAddProductDocument,
		{ productId, total },
		{
			cache: "no-store",
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
		},
	);

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
	});

	return newCart.id;
};

export const getCartByIdFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql(
			CartGetByIdDocument,
			{ id: cartId },
			{
				cache: "no-store",
				next: { tags: ["cart"] },
				headers: {
					Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
				},
			},
		);

		if (cart) {
			return cart;
		}
	}
};

export const addOrUpdateProductToCart = async (
	productId: string,
	total: number,
) => {
	const cart = await getCartByIdFromCookie();
	if (!cart) {
		const newCartId = await createCartAndAddFirstProduct(
			productId,
			total,
		);
		return newCartId;
	}

	const orderItem = cart?.orderItems?.find(
		(item) => item?.product?.id === productId,
	);

	const cartId = await executeGraphql(
		CartUpsertProductDocument,
		{
			productId,
			orderId: orderItem ? orderItem.id : cart.id,
			quantity: orderItem ? orderItem.quantity + 1 : 1,
			total: orderItem ? total * (orderItem.quantity + 1) : total,
		},
		{
			cache: "no-store",
			headers: {
				Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`,
			},
		},
	);

	return cartId.upsertOrderItem?.id;
};
