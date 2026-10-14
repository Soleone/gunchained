import {
  STRATEGY,
  DECKS,
  CARDS,
  TRADING,
  PATCH_NOTES,
  INTERVIEW,
  FUNDAMENTALS,
  ESPORTS,
  GAMEPLAY,
  FUN,
  OTHER
 } from '@/constants/constants.js'

const CATEGORY_LABELS = {
  [FUNDAMENTALS]: 'Fundamentals',
  [DECKS]: 'Decks',
  [CARDS]: 'Cards',
  [STRATEGY]: 'Strategy',
  [TRADING]: 'Trading',
  [PATCH_NOTES]: 'Patch Notes',
  [INTERVIEW]: 'Interview',
  [ESPORTS]: 'Esports',
  [GAMEPLAY]: 'Gameplay',
  [FUN]: 'Fun',
  [OTHER]: 'Other'
}

// Each category takes a hue from the active theme's palette (src/styles/theme.css), so the chips
// change with the theme instead of clashing with it.
const TONES = {
  [FUNDAMENTALS]: 'cyan',
  [DECKS]: 'orange',
  [CARDS]: 'yellow',
  [STRATEGY]: 'blue',
  [TRADING]: 'green',
  [PATCH_NOTES]: 'red',
  [INTERVIEW]: 'slate',
  [ESPORTS]: 'brown',
  [GAMEPLAY]: 'sand',
  [FUN]: 'magenta',
  [OTHER]: 'grey'
}

export default class Category {
  constructor(category) {
    this.category = category
  }

  chipClass() {
    return `category-chip category-${TONES[this.category]}`
  }

  label() {
    return CATEGORY_LABELS[this.category]
  }
}
