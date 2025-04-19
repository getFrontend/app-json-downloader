import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "./button"
import { Download, Loader2, X } from "lucide-react"

interface JsonPreviewProps {
  url: string
  data: string
  error?: string
  isLoading: boolean
  onRemove: () => void
  onDownload: (filename: string) => void
}

const JsonPreview = React.forwardRef<HTMLDivElement, JsonPreviewProps>(
  ({ url, data, error, isLoading, onRemove, onDownload }, ref) => {
    // Generate a formatted date (YYYY-MM-DD) and random ID for the filename
    const formattedDate = new Date().toISOString().split('T')[0]
    const randomId = Math.random().toString(36).substring(2, 5)
    const [filename, setFilename] = React.useState(
      `jsoneo_${formattedDate}_${randomId}.txt`
    )

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 truncate mr-2">
            <p className="text-sm text-white/80 truncate">{url}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-white/50" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-sm mb-2"
                placeholder="File name"
              />
            </div>
            <pre className="bg-black/20 rounded p-2 text-sm overflow-auto max-h-40 mb-4">
              {data.split("\n").slice(0, 10).join("\n")}
              {data.split("\n").length > 10 && (
                <span className="text-white/50">{"\n..."}</span>
              )}
            </pre>
            <Button
              variant="glass"
              onClick={() => onDownload(filename)}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </>
        )}
      </motion.div>
    )
  }
)

JsonPreview.displayName = "JsonPreview"

export { JsonPreview }