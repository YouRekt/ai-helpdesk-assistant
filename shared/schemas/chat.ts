import { z } from "zod";
import { historySchema } from "./history";
import { messageSchema } from "./message";

export const chatSchema = z.object({
	message: messageSchema.omit({ role: true }),
	history: historySchema.optional(),
});

export const extractSchema = chatSchema.omit({ message: true });
