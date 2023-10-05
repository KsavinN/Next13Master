import { ActiveLink } from "@/ui/atoms/ActiveLink";

type PaginationItemProps = { page: number };

export const PaginationItem = ({ page }: PaginationItemProps) => (
	<li>
		<ActiveLink
			activeClassName="text-blue-500 p-2 font-bold rounded border border-blue-300 bg-blue-300"
			className=" text-blue-200"
			exact
			href={`/products/${page}`}
		>
			<button>{page}</button>
		</ActiveLink>
	</li>
);
