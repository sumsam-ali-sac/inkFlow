"use client";
import { ReactNode } from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Copy,
	Check,
	Download,
	Eye,
	Code,
	Maximize2,
	Minimize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface BlogPreviewProps {
	content: string;
}

export function BlogPreview({ content }: BlogPreviewProps) {
	const [copied, setCopied] = useState(false);
	const [activeTab, setActiveTab] = useState("preview");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { toast } = useToast();

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(content);
		setCopied(true);
		toast({
			title: "Copied to clipboard",
			description:
				"The markdown content has been copied to your clipboard.",
			duration: 2000,
		});
		setTimeout(() => setCopied(false), 2000);
	};

	const downloadMarkdown = () => {
		const element = document.createElement("a");
		const file = new Blob([content], { type: "text/markdown" });
		element.href = URL.createObjectURL(file);
		element.download = "blog-post.md";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		toast({
			title: "Download started",
			description: "Your markdown file is being downloaded.",
			duration: 2000,
		});
	};

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsFullscreen(false);
			}
		};
		window.addEventListener("keydown", handleEsc);
		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<motion.div
			className={cn(
				"space-y-6 mx-auto p-8 bg-black/40 border-1 text-white rounded-xl",
				isFullscreen
					? "fixed inset-0 z-50 m-0 rounded-none"
					: "max-w-4xl"
			)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-white">Blog Preview</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleFullscreen}
					className="text-white hover:bg-white/20">
					{isFullscreen ? (
						<Minimize2 className="h-5 w-5" />
					) : (
						<Maximize2 className="h-5 w-5" />
					)}
				</Button>
			</div>
			<Tabs
				defaultValue="preview"
				className="w-full"
				onValueChange={setActiveTab}>
				<TabsList className="bg-white p-1 rounded-t-xl ">
					<TabsTrigger
						value="preview"
						className="data-[state=active]:bg-black data-[state=active]:text-white text-black px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-zinc-500/50">
						<Eye className="w-4 h-4 mr-2" />
						Preview
					</TabsTrigger>
					<TabsTrigger
						value="markdown"
						className="data-[state=active]:bg-black data-[state=active]:text-white text-black px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-zinc-500/50">
						<Code className="w-4 h-4 mr-2" />
						Markdown
					</TabsTrigger>
				</TabsList>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}>
						<TabsContent
							value="preview"
							className="p-6 rounded-b-xl backdrop-blur-md overflow-auto"
							style={{
								maxHeight: isFullscreen
									? "calc(100vh - 200px)"
									: "600px",
							}}>
							<ReactMarkdown
								components={{
									h1: ({ ...props }) => (
										<h1
											{...props}
											className="text-5xl font-bold mb-8 text-zinc-300 tracking-tight border-b-2 border-zinc-500 pb-4"
										/>
									),
									h2: ({ ...props }) => (
										<h2
											{...props}
											className="text-4xl font-bold mb-6 text-zinc-200 tracking-tight"
										/>
									),
									h3: ({ ...props }) => (
										<h3
											{...props}
											className="text-3xl font-semibold mb-4 text-zinc-100 tracking-tight"
										/>
									),
									p: ({ ...props }) => (
										<p
											{...props}
											className="mb-6 text-stone-100 leading-relaxed text-lg"
										/>
									),
									ul: ({ ...props }) => (
										<ul
											{...props}
											className="list-disc list-inside mb-6 pl-4 text-stone-100 space-y-2"
										/>
									),
									ol: ({ ...props }) => (
										<ol
											{...props}
											className="list-decimal list-inside mb-6 pl-4 text-stone-100 space-y-2"
										/>
									),
									li: ({ ...props }) => (
										<li
											{...props}
											className="mb-2 text-stone-100"
										/>
									),
									a: ({ ...props }) => (
										<a
											{...props}
											className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200 underline"
										/>
									),
									blockquote: ({ ...props }) => (
										<blockquote
											{...props}
											className="border-l-4 border-zinc-500 pl-6 italic text-zinc-200 my-6 bg-stone-800/30 py-4 rounded-r-lg"
										/>
									),
									code: ({
										inline,
										className,
										children,
										...props
									}: React.ComponentPropsWithoutRef<"code"> & {
										inline?: boolean;
									}) => {
										const match = /language-(\w+)/.exec(
											className || ""
										);
										return !inline && match ? (
											<SyntaxHighlighter
												language={match[1]}
												style={atomDark}
												PreTag="div"
												className="rounded-lg my-6 text-sm">
												{String(children).replace(
													/\n$/,
													""
												)}
											</SyntaxHighlighter>
										) : (
											<code
												className="bg-stone-800 text-zinc-300 px-1 py-0.5 rounded text-sm"
												{...props}>
												{children}
											</code>
										);
									},
								}}>
								{content}
							</ReactMarkdown>
						</TabsContent>

						<TabsContent value="markdown" className="mt-6">
							<div className="relative">
								<SyntaxHighlighter
									language="markdown"
									style={atomDark}
									className="rounded-b-xl !bg-stone-900/30 !p-6 overflow-auto text-sm"
									wrapLines={true}
									wrapLongLines={true}
									customStyle={{
										backgroundColor: "transparent",
										color: "#e2e8f0",
									}}
									showLineNumbers={true}
									lineNumberStyle={{ color: "#6c7293" }}>
									{content}
								</SyntaxHighlighter>
								<div className="absolute top-4 right-4 flex space-x-2">
									<Button
										size="icon"
										variant="ghost"
										className="text-stone-200 hover:bg-stone-700/50 hover:text-white transition-colors duration-200"
										onClick={copyToClipboard}>
										{copied ? (
											<Check className="h-4 w-4" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</Button>
									<Button
										size="icon"
										variant="ghost"
										className="text-stone-200 hover:bg-stone-700/50 hover:text-white transition-colors duration-200"
										onClick={downloadMarkdown}>
										<Download className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</TabsContent>
					</motion.div>
				</AnimatePresence>
			</Tabs>

			<Toaster />
		</motion.div>
	);
}
