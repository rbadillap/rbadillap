import { resume } from "#content"

import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = resume.name
export const size = ogSize
export const contentType = ogContentType

export default function OpengraphImage() {
  return renderOgImage({ title: resume.name, meta: resume.positioning })
}
