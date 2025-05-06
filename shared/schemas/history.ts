import { z } from "zod";

export const historyItemSchema = z.object({
	role: z.enum(["user", "model"]),
	parts: z.array(z.object({ text: z.string() })),
});

export type HistoryItem = z.infer<typeof historyItemSchema>;

export const historySchema = z.array(historyItemSchema);

export type History = z.infer<typeof historySchema>;
