import { PaginationItem } from "@/ui/molecules/PaginationItem";

type Props = {
	pages: number;
	activePage: string;
	className?: string;
};

const range = (start: number, end: number) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, i) => start + i);
};

const calculatePagination = (
	totalPages: number,
	activePage: number,
	siblingCount: number,
) => {
	const leftSiblingIndex = Math.max(
		Number(activePage) - siblingCount,
		1,
	);
	const rightSiblingIndex = Math.min(
		Number(activePage) + siblingCount,
		totalPages,
	);

	const shouldShowLeftDots = leftSiblingIndex > 2;
	const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
	const paginationPages = range(
		leftSiblingIndex,
		rightSiblingIndex,
	).filter((page) => page !== 1 && page !== totalPages);

	return { shouldShowLeftDots, shouldShowRightDots, paginationPages };
};

export const ProductsPagination = ({
	pages,
	activePage,
	className,
}: Props) => {
	const { shouldShowLeftDots, shouldShowRightDots, paginationPages } =
		calculatePagination(pages, Number(activePage), 5);
	return (
		<nav aria-label="pagination">
			<ul
				className={`flex flex-wrap justify-between p-3  ${className}`}
			>
				<PaginationItem page={1} />
				{shouldShowLeftDots && <li>. . .</li>}
				{paginationPages.map((page) => {
					return <PaginationItem key={page} page={page} />;
				})}
				{shouldShowRightDots && <li>. . .</li>}
				<PaginationItem page={pages} />
			</ul>
		</nav>
	);
};
