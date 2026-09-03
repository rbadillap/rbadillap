"use client"

import * as React from "react"

import { Meta, metaVariants } from "@/components/meta"
import { Section } from "@/components/section"
import { cn } from "@/lib/utils"

type ChecklistState = {
  checked: ReadonlySet<string>
  toggle: (id: string) => void
  reset: () => void
}

const ChecklistContext = React.createContext<ChecklistState | null>(null)

function useChecklist() {
  const ctx = React.useContext(ChecklistContext)
  if (!ctx) throw new Error("Checklist parts must render inside <Checklist>")
  return ctx
}

const EMPTY: ReadonlySet<string> = new Set()

type Store = {
  subscribe: (listener: () => void) => () => void
  get: () => ReadonlySet<string>
  set: (next: ReadonlySet<string>) => void
}

/**
 * Progress lives only in the reader's browser: one localStorage key per
 * checklist, exposed as an external store (module-level, one per key)
 * and read through useSyncExternalStore. The server snapshot is empty,
 * so the hydrated render agrees with the server and the stored state
 * lands as the first client update — never a mismatch. Other tabs stay
 * in sync through the storage event.
 */
const stores = new Map<string, Store>()

function createStore(storageKey: string): Store {
  let cache: ReadonlySet<string> | undefined
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((listener) => listener())
  const load = (): ReadonlySet<string> => {
    try {
      const raw = localStorage.getItem(storageKey)
      return new Set(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {
      return new Set()
    }
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key !== storageKey) return
    cache = undefined
    emit()
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      if (listeners.size === 1) window.addEventListener("storage", onStorage)
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0) window.removeEventListener("storage", onStorage)
      }
    },
    get: () => (cache ??= load()),
    set(next) {
      cache = next
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]))
      } catch {}
      emit()
    },
  }
}

function getStore(storageKey: string): Store {
  let store = stores.get(storageKey)
  if (!store) {
    store = createStore(storageKey)
    stores.set(storageKey, store)
  }
  return store
}

function useStoredSet(
  storageKey: string,
): [ReadonlySet<string>, (next: ReadonlySet<string>) => void] {
  const store = getStore(storageKey)
  const value = React.useSyncExternalStore(store.subscribe, store.get, () => EMPTY)
  return [value, store.set]
}

function Checklist({
  storageKey,
  children,
}: {
  storageKey: string
  children: React.ReactNode
}) {
  const [checked, setChecked] = useStoredSet(storageKey)

  const value = React.useMemo<ChecklistState>(
    () => ({
      checked,
      toggle: (id) => {
        const next = new Set(checked)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        setChecked(next)
      },
      reset: () => setChecked(new Set()),
    }),
    [checked, setChecked],
  )

  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>
}

/** A category: a section whose label row counts what is done. */
function ChecklistSection({
  label,
  ids,
  className,
  children,
}: {
  label: string
  ids: string[]
  className?: string
  children: React.ReactNode
}) {
  const { checked } = useChecklist()
  const done = ids.filter((id) => checked.has(id)).length

  return (
    <Section
      label={label}
      className={className}
      aside={
        <Meta variant="data" className="tabular-nums" aria-label={`${done} of ${ids.length} done`}>
          {done} / {ids.length}
        </Meta>
      }
    >
      <ul className="space-y-3">{children}</ul>
    </Section>
  )
}

/**
 * One item. The control is a node: an empty ring that fills with strong
 * ink when the item is done — the point of execution. The whole row is
 * the hit area; the text recedes to muted once checked.
 */
function ChecklistItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { checked, toggle } = useChecklist()
  const isChecked = checked.has(id)

  return (
    <li>
      <label className="group flex cursor-pointer items-start gap-3.5">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          onChange={() => toggle(id)}
        />
        <span
          aria-hidden="true"
          data-slot="node"
          className="mt-2 size-[9px] shrink-0 rounded-full border border-muted-foreground transition-colors group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-1 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-primary"
        />
        <span className="transition-colors peer-checked:text-muted-foreground peer-checked:[&_a]:text-muted-foreground">
          {children}
        </span>
      </label>
    </li>
  )
}

/** Clears every item. Invisible until something is checked, so the page never shifts. */
function ChecklistReset({ className }: { className?: string }) {
  const { checked, reset } = useChecklist()
  const empty = checked.size === 0

  return (
    <button
      type="button"
      onClick={reset}
      disabled={empty}
      aria-hidden={empty}
      tabIndex={empty ? -1 : 0}
      className={cn(
        metaVariants({ variant: "label" }),
        "-my-2 py-2 transition-colors hover:text-primary",
        empty && "invisible",
        className,
      )}
    >
      Reset
    </button>
  )
}

/** Copies the full prompt — preamble plus the checklist as markdown. */
function CopyPrompt({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn(
        metaVariants({ variant: "label" }),
        "-my-2 py-2 text-primary transition-transform duration-150 ease-out active:scale-[0.96]",
        className,
      )}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/** Reveals the rest of the prompt in place — what "Copy" actually copies. */
function ShowMore({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <>
      {open && <div id={id}>{children}</div>}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          metaVariants({ variant: "label" }),
          "-my-2 py-2 transition-colors hover:text-primary",
        )}
      >
        {open ? "Show less" : "Show more"}
      </button>
    </>
  )
}

export { Checklist, ChecklistSection, ChecklistItem, ChecklistReset, CopyPrompt, ShowMore }
