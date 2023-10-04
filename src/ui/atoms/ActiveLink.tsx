"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type ActiveLinkProps = {
	children: ReactNode;
	href: Route;
	className: string;
	activeClassName: string;
	exact?: boolean;
};

const sliceRoute = (route: string) =>
	route.split("/").slice(0, 2).join("/");

const useIsSameRoute = (route: Route, exact: boolean) => {
	const pathname = usePathname();
	return exact
		? pathname === route
		: sliceRoute(pathname) === sliceRoute(route);
};

export const ActiveLink = ({
	children,
	href,
	className,
	activeClassName,
	exact = false,
}: ActiveLinkProps) => {
	const isActive = useIsSameRoute(href, exact);
	return (
		<Link
			className={isActive ? activeClassName : className}
			aria-current={isActive}
			href={href}
		>
			{children}
		</Link>
	);
};
