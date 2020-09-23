# Changelog

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
