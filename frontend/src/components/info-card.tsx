import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

const InfoCard = () => {
	return (
		<Card className="p-4 max-w-xl w-full">
			<CardHeader>
				<CardTitle className="text-xl font-bold">
					Helpdesk Assistant
				</CardTitle>
				<CardDescription>
					Answer the AI's questions to fill out the support form. The
					assistant will guide you step-by-step. Start the process by
					sending a message.
				</CardDescription>
			</CardHeader>
		</Card>
	);
};
export default InfoCard;
