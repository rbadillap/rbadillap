import { checklist, home } from "#content"

import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = checklist.title
export const size = ogSize
export const contentType = ogContentType

export default function OpengraphImage() {
  return renderOgImage({ title: checklist.title, meta: home.name })
}
