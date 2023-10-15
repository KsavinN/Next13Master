"use client";
import type { UrlObject } from "url";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

type ActiveLinkProps<T extends string> = {
	children: ReactNode;
	href: Route<T> | UrlObject;
	className: string;
	activeClassName: string;
	exact?: boolean;
};

// const sliceRoute = (route: string | UrlObject) => {
// 	const path =
// 		typeof route === "string" ? route : route.pathname || "";
// 	return path.split("/").slice(0, 2).join("/");
// };

// const useIsSameRoute = (
// 	route: string | UrlObject,
// 	exact: boolean,
// ) => {
// 	const pathname = usePathname();
// 	return exact
// 		? pathname === route
// 		: sliceRoute(pathname) === sliceRoute(route);
// };

export const ActiveLink = <T extends string>({
	children,
	href,
	className,
	activeClassName,
	exact = false,
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();

	const matchedPath =
		(typeof href === "string" ? href : href.pathname) ?? null;
	const isActive =
		(matchedPath &&
			pathname &&
			(exact
				? pathname === matchedPath
				: pathname.startsWith(matchedPath))) ||
		false;

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
