"use client";

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...props }) => (
				<Toast
					key={id}
					{...props}
					className="bg-gradient-to-r from-zinc-500 to-stone-600 text-white border-zinc-400">
					<div className="grid gap-1">
						{title && (
							<ToastTitle className="text-white">
								{title}
							</ToastTitle>
						)}
						{description && (
							<ToastDescription className="text-zinc-100">
								{description}
							</ToastDescription>
						)}
					</div>
					{action}
					<ToastClose className="text-zinc-200 hover:text-white" />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
