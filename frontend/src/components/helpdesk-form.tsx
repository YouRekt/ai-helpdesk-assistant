import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type FormValues } from "@shared/schemas/form";

const HelpdeskForm = () => {
	const form = useFormContext<FormValues>();

	function onSubmit(values: FormValues) {
		// Here we could do something with the form values. Since it wasn't specified in the document I am just going to display them as a toast
		toast.success("Form submitted", {
			description: (
				<pre className="p-2">
					<code>{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
		form.reset();
	}

	return (
		<form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
			<Card>
				<CardHeader>
					<CardTitle>Helpdesk Form</CardTitle>
					<CardDescription>
						This is the form that the AI agent will help you
						complete.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="flex-1/2">
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="John" />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem className="flex-1/2">
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Doe" />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="john.doe@example.com"
										type="email"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="reason"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reason of contact</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe your issue"
										className="resize-none"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="flex items-end justify-between gap-4">
						<FormField
							control={form.control}
							name="urgency"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Urgency</FormLabel>
									<FormControl>
										<Input {...field} type="number" />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button className="w-fit" type="submit">
							Submit
						</Button>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-2 items">
					{Object.entries(form.formState.errors).map(
						([key, error]) => (
							<span key={key} className="text-red-500">
								{error?.message}
							</span>
						)
					)}
				</CardFooter>
			</Card>
		</form>
	);
};
export default HelpdeskForm;
