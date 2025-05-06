import Chat from "@/components/chat";
import HelpdeskForm from "@/components/helpdesk-form";
import InfoCard from "@/components/info-card";
import { useState } from "react";
import { type Message } from "@shared/schemas/message";

const initialMessages: Message[] = [
	{
		role: "model",
		text: "Hello! I am the AI Helpdesk assistant here to help you fill out the form! Let's get started. What is your first name?",
	},
	{
		role: "user",
		text: "Hello, My name is Andrew",
	},
];

function App() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [input, setInput] = useState("");
	const [isLoading, setLoading] = useState(false);

	const sendMessage = async () => {
		setLoading(true);
		setMessages((prev) => [...prev, { role: "user", text: input }]);
		setInput("");
		await new Promise((resolve) => setTimeout(resolve, 250));
		setMessages((prev) => [
			...prev,
			{ role: "model", text: input.split("").reverse().join("") },
		]);

		setLoading(false);
	};

	return (
		<div className="flex flex-col items-center p-4 gap-4 max-h-dvh">
			<InfoCard />
			<div className="flex justify-center gap-4">
				<Chat
					messages={messages}
					input={input}
					setInput={setInput}
					isLoading={isLoading}
					sendMessage={sendMessage}
				/>
				<HelpdeskForm />
			</div>
		</div>
	);
}

export default App;
