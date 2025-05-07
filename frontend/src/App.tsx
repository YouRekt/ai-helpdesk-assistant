import Chat from "@/components/chat";
import HelpdeskForm from "@/components/helpdesk-form";
import InfoCard from "@/components/info-card";
import { Form } from "@/components/ui/form";
import { useStore } from "@/hooks/use-store";
import { formSchema, type FormValues } from "@shared/schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
	const messages = useStore((state) => state.messages);
	const input = useStore((state) => state.input);
	const setInput = useStore((state) => state.setInput);
	const isLoading = useStore((state) => state.isLoading);
	const setLoading = useStore((state) => state.setLoading);
	const addUserMessage = useStore((state) => state.addUserMessage);
	const initializeModelResponse = useStore(
		(state) => state.initializeModelResponse
	);
	const addModelMessageChunk = useStore(
		(state) => state.addModelMessageChunk
	);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			reason: "",
			urgency: 1,
		},
	});

	const sendMessage = async () => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;
		addUserMessage(trimmedInput);

		setInput("");
		setLoading(true);

		const res = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message: { text: trimmedInput },
				history: useStore.getState().history,
			}),
		});

		if (!res.body) {
			setLoading(false);
			return;
		}

		initializeModelResponse();

		const reader = res.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			addModelMessageChunk(decoder.decode(value, { stream: true }));
		}

		fillForm();

		setLoading(false);
	};

	const fillForm = async () => {
		const res = await fetch("/api/chat/extract", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ history: useStore.getState().history }),
		});
		const { data } = await res.json();

		const fields = [
			{
				field: "firstName" as const,
				schema: formSchema.pick({ firstName: true }),
			},
			{
				field: "lastName" as const,
				schema: formSchema.pick({ lastName: true }),
			},
			{
				field: "email" as const,
				schema: formSchema.pick({ email: true }),
			},
			{
				field: "reason" as const,
				schema: formSchema.pick({ reason: true }),
			},
			{
				field: "urgency" as const,
				schema: formSchema.pick({ urgency: true }),
			},
		];

		for (const { field, schema } of fields) {
			const result = schema.safeParse(data);
			if (result.success) {
				form.setValue(
					field,
					(result.data as Record<typeof field, string | number>)[
						field
					]
				);
			}
		}
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
				<Form {...form}>
					<HelpdeskForm />
				</Form>
			</div>
		</div>
	);
}

export default App;
