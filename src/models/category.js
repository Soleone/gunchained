import {
  STRATEGY,
  DECKS,
  CARDS,
  TRADING,
  PATCH_NOTES,
  FUNDAMENTALS,
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
  [GAMEPLAY]: 'Gameplay',
  [FUN]: 'Fun',
  [OTHER]: 'Other'
}

const COLORS = {
  [FUNDAMENTALS]: 'teal',
  [DECKS]: 'orange',
  [CARDS]: 'yellow',
  [STRATEGY]: 'blue',
  [TRADING]: 'lime',
  [PATCH_NOTES]: 'red',
  [GAMEPLAY]: 'brown lighten-2',
  [FUN]: 'purple',
  [OTHER]: 'grey'
}

const DARK_COLORS = [
  'blue',
  'teal',
  'red',
  'purple',
  'grey',
  'brown lighten-2'
]

export default class Category {
  constructor(category) {
    this.category = category
  }

  color() {
    return COLORS[this.category]
  }

  label() {
    return CATEGORY_LABELS[this.category]
  }

  isDarkColor() {
    return DARK_COLORS.includes(this.color())
  }
}
