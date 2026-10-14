// The theme picker as an island in the Vue app. The Vue app bar renders an empty slot and calls
// mount() on it; whichever of the two bundles loads first, the other one finds it.
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/soleone/theme"
import { ThemePicker } from "@/components/soleone/theme-picker"
import { HOTKEY_FALLBACKS, THEME_STORAGE_KEY, themeHead } from "./theme"
import "./picker.css"

declare global {
  interface Window {
    gunchainedThemePicker?: { mount: (element: HTMLElement) => () => void }
  }
}

function mount(element: HTMLElement) {
  const root = createRoot(element)
  root.render(
    <ThemeProvider themes={themeHead.themeOptions} storageKey={THEME_STORAGE_KEY} hotkeyFallbacks={HOTKEY_FALLBACKS}>
      <ThemePicker tagline={{ text: "Gods Unchained videos", highlight: "sorted by category" }} />
    </ThemeProvider>,
  )
  return () => root.unmount()
}

window.gunchainedThemePicker = { mount }
window.dispatchEvent(new Event("gunchained-theme-picker"))
