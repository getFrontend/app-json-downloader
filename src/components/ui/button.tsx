"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

const buttonVariants = {
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-white/10 text-theme-text hover:bg-white/20 border button-border-theme",
    destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    outline: "border button-border-theme hover:bg-white/10",
    secondary: "bg-white/5 text-theme-text hover:bg-white/10",
    ghost: "hover:bg-white/10",
    link: "text-theme-text underline-offset-4 hover:underline",
    glass: "button-bg-theme backdrop-blur-md border button-border-theme",
  },
  sizes: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9 p-0",
  },
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: keyof typeof buttonVariants.variants
  size?: keyof typeof buttonVariants.sizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const classes = [
      buttonVariants.base,
      buttonVariants.variants[variant],
      buttonVariants.sizes[size],
      className,
    ].join(" ")

    return (
      <motion.button
        className={classes}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }