"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogPreviewProps {
	content: string;
}

export function BlogPreview({ content }: BlogPreviewProps) {
	const [copied, setCopied] = useState(false);
	const [activeTab, setActiveTab] = useState("preview");

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(content);
		setCopied(true);
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
	};

	return (
		<motion.div
			className="space-y-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<Tabs
				defaultValue="preview"
				className="w-full"
				onValueChange={setActiveTab}>
				<TabsList className="bg-purple-900 p-1 rounded-t-lg">
					<TabsTrigger
						value="preview"
						className="data-[state=active]:bg-purple-700 font-sans transition-all duration-200 ease-in-out">
						Preview
					</TabsTrigger>
					<TabsTrigger
						value="markdown"
						className="data-[state=active]:bg-purple-700 font-sans transition-all duration-200 ease-in-out">
						Markdown
					</TabsTrigger>
				</TabsList>
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}>
						<TabsContent
							value="preview"
							className="prose dark:prose-invert max-w-none mt-4 bg-white/10 p-6 rounded-b-lg backdrop-blur-sm">
							<ReactMarkdown
								components={{
									h1: ({ node, ...props }) => (
										<h1
											{...props}
											className="text-3xl font-bold mb-4 font-display text-purple-300"
										/>
									),
									h2: ({ node, ...props }) => (
										<h2
											{...props}
											className="text-2xl font-bold mb-3 font-display text-purple-200"
										/>
									),
									h3: ({ node, ...props }) => (
										<h3
											{...props}
											className="text-xl font-bold mb-2 font-display text-purple-100"
										/>
									),
									p: ({ node, ...props }) => (
										<p
											{...props}
											className="mb-4 font-sans text-gray-200"
										/>
									),
									ul: ({ node, ...props }) => (
										<ul
											{...props}
											className="list-disc list-inside mb-4"
										/>
									),
									ol: ({ node, ...props }) => (
										<ol
											{...props}
											className="list-decimal list-inside mb-4"
										/>
									),
									li: ({ node, ...props }) => (
										<li {...props} className="mb-2" />
									),
									a: ({ node, ...props }) => (
										<a
											{...props}
											className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
										/>
									),
									blockquote: ({ node, ...props }) => (
										<blockquote
											{...props}
											className="border-l-4 border-purple-500 pl-4 italic my-4"
										/>
									),
									pre: ({ children, node }) => {
										if (
											node &&
											"tagName" in node &&
											node.tagName === "pre"
										) {
											const childNode = node.children[0];
											if (
												childNode &&
												"tagName" in childNode &&
												childNode.tagName === "code"
											) {
												childNode.properties =
													childNode.properties || {};
												childNode.properties.inline =
													false;
											}
										}
										return (
											<pre className="rounded-md bg-muted p-4 overflow-x-auto">
												{children}
											</pre>
										);
									},
									code: ({
										children,
										className,
										node,
										...rest
									}) => {
										const match = /language-(\w+)/.exec(
											className || ""
										);
										const lang = match && match[1];

										return (
											<code
												className={cn(
													"px-1 py-0.5 rounded-sm text-sm font-mono md-code-inline",
													className
												)}
												{...rest}>
												{children}
											</code>
										);
									},
								}}>
								{content}
							</ReactMarkdown>
						</TabsContent>
						<TabsContent value="markdown" className="mt-4">
							<div className="relative">
								<SyntaxHighlighter
									language="markdown"
									style={oneDark}
									className="rounded-b-lg !bg-purple-900 !p-4 !overflow-x-auto text-sm">
									{content}
								</SyntaxHighlighter>
								<div className="absolute top-2 right-2 flex space-x-2">
									<Button
										size="icon"
										variant="ghost"
										className="text-white hover:bg-purple-700 transition-colors duration-200"
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
										className="text-white hover:bg-purple-700 transition-colors duration-200"
										onClick={downloadMarkdown}>
										<Download className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</TabsContent>
					</motion.div>
				</AnimatePresence>
			</Tabs>
		</motion.div>
	);
}
