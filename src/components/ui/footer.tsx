"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="max-w-4xl mx-auto w-full p-4 border-t border-white/10 text-center text-white/60 flex items-center justify-between gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
        <p className="text-sm">© {currentYear} - JSONeo by <span className="text-secondary">Sergey</span></p>
        <motion.a
          href="https://github.com/getFrontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="h-4 w-4" />
        </motion.a>
    </motion.footer>
  )
}