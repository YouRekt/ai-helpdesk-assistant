import { z } from "zod";

export const formSchema = z.object({
	firstName: z.string().min(1).max(20),
	lastName: z.string().min(1).max(20),
	email: z.string().email(),
	reason: z.string().min(1).max(100),
	urgency: z.coerce.number().int().min(1).max(10),
});

export type FormValues = z.infer<typeof formSchema>;
