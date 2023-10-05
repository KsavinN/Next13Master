/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	async rewrites() {
		return [
			{
				source: "/products",
				destination: "/products/1",
			},
		];
	},
};

module.exports = nextConfig;
