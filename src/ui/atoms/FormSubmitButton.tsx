"use client";
import { type HTMLProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface FormSubmitButtonProps extends HTMLProps<HTMLButtonElement> {
	label: string;
}
export const FormSubmitButton = ({
	label,
	formAction,
}: FormSubmitButtonProps) => {
	const formStatus = useFormStatus();
	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			formAction={formAction}
			className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			data-testid={
				label === "ADD TO CART" ? "add-to-cart-button" : undefined
			}
		>
			{label}
		</button>
	);
};
