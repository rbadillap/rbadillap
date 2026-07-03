"use server"

import { Resend } from "resend"

export type SubscribeState = {
  status: "idle" | "success" | "error"
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim()

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email." }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return { status: "error", message: "Newsletter isn't live yet — check back soon." }
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.contacts.create({ email, unsubscribed: false })

  if (error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      return { status: "error", message: "Newsletter isn't live yet — check back soon." }
    }
    return { status: "error", message: "Something went wrong. Try again." }
  }

  return { status: "success", message: "You're in." }
}
