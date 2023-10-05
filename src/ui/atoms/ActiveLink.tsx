"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

type ActiveLinkProps<T extends string> = {
	children: ReactNode;
	href: Route<T>;
	className: string;
	activeClassName: string;
	exact?: boolean;
};

const sliceRoute = (route: string) =>
	route.split("/").slice(0, 2).join("/");

const useIsSameRoute = (route: string, exact: boolean) => {
	const pathname = usePathname();
	return exact
		? pathname === route
		: sliceRoute(pathname) === sliceRoute(route);
};

export const ActiveLink = <T extends string>({
	children,
	href,
	className,
	activeClassName,
	exact = false,
}: ActiveLinkProps<T>) => {
	const isActive = useIsSameRoute(href, exact);
	return (
		<Link
			className={isActive ? activeClassName : className}
			{...(isActive ? { "aria-current": "page" } : {})}
			href={href}
		>
			{children}
		</Link>
	);
};
