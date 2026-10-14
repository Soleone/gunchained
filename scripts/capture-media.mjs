#!/usr/bin/env node
// Records the live site for the README and portfolios: a hero still of the video list and a loop that scrolls
// it, spins the theme picker from Gilt to Flexoki Light, filters to Decks, opens a video, goes back to the
// full list and switches back to Gilt.
// Usage: yarn media:capture [--url https://gunchained.soleone.xyz]
// Needs agent-browser (with its browser installed) and FFmpeg on the PATH. Recording and encoding come from showcase.
import { record } from '@soleone/showcase/capture'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ options: { url: { type: 'string', default: 'https://gunchained.soleone.xyz' } } })
const hero = path.resolve('docs/media/hero.png')
const out = 'docs/media/demo.webp'
await mkdir(path.dirname(hero), { recursive: true })

const smoothScroll = top => `(window.scrollTo({ top: ${top}, behavior: 'smooth' }), true)`
// The list is loaded and its thumbnails have painted.
const listReady = `document.querySelectorAll('.v-card .v-image__image--cover').length >= 4`
const atAll = `location.pathname === '/' && ${listReady}`

const { durationMs, grid } = await record({
  url: values.url,
  out,
  viewport: { width: 1280, height: 800 },
  width: 960,
  attempts: 3,
  start: async page => {
    await page.waitFor(atAll)
    await page.sleep(2500)
    await page.run('screenshot', hero)
  },
  async drive(page) {
    const pickTheme = async (key, steps) => {
      await page.run('click', 'button[aria-label="Choose a theme"]')
      await page.sleep(1200)
      for (let i = 0; i < steps; i++) {
        await page.run('press', key)
        await page.sleep(420)
      }
      await page.sleep(500)
      await page.run('press', 'Enter')
      await page.sleep(1800)
    }
    await page.sleep(1000)
    await page.eval(smoothScroll(900))
    await page.sleep(1800)
    await page.eval(smoothScroll(0))
    await page.sleep(1200)
    await pickTheme('ArrowRight', 5)
    await page.run('click', 'a.v-chip[href="/videos/categories/decks"]')
    await page.waitFor(`location.pathname.endsWith('/decks') && ${listReady}`)
    await page.sleep(2200)
    await page.run('click', 'a.v-card[href^="/videos/"]')
    await page.waitFor(`/^\\/videos\\/[^/]+$/.test(location.pathname) && !location.pathname.includes('categories') && !!document.querySelector('iframe')`)
    await page.sleep(3000)
    await page.run('click', 'a.v-btn[href="/"]')
    await page.waitFor(atAll)
    await page.sleep(1200)
    await pickTheme('ArrowLeft', 5)
    await page.sleep(600)
  },
  async verify(page) {
    if (!(await page.eval(`${atAll} && scrollY === 0 && document.documentElement.dataset.theme === 'gilt'`))) return 'did not end on the full video list in Gilt'
  }
})

console.log(`Wrote ${hero} and ${out} (${(durationMs / 1000).toFixed(1)} s). Frame sheet: ${grid}`)
