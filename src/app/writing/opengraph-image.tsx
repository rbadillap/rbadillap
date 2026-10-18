import { home } from "#content"

import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "Writing"
export const size = ogSize
export const contentType = ogContentType

export default function OpengraphImage() {
  return renderOgImage({ title: "Writing", meta: home.name })
}
