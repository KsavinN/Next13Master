"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import React from "react";

type ActiveLinkProps = {
	children: React.ReactNode;
	href: Route;
	className: string;
	activeClassName: string;
};

export const ActiveLink = ({
	children,
	href,
	className,
	activeClassName,
}: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;
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
