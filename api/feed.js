// The RSS feed of the 50 newest videos, served at /feed.xml (see vercel.json). Videos are publicly
// readable, so this reads them through Firestore's REST API with the app's public web key.
const RSS = require('rss')

const SITE = 'https://gunchained.soleone.xyz'
// The same public values as firebase.config.js, which is an ES module the app's bundler reads.
const PROJECT_ID = 'gunchained-f3adc'
const API_KEY = 'AIzaSyAZ-rxpG14BEKA4X28s1wsZnoiI8UyI43k'
const QUERY_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`

async function newestVideos(limit) {
  const response = await fetch(QUERY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'videos' }],
        orderBy: [{ field: { fieldPath: 'publishedAt' }, direction: 'DESCENDING' }],
        limit
      }
    })
  })
  if (!response.ok) throw new Error(`Firestore answered ${response.status}`)
  const rows = await response.json()
  return rows
    .filter(row => row.document)
    .map(({ document: { name, fields } }) => ({
      id: name.split('/').pop(),
      title: fields.title?.stringValue ?? '',
      description: fields.description?.stringValue ?? '',
      author: fields.author?.stringValue ?? '',
      publishedAt: new Date(fields.publishedAt?.timestampValue)
    }))
}

module.exports = async (req, res) => {
  const feed = new RSS({
    title: 'Gunchained videos',
    description: 'Gods Unchained videos feed',
    feed_url: `${SITE}/feed.xml`,
    site_url: SITE,
    image_url: `${SITE}/logo-256.png`,
    language: 'en',
    ttl: '60'
  })

  try {
    for (const video of await newestVideos(50)) {
      feed.item({
        title: video.title,
        description: video.description.substring(0, 300) + '...',
        url: `${SITE}/videos/${video.id}`,
        author: video.author,
        date: video.publishedAt
      })
    }
  } catch (error) {
    console.error(error)
    res.status(502).send('The video library is unavailable right now.')
    return
  }

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.send(feed.xml())
}
