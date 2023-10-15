import type { Route } from "next";
import { ShoppingBasket } from "lucide-react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { getCategoryListGraphql } from "@/api/categories";
import { SearchInput } from "@/ui/atoms/SearchProduct";
import { getCartByIdFromCookie } from "@/api/cart";

const className = "text-gray-50 hover:underline underline-offset-2";
const activeClassName = "text-gray-150 underline underline-offset-2";

const navbarList: {
	href: Route<string>;
	title: string;
	exact?: boolean;
}[] = [
	{ href: "/", title: "Home", exact: true },
	{ href: "/products", title: "All" },
];

export const NavBar = async () => {
	const categories = await getCategoryListGraphql();
	const cart = await getCartByIdFromCookie();
	const quantity = cart?.orderItems.length ?? 0;

	return (
		<nav role="navigation">
			<ul className="flex items-center gap-8 p-5">
				{navbarList.map((item) => (
					<li key={item.title}>
						<ActiveLink
							className={className}
							activeClassName={activeClassName}
							href={item.href}
							exact={item.exact}
						>
							{item.title}
						</ActiveLink>
					</li>
				))}
				{categories.map((category) => (
					<li key={category.name}>
						<ActiveLink
							className={className}
							activeClassName={activeClassName}
							href={`/categories/${category.slug}/`}
							exact={false}
						>
							{category.name}
						</ActiveLink>
					</li>
				))}
				<li className="ml-auto">
					<SearchInput />
				</li>
				<li>
					<ActiveLink
						className={className}
						activeClassName={activeClassName}
						href="/cart"
						exact
					>
						<div className="flex justify-between gap-5">
							<ShoppingBasket />
							<p>Cart {!!quantity && quantity}</p>
						</div>
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
