# Roadmap

This document is a constant work in progress and can drastically change at any time.
It's more a collection of thoughts on where to take the project in which order.
Each of these would optimally be linked to an actual Github issue.
None of this is guaranteed to be worked on by anyone.

## Milestones

### 0.1.3

- Bugfix: Re-enabled and fix form code validation
- See number of online users (recently logged in)
- Allow status message to be displayed (e.g. bugs)
- Notifications when challenges are made available
  - Browser notification API?
  - [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

### 0.1.4

- Automatically expire availableSince after 12h
  - [github example code](https://github.com/firebase/functions-samples/blob/master/delete-unused-accounts-cron/functions/index.js)

### 0.1.5

- Add Welcome page

### 0.2.0

- Public profile view (linked in published challenge)

### 0.3.0

- Detailed descriptions for Challenges and Player profiles
  - Markdown
    - Bold
    - Italic
    - Links
    - Image links
    - Lists?

### 0.4.0

- Set timezone and general availability

## Bugfixes

### High priority

### Low priority

- Fix login screen showing as empty card (polish)
- Bugfix: 404 hack causes browser warning and wayback machine link (polish)

## Ideas

- Users can send comments to available challenges' players to ask for status updates
  - Requires inbox for players to receive these comments
- Player profile fields:
  - Discord name (could be used to communicate about challenge status and general availability)
  - Email
- Changing code should bump availableSince
- Challenge details
  - God playing
  - Deck name playing
  - Matchup wanted (God, deck type)
  - Decklist
- Announcement post? Voice?
- Mark challenge as connected to help other players to try to queue with you anymore
- Quick copy button
