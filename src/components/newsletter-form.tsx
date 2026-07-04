"use client"

import { useActionState } from "react"
import { subscribe, type SubscribeState } from "@/app/actions"

const initialState: SubscribeState = { status: "idle", message: "" }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState)

  if (state.status === "success") {
    return (
      <p className="text-foreground-strong" role="status">
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction}>
      <div className="flex items-baseline gap-4 border-b border-foreground-strong">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-foreground-strong placeholder:text-foreground-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-w-[84px] shrink-0 py-2.5 text-right font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-foreground-strong transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-50"
        >
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p
        className={`mt-3 min-h-5 text-[13px] ${state.status === "error" ? "text-foreground-strong" : "text-foreground-muted"}`}
        role="status"
        aria-live="polite"
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  )
}
