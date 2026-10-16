import * as React from "react"
import type { ThemeMode, ThemeOption } from "./palette"

type ThemeContextValue = {
  /** Active theme name; undefined until the client has read the page, so the server renders no guess. */
  theme: string | undefined
  /** Whether the active theme is currently drawn dark; undefined until read. */
  resolvedMode: "dark" | "light" | undefined
  themes: ThemeOption[]
  setTheme: (name: string) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

// The page state lives on <html> (data-theme and .dark), where the blocking script in the root
// layout puts it before first paint. React subscribes to it instead of keeping a copy.
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const notify = () => listeners.forEach((listener) => listener())

const readTheme = () => document.documentElement.dataset.theme
const readMode = () => (document.documentElement.classList.contains("dark") ? "dark" : "light")
const readNothing = () => undefined

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)")
const isDark = (mode: ThemeMode) => (mode === "system" ? systemDark().matches : mode === "dark")

// Swapping a theme changes every color at once; transitions would make each element ease on its own clock.
function withoutTransitions(change: () => void) {
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(style)
  change()
  getComputedStyle(document.body) // flush styles while transitions are off
  setTimeout(() => style.remove(), 1)
}

function ThemeProvider({
  themes,
  storageKey,
  children,
}: {
  themes: ThemeOption[]
  /** Where the visitor's choice is remembered in localStorage; the same key the head script reads. */
  storageKey: string
  children: React.ReactNode
}) {
  const theme = React.useSyncExternalStore(subscribe, readTheme, readNothing)
  const resolvedMode = React.useSyncExternalStore<"dark" | "light" | undefined>(subscribe, readMode, readNothing)

  const setTheme = React.useCallback(
    (name: string) => {
      const next = themes.find((candidate) => candidate.name === name)
      if (!next) return

      withoutTransitions(() => {
        document.documentElement.dataset.theme = next.name
        document.documentElement.classList.toggle("dark", isDark(next.mode))
      })
      try {
        localStorage.setItem(storageKey, next.name)
      } catch {
        // Without storage the choice lasts until the page closes.
      }
      notify()
    },
    [themes, storageKey]
  )

  const mode = themes.find((candidate) => candidate.name === theme)?.mode

  // A system theme tracks the OS appearance while it is open.
  React.useEffect(() => {
    if (mode !== "system") return
    const query = systemDark()
    const follow = () => {
      document.documentElement.classList.toggle("dark", query.matches)
      notify()
    }
    query.addEventListener("change", follow)
    return () => query.removeEventListener("change", follow)
  }, [mode])

  // Browser chrome (the mobile address bar) should match the page canvas of the active theme.
  React.useEffect(() => {
    const canvas = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
    if (canvas) document.querySelector('meta[name="theme-color"]')?.setAttribute("content", canvas)
  }, [theme, resolvedMode])

  const value = React.useMemo(
    () => ({ theme, resolvedMode, themes, setTheme }),
    [theme, resolvedMode, themes, setTheme]
  )

  return (
    <ThemeContext value={value}>
      {children}
    </ThemeContext>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>")
  return context
}

/** Whether a keystroke belongs to what the visitor is typing in, so single-key shortcuts leave it alone. */
function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    // An open theme picker is a listbox or a dialog; keys there are its own, not shortcuts.
    target.closest('[role="listbox"], [role="combobox"], [role="dialog"]') !== null
  )
}

export { ThemeProvider, useTheme, isInteractiveTarget }
