"use client"

import { useActionState } from "react"
import { subscribe, type SubscribeState } from "@/app/actions"

const initialState: SubscribeState = { status: "idle", message: "" }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState)

  if (state.status === "success") {
    return (
      <p className="text-primary" role="status">
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction}>
      <div className="flex items-baseline gap-4 border-b border-primary">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-(length:--text-body) text-primary placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-w-[84px] shrink-0 py-2.5 text-right font-mono text-(length:--text-2xs) font-medium uppercase tracking-[0.16em] text-primary transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-50"
        >
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p
        className={`mt-3 min-h-5 text-(length:--text-sm) ${state.status === "error" ? "text-primary" : "text-muted-foreground"}`}
        role="status"
        aria-live="polite"
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  )
}
