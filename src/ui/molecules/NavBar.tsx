import { ActiveLink } from "../atoms/ActiveLink";

export const NavBar = () => {
	const className = "text-gray-50 hover:underline underline-offset-2";
	const activeClassName =
		"text-gray-150 underline underline-offset-2";
	return (
		<nav role="navigation">
			<ul className="flex gap-8 p-5">
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
						All
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
