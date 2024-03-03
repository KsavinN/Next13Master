"use client";
import {
	type ChangeEvent,
	useCallback,
	// useEffect,
	Suspense,
} from "react";
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

	const setParams = (variant: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("variant", variant);
		router.push(`${pathname}?${params.toString()}` as Route);
	};

	const handleSelect = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const variant = event.target.value;
			setParams(variant);
		},
		[pathname, router, searchParams],
	);

	// useEffect(() => {
	// 	if (variants && variants.length > 0)
	// 		setParams(variants[0]?.name ?? "");
	// }, []);

	return (
		<Suspense>
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
		</Suspense>
	);
};
