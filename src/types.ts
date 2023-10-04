export type ProductItemType = {
	id: string;
	name: string;
	price: number;
	category: string;
	longDescription: string;
	coverImg: {
		src: string;
		alt: string;
	};
};

export type ProductApiType = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};
