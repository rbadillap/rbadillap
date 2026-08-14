import * as React from "react"

import { cn } from "@/lib/utils"

function Node({
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="node"
      aria-hidden={ariaHidden}
      className={cn("size-[5px] shrink-0 rounded-full bg-primary", className)}
      {...props}
    />
  )
}

export { Node }
