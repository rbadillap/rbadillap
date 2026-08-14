import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const metaVariants = cva("font-mono text-muted-foreground", {
  variants: {
    variant: {
      label:
        "text-(length:--text-2xs) font-medium uppercase tracking-[0.16em]",
      data: "text-(length:--text-xs)",
    },
  },
  defaultVariants: {
    variant: "label",
  },
})

function Meta({
  className,
  variant = "label",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof metaVariants>) {
  return (
    <span
      data-slot="meta"
      data-variant={variant}
      className={cn(metaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Meta, metaVariants }
