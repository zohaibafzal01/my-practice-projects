import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Core styling
          "flex h-10 w-full rounded-md border border-[#E2DCD5] bg-[#14181F] px-3 py-2 text-base placeholder:text-cyan-100/50 text-[#E2DCD5]",
          // Remove all focus styles
          "focus:outline-none focus:ring-0 focus:outline-0",
          // Autofill override
          "autofill:shadow-[inset_0_0_0_1000px_#14181F] autofill:text-[#E2DCD5]",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
