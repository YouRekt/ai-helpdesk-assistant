import { create } from "zustand";
import { type History } from "@shared/schemas/history";
import { type Message } from "@shared/schemas/message";

type ChatState = {
	history: History;
	messages: Message[];
	input: string;
	setInput: (value: string) => void;
	isLoading: boolean;
	setLoading: (value: boolean) => void;
	addUserMessage: (text: string) => void;
	initializeModelResponse: () => void;
	addModelMessageChunk: (chunk: string) => void;
};

const initialMessages: Message[] = [
	{
		role: "model",
		text: "Hello! I am the AI Helpdesk assistant here to help you fill out the form! Feel free to send a message when you are ready to get started.",
	},
];

const initialHistory: History = [
	{
		role: "user",
		parts: [],
	},
	{
		role: "model",
		parts: [
			{
				text: "Hello! I am the AI Helpdesk assistant here to help you fill out the form! Feel free to send a message when you are ready to get started.",
			},
		],
	},
];

export const useStore = create<ChatState>((set) => ({
	messages: initialMessages,
	history: initialHistory,
	input: "",
	setInput: (value) => set({ input: value }),
	isLoading: false,
	setLoading: (value) => set({ isLoading: value }),

	addUserMessage: (text) => {
		const newUserMessage: Message = { role: "user", text };
		set((state) => ({
			messages: [...state.messages, newUserMessage],
			history: state.history.map((entry, index) => {
				if (index === 0) {
					return { ...entry, parts: [...entry.parts, { text }] };
				}
				return entry;
			}),
		}));
	},
	initializeModelResponse: () =>
		set((state) => ({
			messages: [...state.messages, { role: "model", text: "" }],
			history: state.history.map((entry, index) => {
				if (index === 1) {
					return { ...entry, parts: [...entry.parts, { text: "" }] };
				}
				return entry;
			}),
		})),
	addModelMessageChunk: (chunk) => {
		set((state) => {
			const newMessages = [...state.messages];
			if (
				newMessages.length > 0 &&
				newMessages[newMessages.length - 1].role === "model"
			) {
				newMessages[newMessages.length - 1].text += chunk;
			}

			const newHistory = state.history.map((entry, index) => {
				if (index === 1) {
					const newParts = [...entry.parts];
					if (newParts.length > 0) {
						newParts[newParts.length - 1].text += chunk;
					}

					return { ...entry, parts: newParts };
				}
				return entry;
			});

			return {
				messages: newMessages,
				history: newHistory,
			};
		});
	},
}));
