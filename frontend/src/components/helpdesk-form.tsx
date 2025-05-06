import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	firstName: z.string().min(1).max(20),
	lastName: z.string().min(1).max(20),
	email: z.string().email(),
	reason: z.string().min(1).max(100),
	urgency: z.coerce.number().int().min(1).max(10),
});

type FormValues = z.infer<typeof formSchema>;

const HelpdeskForm = () => {
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

	function onSubmit(values: FormValues) {
		// Here we could do something with the form values. Since it wasn't specified in the document I am just going to display them as a toast
		toast.success("Form submitted", {
			description: (
				<pre className="p-2">
					<code>{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
		//form.reset();
	}

	return (
		<Form {...form}>
			<form
				className="w-full flex flex-col gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="John" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Doe" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="urgency"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Urgency</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-fit self-end" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default HelpdeskForm;
