"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPreview } from "@/components/blog-preview";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
export function BlogGenerator() {
	const [topic, setTopic] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [generatedContent, setGeneratedContent] = useState("");
	const { toast } = useToast();

	const generateBlog = async () => {
		if (!topic.trim()) {
			toast({
				title: "Error",
				description: "Please enter a topic before generating.",
				variant: "destructive",
			});
			return;
		}

		setIsGenerating(true);
		try {
			// const response = await fetch("/api/generate", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ topic }),
			// });
			// const data = await response.json();
			setGeneratedContent(`
# Welcome to the Markdown Previewer!

This is a **Markdown** example rendered in a Next.js app. Below are some common Markdown elements:

## Headers
You can create headers like this:
- **# H1**
- **## H2**
- **### H3**

---

## Lists
### Unordered List
- Item 1
- Item 2
  - Nested Item 1
  - Nested Item 2

### Ordered List
1. First item
2. Second item
3. Third item

---

## Links
[Click here to learn more about Markdown](https://commonmark.org)

---

## Images
![Next.js Logo](https://nextjs.org/static/favicon/favicon-32x32.png)

---

## Code Blocks
### Inline Code
You can add \`inline code\` like this.

### Block Code
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Next.js"));
\`\`\`

---

## Blockquotes
> "Markdown is a lightweight markup language." – *Someone Smart*

---

## Tables
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

---

## Horizontal Rule
Use three dashes (\`---\`) to create a horizontal rule.

---

## Task List
- [x] Write some Markdown
- [x] Render it in Next.js
- [ ] Add more features

Enjoy creating your Markdown content!
          `);

			setShowPreview(true);
			toast({
				title: "Success",
				description: "Your blog post has been generated!",
				variant: "default",
			});
		} catch (error) {
			console.error("Failed to generate blog:", error);
			setGeneratedContent(`# ${topic}

## Introduction

In today's rapidly evolving digital landscape, ${topic} is a crucial topic for both individuals and businesses.

## Key Points

1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Conclusion

As we look to the future, ${topic} will continue to shape our world in unprecedented ways.`);
			setShowPreview(true);
			toast({
				title: "Error",
				description:
					"Failed to generate blog post. Using fallback content.",
				variant: "destructive",
			});
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto space-y-8 flex flex-col items-center min-h-screen justify-center">
			<div className="flex items-center gap-4 w-full">
				<Link href="/">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:text-zinc-300">
						<ArrowLeft className="h-6 w-6" />
					</Button>
				</Link>
				<h1 className="text-4xl font-bold text-center flex-grow text-white">
					Create Your Blog Post
				</h1>
			</div>

			<div className="space-y-6 w-full max-w-2xl">
				<div className="space-y-4">
					<label className="text-2xl font-medium text-center block text-white">
						Topic
					</label>
					<Input
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						placeholder="Enter a topic..."
						className="w-full bg-white/10 border-white text-white placeholder-zinc-300"
					/>
				</div>

				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full">
					<Button
						onClick={generateBlog}
						disabled={isGenerating || !topic.trim()}
						className="w-full py-6 text-lg bg-gradient-to-r bg-white text-black transition-all duration-300 ease-in-out transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
						{isGenerating ? (
							<>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								<span className="font-sans">
									Crafting Your Masterpiece...
								</span>
							</>
						) : (
							<>
								<Sparkles className="mr-2 h-5 w-5" />
								<span className="font-sans">
									Generate Blog Post
								</span>
							</>
						)}
					</Button>
				</motion.div>
			</div>

			{showPreview && <BlogPreview content={generatedContent} />}

			<Toaster />
		</motion.div>
	);
}
