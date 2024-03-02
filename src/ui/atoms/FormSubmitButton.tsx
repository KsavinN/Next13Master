"use client";
import { type HTMLProps } from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps extends HTMLProps<HTMLButtonElement> {
	label: string;
	"data-testid"?: string;
}
export const FormSubmitButton = ({
	label,
	formAction,
	"data-testid": testId,
}: FormSubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			formAction={formAction}
			className="rounded-md bg-amber-600 px-6 py-3 text-neutral-100 disabled:cursor-wait disabled:bg-amber-700"
			data-testid={testId}
		>
			{label}
		</button>
	);
};
