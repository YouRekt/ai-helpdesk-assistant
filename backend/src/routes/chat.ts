import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { chatSchema, extractSchema } from "@shared/schemas/chat";
import { streamText } from "hono/streaming";
import { extractFormData, streamChat } from "src/lib/gemini";

export const chatRoute = new Hono();

chatRoute
	.post("/", zValidator("json", chatSchema), async (c) => {
		const { message, history } = c.req.valid("json");

		return streamText(c, async (stream) => {
			for await (const chunk of streamChat(message.text, history)) {
				await stream.write(chunk!);
			}
		});
	})
	.post("/extract", zValidator("json", extractSchema), async (c) => {
		const { history } = c.req.valid("json");

		if (!history) {
			return c.json({ error: "Missing conversation history" }, 400);
		}
		try {
			const data = await extractFormData(history);

			return c.json({ data });
		} catch {
			return c.json({ error: "Extracting error" });
		}
	});
