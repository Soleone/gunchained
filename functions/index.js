const RSS = require('rss');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.feed = functions.https.onRequest(async (req, res) => {
  const rssFeed = new RSS({
    title: 'Gunchained videos',
    description: 'Gods Unchained videos feed',
    feed_url: 'https://gunchained.app/feed.xml',
    site_url: 'https://gunchained.app',
    image_url: 'https://gunchained.app/img/gods-unchained-logo-256.f286f7ea.png',
    language: 'en',
    ttl: '60'
  });

  const querySnapshot = await admin.firestore().collection('videos').orderBy('publishedAt', 'desc').limit(50).get();
  querySnapshot.forEach(doc => {
    let id = doc.id;
    let video = doc.data();
    let url = `https://gunchained.app/videos/${id}`;

    let item = {
      title: video.title,
      description: video.description.substring(0, 300) + '...',
      url: url,
      author: video.author,
      date: video.publishedAt.toDate()
    }
    rssFeed.item(item);
  });

  res.type('application/xml');
  res.send(rssFeed.xml());
});