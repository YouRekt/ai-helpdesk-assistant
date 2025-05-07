import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { chatRoute } from "./routes/chat";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
	.get("/health", (c) => {
		return c.json({ health: "ok" });
	})
	.basePath("/api")
	.route("/chat", chatRoute);

// frontend static files
app.get("*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

export default app;
