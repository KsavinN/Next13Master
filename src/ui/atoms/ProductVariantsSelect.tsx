"use client";
import { type ChangeEvent, useCallback } from "react";
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { type Route } from "next";

type Props = {
	variants: Array<{ id: string; name: string }>;
};

export const ProductVariantsSelect = ({ variants }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSelect = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const variant = event.target.value;
			const params = new URLSearchParams(searchParams);
			params.set("variant", variant);
			router.push(`${pathname}?${params.toString()}` as Route);
		},
		[pathname, router, searchParams],
	);

	return (
		<>
			{variants && variants.length > 0 && (
				<select
					name="variant-product"
					id="variant-product-id"
					value={searchParams.get("variant") ?? "Size/Color"}
					onChange={handleSelect}
					className="mb-3 mt-3 text-black"
				>
					<option disabled>Size/Color</option>
					{variants.map((variant) => (
						<option key={variant.id} value={variant.name}>
							{variant.name}
						</option>
					))}
				</select>
			)}
		</>
	);
};
