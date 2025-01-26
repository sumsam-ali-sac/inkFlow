"use client";
import { BlogGenerator } from "@/components/blog-generator";
import ParticleBackground from "@/components/particle-background";

export default function GeneratePage() {
	return (
		<div className="min-h-screen bg-black text-white relative">
			<ParticleBackground />
			<div className="container mx-auto p-4 relative z-10">
				<BlogGenerator />
			</div>
		</div>
	);
}
