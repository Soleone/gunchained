import {
  STRATEGY,
  DECKS,
  CARDS,
  TRADING,
  PATCH_NOTES,
  FUNDAMENTALS,
  FUN,
  OTHER
 } from '@/constants/constants.js'

const CATEGORY_LABELS = {
  [STRATEGY]: 'Strategy',
  [DECKS]: 'Decks',
  [CARDS]: 'Cards',
  [TRADING]: 'Trading',
  [PATCH_NOTES]: 'Patch Notes',
  [FUNDAMENTALS]: 'Fundamentals',
  [FUN]: 'Fun',
  [OTHER]: 'Other'
}

const COLORS = {
  [STRATEGY]: 'blue',
  [DECKS]: 'orange',
  [CARDS]: 'yellow',
  [TRADING]: 'lime',
  [PATCH_NOTES]: 'red',
  [FUNDAMENTALS]: 'teal',
  [FUN]: 'purple',
  [OTHER]: 'grey'
}

const DARK_COLORS = [
  'blue',
  'teal',
  'red',
  'purple',
  'grey'
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
