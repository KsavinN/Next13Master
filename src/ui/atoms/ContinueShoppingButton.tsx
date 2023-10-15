"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

export const ContinueShoppingButton = () => {
	const router = useRouter();
	return (
		<button
			className="flex items-center justify-between gap-5  px-6 py-3 "
			onClick={() => router.back()}
		>
			Go back Shopping
			<ArrowLeftCircle
				width={25}
				height={25}
				className="rounded-md bg-neutral-200 p-1"
			/>
		</button>
	);
};
