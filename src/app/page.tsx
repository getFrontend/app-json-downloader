"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "sonner"
import { UrlInput } from "@/components/ui/url-input"
import { JsonPreview } from "@/components/ui/json-preview"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { fetchJson, saveFile } from "@/lib/jsonUtils"
import Image from "next/image"

interface JsonItem {
  url: string
  data: string
  error?: string
  isLoading: boolean
}

export default function Home() {
  const [urls, setUrls] = React.useState<JsonItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAddUrl = async (url: string) => {
    // Check if this URL is already added
    if (urls.some((item) => item.url === url)) {
      return
    }

    setUrls((prev) => [...prev, { url, data: "", isLoading: true }])
    setIsLoading(true)

    try {
      const result = await fetchJson(url)
      setUrls((prev) =>
        prev.map((item) =>
          item.url === url
            ? { ...item, data: result.data, error: result.error, isLoading: false }
            : item
        )
      )
    } catch (error) {
      setUrls((prev) =>
        prev.map((item) =>
          item.url === url
            ? {
                ...item,
                error: error instanceof Error ? error.message : "Unknown error",
                isLoading: false,
              }
            : item
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveUrl = (url: string) => {
    setUrls((prev) => prev.filter((item) => item.url !== url))
  }

  const handleDownload = (url: string, filename: string) => {
    const item = urls.find((item) => item.url === url)
    if (item && !item.error) {
      saveFile(item.data, filename)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="flex items-center gap-2">
            <Image src="/images/jsoneo-logo.png" alt="JSONeo logo" width={42} height={42} />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              JSONeo
            </span>
          </h1>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <UrlInput onAddUrl={handleAddUrl} isLoading={isLoading} />

          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence>
              {urls.map((item) => (
                <JsonPreview
                  key={item.url}
                  url={item.url}
                  data={item.data}
                  error={item.error}
                  isLoading={item.isLoading}
                  onRemove={() => handleRemoveUrl(item.url)}
                  onDownload={(filename) => handleDownload(item.url, filename)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  )
}
