import { type ReviewItemFragment } from "@/gql/graphql";

type ReviewItemProps = {
	review: ReviewItemFragment;
};
export const ReviewItem = ({
	review: { headline, content, rating, name: firstName },
}: ReviewItemProps) => {
	return (
		<article>
			<div className="flex w-full items-center gap-5 py-5">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-black">
					{firstName && firstName.charAt(0)}
				</div>
				<div className="flex flex-col items-center text-start">
					<p className="text-slategray text-lg font-bold">
						{firstName}
					</p>
					<p>Rating: {rating}</p>
				</div>
			</div>
			<div className="p-6">
				<p className="text-slategray text-lg font-medium">
					{headline}
				</p>
				<p className="text-slategray italic">{content}</p>
			</div>
			<hr />
		</article>
	);
};
