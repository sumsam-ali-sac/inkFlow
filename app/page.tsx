"use client";
import Link from "next/link";
import {
	ArrowRight,
	Sparkles,
	Zap,
	RefreshCw,
	Share2,
	CheckCircle,
	Users,
	TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
	() => import("@/components/particle-background"),
	{ ssr: false }
);

const features = [
	{
		icon: Zap,
		title: "Lightning Fast",
		description:
			"Generate complete blog posts in seconds with our advanced AI.",
	},
	{
		icon: RefreshCw,
		title: "Endless Variations",
		description: "Regenerate and refine until you get the perfect content.",
	},
	{
		icon: Share2,
		title: "Easy Export",
		description:
			"Export your content in markdown or HTML format instantly.",
	},
	{
		icon: CheckCircle,
		title: "SEO Optimized",
		description:
			"Our AI ensures your content is optimized for search engines.",
	},
	{
		icon: Users,
		title: "Collaborative Editing",
		description: "Work together with your team in real-time.",
	},
	{
		icon: TrendingUp,
		title: "Analytics Integration",
		description:
			"Track your content's performance with built-in analytics.",
	},
];

const testimonials = [
	{
		name: "Sarah J.",
		role: "Content Marketer",
		quote: "InkFlow has revolutionized our content creation process. It's a game-changer!",
	},
	{
		name: "Michael R.",
		role: "Freelance Writer",
		quote: "I've tripled my output without sacrificing quality. InkFlow is a must-have tool.",
	},
	{
		name: "Emily T.",
		role: "SEO Specialist",
		quote: "The SEO-optimized content InkFlow produces has significantly improved our search rankings.",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
			<ParticleBackground />
			<header className="w-full px-4 lg:px-6 h-14 flex items-center z-10">
				<Link className="flex items-center justify-center" href="/">
					<Sparkles className="h-6 w-6 mr-2 text-yellow-400" />
					<span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
						InkFlow
					</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link
						className="text-sm font-medium hover:text-purple-400 transition-colors"
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
								className="space-y-2">
								<h1 className="text-4xl  font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none xl:text-8xl/none font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
									Unleash Your Creativity with AI-Powered
									Blogging
								</h1>
								<p className="mx-auto text-gray-200 md:text-xl lg:text-2xl font-sans">
									Craft engaging, SEO-optimized blog content
									in seconds. Perfect for writers, marketers,
									and content creators.
								</p>
							</motion.div>
							<motion.div
								className="space-x-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.5 }}>
								<Link href="/generate">
									<Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
										Start Writing
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
								<Button
									variant="outline"
									className="px-8 py-6 text-lg border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300">
									Learn More
								</Button>
							</motion.div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-white text-gray-800">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-display">
							Revolutionize Your Content Creation
						</h2>
						<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
							{features.map((feature, index) => (
								<motion.div
									key={index}
									className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg transition-all hover:bg-purple-100"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ scale: 1.05 }}>
									<feature.icon className="h-12 w-12 mb-4 text-purple-600" />
									<h3 className="text-xl font-bold">
										{feature.title}
									</h3>
									<p className="text-gray-600">
										{feature.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 font-display">
							What Our Users Say
						</h2>
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={index}
									className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-white/10 backdrop-blur-lg shadow-xl"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.2 }}
									whileHover={{ scale: 1.05 }}>
									<p className="text-lg italic mb-4">
										"{testimonial.quote}"
									</p>
									<h4 className="font-semibold">
										{testimonial.name}
									</h4>
									<p className="text-sm text-purple-300">
										{testimonial.role}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-white text-gray-800">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
						<div className="max-w-3xl mx-auto flex flex-col items-center space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-display">
								Ready to Transform Your Content?
							</h2>
							<p className="max-w-[600px] text-gray-600 md:text-xl">
								Join thousands of content creators who are
								already using InkFlow to supercharge their
								blogging process.
							</p>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Link href="/generate">
									<Button className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
										Get Started Now
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
			</main>
			<footer className="w-full py-6 bg-gray-900 text-gray-300 z-10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full flex flex-col sm:flex-row justify-between items-center">
					<p className="text-sm">
						© 2024 InkFlow. All rights reserved.
					</p>
					<nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
						<Link
							className="text-sm hover:text-purple-400 transition-colors"
							href="#">
							Terms of Service
						</Link>
						<Link
							className="text-sm hover:text-purple-400 transition-colors"
							href="#">
							Privacy Policy
						</Link>
					</nav>
				</div>
			</footer>
		</div>
	);
}
