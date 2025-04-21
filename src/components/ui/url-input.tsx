"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface UrlInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onAddUrl"> {
  onAddUrl: (url: string) => void;
  isLoading?: boolean;
}

const UrlInput = React.forwardRef<HTMLTextAreaElement, UrlInputProps>(
  ({ className, onAddUrl, isLoading, ...props }, ref) => {
    const [urls, setUrls] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Split text into individual URLs and trim whitespace
      const urlList = urls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      if (urlList.length === 0) {
        toast.error("Enter at least one URL");
        return;
      }

      // Validate that all URLs are valid
      const invalidUrls = urlList.filter((url) => {
        try {
          new URL(url);
          return false;
        } catch {
          return true;
        }
      });

      if (invalidUrls.length > 0) {
        toast.error(`Found invalid URLs: ${invalidUrls.join(", ")}`);
        return;
      }

      // Add each URL sequentially
      urlList.forEach((url) => {
        onAddUrl(url);
      });

      // Clear input field
      setUrls("");
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <div className="relative flex-1">
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className={cn(
              "flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "bg-theme-input backdrop-theme border-theme min-h-[100px] resize-y",
              className
            )}
            placeholder="Enter JSON urls (one per line)"
            required
            {...props}
            ref={ref}
          />
          {urls && (
            <motion.button
              type="button"
              onClick={() => setUrls("")}
              className="absolute right-2 top-2 p-1 rounded-full hover-theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-theme-muted">
            {urls.split("\n").filter((url) => url.trim().length > 0).length} URL
            {urls.split("\n").filter((url) => url.trim().length > 0).length !==
            1
              ? "s"
              : ""}
          </div>
          <Button
            type="submit"
            variant="glass"
            disabled={isLoading || !urls.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UrlInput.displayName = "UrlInput";

export { UrlInput };
