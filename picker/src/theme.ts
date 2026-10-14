// The site's choices for the theme kit (components/soleone/theme, from the soleone registry).
import { createThemeHead } from "./components/soleone/theme/head"
import { BUILTIN_THEMES } from "./components/soleone/theme/palettes"

/** Where D lands on a side (dark or light) the visitor has not picked a theme on yet. */
export const HOTKEY_FALLBACKS = { dark: "gilt", light: "flexoki-light" }

/** Where the visitor's choice is remembered in localStorage. */
export const THEME_STORAGE_KEY = "gunchained.theme"

export const themeHead = createThemeHead({
  themes: BUILTIN_THEMES,
  defaultTheme: "gilt",
  storageKey: THEME_STORAGE_KEY,
})
