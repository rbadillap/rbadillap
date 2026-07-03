export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="150"
      height="42"
      viewBox="0 0 150 42"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="34" x2="150" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <path d="M 49 34 A 26 26 0 0 1 101 34" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="49" cy="34" r="2.4" fill="currentColor" />
      <circle cx="101" cy="34" r="2.4" fill="currentColor" />
      <circle cx="75" cy="8" r="1.6" fill="currentColor" />
    </svg>
  )
}
