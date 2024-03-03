"use client";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useState,
	Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query") || "");
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const [value] = useDebounce(query, 500);

	const handleSearchOnChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setQuery(event.target.value);
	};

	const handleSearchOnSubmit = (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		if (query === "") return router.push(`/`);
		router.push(`/search?query=${query?.toString()}`);
	};

	useEffect(() => {
		if (value) {
			if (query === "") return router.push(`/`);
			router.push(`/search?query=${query?.toString()}`);
		}
	}, [value, query, router]);

	return (
		<Suspense>
			<form
				className="flex justify-between gap-3"
				onSubmit={handleSearchOnSubmit}
				onKeyDown={(event) => {
					event.key === "Enter" &&
						router.push(`/search?query=${query?.toString()}`);
				}}
			>
				<input
					name="search"
					className="w-[250px] rounded-md border p-2 text-black "
					type="search"
					role="searchbox"
					placeholder="Search..."
					autoComplete="off"
					value={query}
					onChange={handleSearchOnChange}
				/>
				<button type="submit">
					<Search
						name="search"
						className="h-5 w-5 text-white"
						aria-label="search-icon"
					/>
				</button>
			</form>
		</Suspense>
	);
};
