/* eslint-disable @next/next/no-img-element */
export const ProductCoverImage = ({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md bg-slate-50 hover:bg-slate-100">
			<img
				className="h-full w-full object-cover object-center p-1 transition-transform hover:scale-105"
				width={300}
				height={300}
				alt={alt}
				src={src}
			/>
		</div>
	);
};
