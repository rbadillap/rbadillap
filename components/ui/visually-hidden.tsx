import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/lib/utils"

export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "absolute h-px w-px p-0 overflow-hidden whitespace-nowrap border-0",
        "clip-rect-[0px_0px_0px_0px]",
        className
      )}
      {...props}
    />
  )
})

VisuallyHidden.displayName = "VisuallyHidden" 