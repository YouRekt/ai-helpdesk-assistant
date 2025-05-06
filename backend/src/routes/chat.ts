import { Hono } from "hono";

export const chatRoute = new Hono();

chatRoute.post("/", async (c) => {
	const { message } = await c.req.json();

	console.log(message);

	return c.json({ response: "test response" }, 200);
});
