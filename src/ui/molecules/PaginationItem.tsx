import { ActiveLink } from "@/ui/atoms/ActiveLink";

export type PaginationType = "product" | "category";

type PaginationItemProps =
	| { page: number; paginationType: "product" }
	| {
			page: number;
			paginationType: "category";
			categoryName: string;
	  };

export const PaginationItem = (props: PaginationItemProps) => {
	const { page, paginationType } = props;
	return (
		<li>
			<ActiveLink
				activeClassName="text-blue-500 p-2 font-bold rounded border border-blue-300 bg-blue-300"
				className=" text-blue-200"
				href={
					paginationType === "category"
						? `/categories/${props.categoryName}/${page}`
						: `/products/${page}`
				}
				exact
			>
				<button>{page}</button>
			</ActiveLink>
		</li>
	);
};
