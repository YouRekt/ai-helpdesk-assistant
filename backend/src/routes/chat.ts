import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { chatSchema } from "@shared/schemas/chat";
import { streamText } from "hono/streaming";
import { streamChat } from "src/lib/gemini";

export const chatRoute = new Hono();

chatRoute.post("/", zValidator("json", chatSchema), async (c) => {
	const { message, history } = c.req.valid("json");

	return streamText(c, async (stream) => {
		for await (const chunk of streamChat(message.text, history)) {
			await stream.write(chunk!);
		}
	});
});
