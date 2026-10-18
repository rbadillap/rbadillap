import { Meta } from "@/components/meta"
import { cn } from "@/lib/utils"

/** Marks a draft where drafts are visible (previews, dev), in the home's "Coming soon" register. */
export function DraftTag({ className }: { className?: string }) {
  return <Meta className={cn("ml-2 font-normal tracking-[0.12em]", className)}>Draft</Meta>
}
