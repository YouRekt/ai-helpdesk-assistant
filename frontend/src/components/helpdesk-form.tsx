import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
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
		//form.reset();
	}

	return (
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
	);
};
export default HelpdeskForm;
