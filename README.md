An experiment at making a free-to-play quiz game.
![Cahoots Screenshot](cahoots_screenshot.png?raw=true "Cahoots Screenshot")

# How to Play
- Go to https://wasabigeek.github.io/cahoots/
- Signup for an account and create a Game
- Start the game, and share the join URL with friends

# Developing
- setup a firebase project:
  - firestore
  - authentication (email / password)
- copy `.env.example` and add your firebase project config
- `npm start`

# Deploying
- deploy the firestore rules `firebase deploy --only firestore:rules --project <PROJECT ID>`
- `npm run deploy`
