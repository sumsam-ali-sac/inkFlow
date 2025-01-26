import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "inkFlow",
	description: "Created with langGraph, Nextjs and love",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
