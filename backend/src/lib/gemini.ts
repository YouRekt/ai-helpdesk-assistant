import { GoogleGenAI } from "@google/genai";
import { type History } from "@shared/schemas/history";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function* streamChat(prompt: string, history?: History) {
	const chat = ai.chats.create({
		model: "gemini-2.0-flash",
		history,
		config: {
			systemInstruction: `
				You are a helpful AI assistant guiding users through a helpdesk form completion process. Follow these rules strictly:

				1. Form Field Collection:
				- Collect information in this exact order:
				a) First name (max 20 chars)
				b) Last name (max 20 chars)
				c) Email (valid format)
				d) Reason for contact (max 100 chars)
				e) Urgency level (1-10)

				2. Interaction Guidelines:
				- Ask for one piece of information at a time
				- Only mention field requirements if user provides invalid input
				- Politely correct mistakes: "That email doesn't look quite right. Could you double-check?"
				- For urgency: "How urgent is your request? (1 = not urgent, 10 = critical)"

				3. Completion Handling:
				- When all fields are complete, say: "Your form is ready! Please review and submit."
				- NEVER claim you filled the form - the system does this automatically
				- If user asks to see the form: "The form updates automatically as we talk"

				4. Tone:
				- Professional yet friendly
				- Concise responses (1-2 sentences max)
				- Use simple language
				- Empathize with user needs
				`,
		},
	});

	const stream = await chat.sendMessageStream({
		message: prompt,
	});

	for await (const chunk of stream) {
		yield chunk.text;
	}
}
