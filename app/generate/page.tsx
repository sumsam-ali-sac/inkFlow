"use client";
import { BlogGenerator } from "@/components/blog-generator";
import ParticleBackground from "@/components/particle-background";

export default function GeneratePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative">
			<ParticleBackground />
			<div className="container mx-auto p-4 relative z-10">
				<BlogGenerator />
			</div>
		</div>
	);
}
