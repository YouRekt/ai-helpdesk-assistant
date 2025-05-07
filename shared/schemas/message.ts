import { z } from "zod";

export const messageSchema = z.object({
	role: z.enum(["user", "model"]),
	text: z.string().min(1).max(1000),
});

export type Message = z.infer<typeof messageSchema>;
