"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

export const ContinueShoppingButton = () => {
	const router = useRouter();
	return (
		<button
			className="flex items-center justify-between gap-5 px-6  py-3 text-black hover:scale-105 hover:font-bold"
			onClick={() => router.back()}
		>
			Go back Shopping
			<ArrowLeftCircle
				width={35}
				height={35}
				className="rounded-md bg-neutral-200 p-1 "
			/>
		</button>
	);
};
