"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2, X, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BlogPreview } from "@/components/blog-preview"
import { Toaster } from "@/components/ui/toaster"

interface Topic {
  id: string
  text: string
}

export function BlogGenerator() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleAddTopic = () => {
    if (currentInput.trim()) {
      setTopics([...topics, { id: Math.random().toString(), text: currentInput.trim() }])
      setCurrentInput("")
    }
  }

  const handleRemoveTopic = (id: string) => {
    setTopics(topics.filter((topic) => topic.id !== id))
  }

  const generateBlog = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topics: topics.map((t) => t.text),
        }),
      })
      const data = await response.json()
      setGeneratedContent(data.content)
      setShowPreview(true)
    } catch (error) {
      console.error("Failed to generate blog:", error)
      setGeneratedContent(`# The Future of Technology

## Introduction

In today's rapidly evolving digital landscape, staying ahead of technological trends is crucial for both individuals and businesses.

## Key Topics

${topics.map((t) => `### ${t.text}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n`).join("")}

## Conclusion

As we look to the future, these developments will continue to shape our world in unprecedented ways.`)
      setShowPreview(true)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 flex flex-col items-center min-h-screen justify-center"
    >
      <div className="flex items-center gap-4 w-full">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white hover:text-purple-300">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-center flex-grow bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-display">
          Create Your Blog Post
        </h1>
      </div>

      <div className="space-y-6 w-full max-w-2xl">
        <div className="space-y-4">
          <label className="text-2xl font-medium text-center block text-purple-300 font-display">Topics</label>
          <div className="flex gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
              placeholder="Enter a topic..."
              className="flex-grow bg-white/10 border-purple-500 text-white placeholder-purple-300"
            />
            <Button onClick={handleAddTopic} size="icon" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <motion.div className="flex flex-wrap justify-center gap-2 mt-4" layout>
            <AnimatePresence>
              {topics.map((topic) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-sm group hover:bg-purple-600 bg-purple-800 text-white transition-colors"
                  >
                    {topic.text}
                    <button
                      onClick={() => handleRemoveTopic(topic.id)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
          <Button
            onClick={generateBlog}
            disabled={isGenerating || topics.length === 0}
            className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="font-sans">Crafting Your Masterpiece...</span>
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                <span className="font-sans">Generate Blog Post</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-300 font-display">
              Your Generated Blog Post
            </DialogTitle>
            <DialogDescription className="text-purple-200">
              Preview your AI-generated content below. You can switch between the preview and markdown views.
            </DialogDescription>
          </DialogHeader>
          <BlogPreview content={generatedContent} />
        </DialogContent>
      </Dialog>

      <Toaster />
    </motion.div>
  )
}

