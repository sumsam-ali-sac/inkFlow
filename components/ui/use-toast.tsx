import {
	useState,
	useEffect,
	createContext,
	useContext,
	type ReactNode,
} from "react";

interface ToastProps {
	id: number;
	title: string;
	description?: string;
	duration?: number;
}

interface ToastContextType {
	toast: (props: Omit<ToastProps, "id">) => void;
	toasts: ToastProps[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastProps[]>([]);

	const toast = ({
		title,
		description,
		duration = 3000,
	}: Omit<ToastProps, "id">) => {
		const id = Date.now();
		setToasts((prevToasts) => [
			...prevToasts,
			{ id, title, description, duration },
		]);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setToasts((prevToasts) =>
				prevToasts.filter((toast) => {
					const elapsed = Date.now() - toast.id;
					return (
						toast.duration === undefined || elapsed < toast.duration
					);
				})
			);
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return (
		<ToastContext.Provider value={{ toast, toasts }}>
			{children}
			<Toaster />
		</ToastContext.Provider>
	);
}

function Toaster() {
	const { toasts } = useToast();

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className="bg-purple-800 text-white p-4 rounded-lg shadow-lg mb-2 animate-fade-in-up">
					<h3 className="font-bold">{toast.title}</h3>
					{toast.description && (
						<p className="text-sm mt-1">{toast.description}</p>
					)}
				</div>
			))}
		</div>
	);
}
