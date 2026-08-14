import * as React from "react"

import { cn } from "@/lib/utils"

function Rule({
  className,
  orientation = "horizontal",
  "aria-hidden": ariaHidden = true,
  ...props
}: React.ComponentProps<"span"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <span
      data-slot="rule"
      data-orientation={orientation}
      aria-hidden={ariaHidden}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Rule }
