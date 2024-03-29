# Changelog

### 0.2.13

- Change homepage to Videos and move old home to About

### 0.2.12

- Add Esports and Interview categories

### 0.2.11

- Add RSS feed link for video subscriptions

### 0.2.10

- Fetch published date from Youtube API and use it to sort video list by

### 0.2.9

- Add tracking to Home screen and slight redesign using buttons for primary navigation

### 0.2.8

- Add more anonymous Google Analytics metrics to track which features of the site are being used

### 0.2.7

- Add subscribe button to video show page

### 0.2.6

- Submit Feedback function
- Update welcome screen copy
- Enlarge video on show page

### 0.2.5

- Video show page with linkable url
- Video editing for admin role
- Load optimizations by only loading Youtube embed iframe when on show page, and in list view only display thumbnail image

### 0.2.4

- Add Welcome page

### 0.2.3

- Filter by author
- Display added timestamp
- Bugfix: Fix embed video size to ensure full screen button is shown

### 0.2.2

- Improved video navigation

### 0.2.1

- Category colors and labels

### 0.2

- Category filtering
  - Main menu categories list
  - Breadcrumbs shows current category
  - Clicking a video's category pill filters by that category
- Bugfix: 404 hack causes browser warning and wayback machine link (polish)

### 0.1.5

- Introduce new Videos section
- Add dedication navigation drawer
- Move login/logout from unlabelled buttons to navigation

### 0.1.4

- Remove guest login because it causes too many accounts to be created

### 0.1.3

- See number of currently online users in app bar
  - Counts all users witha activity in the last 5 minutes
  - Updates badge every minute
- Allow status message to be displayed via system messages (e.g. known issues)
- Bugfix: Re-enabled and fix form code validation

### 0.1.2

- Fix login bug
- Fix available button disabled state
- Temporarily disable code form validation
- Redirect to player profile right away after succesful sign up

## 0.1.1

- Prevent setting to available when challenge code is empty
- Display info alert in profile when code is still empty

## 0.1.0

Initial launch version

### User facing

- My challenge
- List challenges
- Toggle availableSince
- Domain www.gunchained.app
- Set up apex domain gunchained.app
- Sort challenges by most recent availableSince
- Challenge code validation (3-40)
- Set favicon
- Add Save button to profile
- Add Google sign in
- Add Twitter sign in
- Add Github sign in
- Add anonymous sign in
- Put version in footer
- Open source links in footer
- Responsive design for Mobile
- Bugfix: Changing availability wipes state or something and requires reload
- Bugfix: NaN years when setting to available

### Implemention details

- Deploy script
- Pull status bar into App layout
- Ensure changing challenge or player doesn't bump availableSince accidentally
- Reload button (implemented, but removed again because not needed)
- Bugfix: redirect issue history mode
- Bugfix: null player bug after initial signup.
- Google Analytics anonymous usage tracking
