# Roadmap

This document is a constant work in progress and can drastically change at any time.
It's more a collection of thoughts on where to take the project in which order.
Each of these would optimally be linked to an actual Github issue.
None of this is guaranteed to be worked on by anyone.

## Milestones

## Bugfixes

### High priority

### Low priority

## Ideas

### User facing

#### High Priority

- Changing code should bump availableSince
- Automatically expire availableSince after 12h
  - [github example code](https://github.com/firebase/functions-samples/blob/master/delete-unused-accounts-cron/functions/index.js)

#### Normal Priority

- Video counter for each category
- Public profile view (linked in published challenge)
- Detailed descriptions for Challenges and Player profiles
  - Markdown
    - Bold
    - Italic
    - Links
    - Image links
    - Lists?
- Notifications when challenges are made available
  - Browser notification API?
  - User profile switch to receive notifications or not
  - [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- Set timezone and general availability
- Users can send comments to available challenges' players to ask for status updates
  - Requires inbox for players to receive these comments
- Player profile fields:
  - Discord name (could be used to communicate about challenge status and general availability)
  - Email
- Challenge details
  - God playing
  - Deck name playing
  - Matchup wanted (God, deck type)
  - Decklist
- Announcement post? Voice?
- Mark challenge as connected to help other players to try to queue with you anymore
- Quick copy button

### Implementation details

- Add test suite
