import { NextResponse } from "next/server";
import { updateAverageRatingOfProduct } from "@/api/review";

export async function GET(request: Request) {
	const productId = request.url.split("/").pop();
	if (!productId)
		return NextResponse.json(
			{ message: "Product Id not found" },
			{ status: 400 },
		);
	await updateAverageRatingOfProduct(productId);
	return NextResponse.json(
		{ message: "Updated average ratting of products" },
		{ status: 200 },
	);
}
