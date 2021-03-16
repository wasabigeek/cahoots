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

# Dev Thoughts
There were a few things I was experimenting with:
- Firebase (also my first foray into a NoSQL database)
- Trying to follow Uncle Bob's Clean Architecture, with a "use cases" folder, and also attempting to hide the Firebase implementation behind an interface

I think the end result is still kinda messy, but it was interesting trying Clean Architecture out. I think use cases can fit pretty nicely with React's functional leanings, but it did feel like a lot of boilerplate.
 
I also tried to do an "entities" folder (might be using the wrong name for that) to represent the domain models more, but it seemed unnecessary given that everything's an object, and it didn't feel very React to store an OO instance (with methods) in state.
