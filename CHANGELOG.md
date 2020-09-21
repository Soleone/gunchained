# Changelog

## 0.1.0

Initial launch version

### User facing

- My challenge
- List challenges
- Toggle availableSince
- Domain www.gunchained.app
- Set up apex domain gunchained.app
- Sort challenges by most recent availableSince
- Bugfix: Changing availability wipes state or something and requires reload
- Bugfix: NaN years when setting to available
- Challenge code validation (3-40)
- Set favicon
- Add Save button to profile
- Add Google sign in
- Add Twitter sign in
- Add Github sign in
- Add anonymous sign in
- Put version in footer

### Implemention details

- Deploy script
- Pull status bar into App layout
- Ensure changing challenge or player doesn't bump availableSince accidentally
- Reload button (implemented, but removed again because not needed)
- Bugfix: redirect issue history mode
- Bugfix: null player bug after initial signup.
