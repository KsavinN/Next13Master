/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
			{
				source: "/categories/:category",
				destination: "/categories/:category/1",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tailwindui.com",
				port: "",
				pathname: "/img/**",
			},
			{
				protocol: "https",
				hostname: "media.graphassets.com",
			},
		],
	},
};

module.exports = nextConfig;
