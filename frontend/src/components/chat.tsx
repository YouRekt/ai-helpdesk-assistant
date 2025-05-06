import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { type Message } from "@/App";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatProps {
	messages: Message[];
	input: string;
	isLoading: boolean;
	setInput: (value: string) => void;
	sendMessage: () => Promise<void>;
}

const Chat = ({
	messages,
	input,
	setInput,
	sendMessage,
	isLoading,
}: ChatProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>AI Assistant Chat</CardTitle>
				<CardDescription>
					Here you can talk to our assistant
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[70dvh] relative">
					<div className="absolute top-0 left-0 right-4 h-2 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
					<div className="flex flex-col gap-4 mr-4">
						{messages.map((msg, i) => (
							<div
								key={i}
								className={cn(
									"p-3 rounded-lg whitespace-pre-wrap max-w-1/2",
									msg.role === "user"
										? "bg-primary text-primary-foreground ml-auto"
										: "bg-muted text-muted-foreground mr-auto"
								)}
							>
								{msg.text}
							</div>
						))}
						<div ref={scrollRef} />
					</div>
				</ScrollArea>
			</CardContent>
			<CardFooter className="flex gap-2">
				<Input
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
				/>
				<Button
					onClick={sendMessage}
					disabled={isLoading || !input.trim()}
				>
					Send
				</Button>
			</CardFooter>
		</Card>
	);
};
export default Chat;
