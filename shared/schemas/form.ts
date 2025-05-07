import { z } from "zod";

export const formSchema = z.object({
	firstName: z
		.string()
		.min(1, "First name must be at least 1 character long.")
		.max(20, "First name must be at most 20 characters long."),
	lastName: z
		.string()
		.min(1, "Last name must be at least 1 character long.")
		.max(20, "Last name must be at most 20 characters long."),
	email: z.string().email("Please provide a valid email address."),
	reason: z
		.string()
		.min(1, "Reason must be at least 1 character long.")
		.max(100, "Reason must be at most 100 characters long."),
	urgency: z.coerce
		.number()
		.int("Urgency must be an integer.")
		.min(1, "Urgency must be at least 1.")
		.max(10, "Urgency must be at most 10."),
});

export type FormValues = z.infer<typeof formSchema>;
