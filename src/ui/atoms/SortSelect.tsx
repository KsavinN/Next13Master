"use client";
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { type Route } from "next";
import { type ProductOrderByInput } from "@/gql/graphql";

type OrderByType = {
	label: string;
	value: ProductOrderByInput;
};

const ORDER_LIST: OrderByType[] = [
	{ label: "Price (Low to High)", value: "price_ASC" },
	{ label: "Price (High to Low)", value: "price_DESC" },
];
export const SortPriceSelect = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<section className="my-6 ml-auto mr-auto flex justify-center self-end px-6 sm:px-36">
			<select
				name="sort-by"
				id="sort-by-id"
				value={searchParams.get("sort") || "Sort by"}
				onChange={(event) =>
					router.push(
						`${pathname}?sort=${event.target.value}` as Route,
					)
				}
				className="block w-48 rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			>
				<option disabled>Sort by</option>
				{ORDER_LIST.map(({ label, value }) => (
					<option
						key={value}
						value={value}
						data-testid={"sort-by-price"}
					>
						{label}
					</option>
				))}
			</select>
		</section>
	);
};
