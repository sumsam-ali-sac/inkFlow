"use client";
import Link from "next/link";
import {
	ArrowRight,
	Sparkles,
	Server,
	Database,
	Code,
	GitBranch,
	Cpu,
	Workflow,
	FileText,
	PenTool,
	Layers,
	Send,
	Search,
	Filter,
	Edit,
	Edit2,
	FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
	() => import("@/components/particle-background"),
	{ ssr: false }
);

const technologies = [
	{
		icon: Server,
		name: "FastAPI",
		description: "High-performance Python web framework",
	},
	{
		icon: Database,
		name: "Pydantic",
		description: "Data validation using Python type annotations",
	},
	{
		icon: Code,
		name: "LangChain",
		description: "Framework for LLM-powered applications",
	},
	{
		icon: Code,
		name: "LangGraph",
		description: "Framework for building LLM-powered workflows",
	},
	{
		icon: Cpu,
		name: "Azure OpenAI",
		description: "Advanced language models for content generation",
	},
];

const blogGenerationSteps = [
	{
		icon: FileText,
		title: "Initiate Blog Generation",
		description: "Request made to /Generateblog-v1 endpoint",
	},
	{
		icon: PenTool,
		title: "Generate Blog Plan",
		description: "AI creates a structured outline for your blog post",
	},
	{
		icon: Layers,
		title: "Write Sections",
		description: "Each section is crafted with precision and creativity",
	},
	{
		icon: Workflow,
		title: "Compile Final Blog",
		description: "All sections are combined into a cohesive post",
	},
	{
		icon: Send,
		title: "Return Result",
		description: "Final blog content is returned as the API response",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-black text-white">
			<ParticleBackground />
			<header className="w-full px-4 lg:px-6 h-14 flex items-center z-10">
				<Link className="flex items-center justify-center" href="/">
					<Sparkles className="h-6 w-6 mr-2 text-yellow-400" />
					<span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
						InkFlow
					</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-sm font-medium hover:text-zinc-400 transition-colors"
						href="/generate">
						Generate
					</Link>
				</nav>
			</header>
			<main className="flex-1 relative z-10">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<div className="flex flex-col items-center space-y-4 text-center">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="space-y-8">
								<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none xl:text-8xl/none font-display bg-clip-text text-white">
									Unleash Your Creativity with AI-Powered
									Blogging
								</h1>
								<p className="mt-6 mx-auto text-gray-100 md:text-xl lg:text-2xl font-sans max-w-3xl">
									InkFlow leverages cutting-edge technologies
									to revolutionize your content creation
									process. Discover the power of our advanced
									backend.
								</p>
							</motion.div>
							<motion.div
								className="space-x-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.5 }}>
								<Link href="/generate">
									<Button className="px-8 py-6 text-lg bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
										Start Writing
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
								<Button
									variant="outline"
									className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-black transition-all duration-300">
									Learn More
								</Button>
							</motion.div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 text-black">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-black font-display">
							Powered by Cutting-Edge Technology
						</h2>
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
							{technologies.map((tech, index) => (
								<motion.div
									key={index}
									className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg transition-all hover:bg-gray-100"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ scale: 1.05 }}>
									<tech.icon className="h-12 w-12 mb-4 text-black" />
									<h3 className="text-xl font-bold">
										{tech.name}
									</h3>
									<p className="text-black">
										{tech.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 white">
							Blog Generation Process
						</h2>
						<div className="max-w-4xl mx-auto">
							{blogGenerationSteps.map((step, index) => (
								<motion.div
									key={index}
									className="flex items-start space-x-4 mb-8"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.2 }}>
									<div className="flex-shrink-0">
										<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
											<step.icon className="h-6 w-6 text-gray-600" />
										</div>
									</div>
									<div>
										<h3 className="text-xl font-bold mb-2">
											{step.title}
										</h3>
										<p className="text-gray-50">
											{step.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 text-black">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-black">
							Key Components
						</h2>
						<div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
							<Card>
								<CardHeader>
									<CardTitle>FastAPI Server</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										The main entry point for the backend,
										exposing the /Generateblog-v1 endpoint
										to generate blog posts.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Blog State Management</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Manages the blog state using Pydantic
										models and dataclasses, including
										BlogState, BlogStateInput, and
										BlogStateOutput.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Graph-based Workflow</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Manages the blog generation process
										using a state graph, defining steps and
										transitions between different states.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										LangChain and Azure OpenAI
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Handles content generation using
										LangChain and Azure OpenAI's GPT 4o
										model, with prompts defined for
										different blog sections.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<div className="max-w-3xl mx-auto flex flex-col items-center space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
								Ready to Transform Your Content?
							</h2>
							<p className="max-w-[600px] text-gray-50 md:text-xl">
								Experience the power of our modular and scalable
								approach to generating blog content. Start
								creating with InkFlow today.
							</p>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href="/generate">
									<Button className="px-8 py-6 text-lg bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
										Get Started Now
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
			</main>
			<footer className="w-full py-6 bg-white text-black z-10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full flex flex-col sm:flex-row justify-between items-center">
					<p className="text-sm">
						© 2024 InkFlow. All rights reserved.
					</p>
					<nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
						<Link
							className="text-sm hover:text-gray-400 transition-colors"
							href="#">
							Github
						</Link>

						<Link
							className="text-sm hover:text-gray-400 transition-colors"
							href="#">
							Sumsam Ali
						</Link>
					</nav>
				</div>
			</footer>
		</div>
	);
}
