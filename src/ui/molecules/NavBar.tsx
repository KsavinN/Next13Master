import { ActiveLink } from "../atoms/ActiveLink";

export const NavBar = () => {
	const className = "text-gray-50 hover:underline underline-offset-2";
	const activeClassName =
		"text-gray-150 underline underline-offset-2";
	return (
		<ul>
			<li>
				<ActiveLink
					className={className}
					activeClassName={activeClassName}
					href="/"
				>
					Home
				</ActiveLink>
			</li>
			<li>
				<ActiveLink
					className={className}
					activeClassName={activeClassName}
					href="/products"
				>
					Products
				</ActiveLink>
			</li>
		</ul>
	);
};
