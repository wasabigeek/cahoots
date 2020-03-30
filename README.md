An experiment at making a free-to-play quiz game.

# How to Play
- Create an Airtable account (you could use an existing one, but note the security tradeoffs made below)
- Copy this [base](https://airtable.com/universe/expcIGII1WetR5TI1/cahoots) and modify the Questions
- Generate an [API Key](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-)
- View your Base's [API Documentation](https://airtable.com/api) to retrieve it's ID. It should look something like `appASDFAlDaS12KfZ`
- Go to https://wasabigeek.github.io/cahoots/ and enter your API Key and Base ID. Share the link with your players, click Host Game, then Start Game
- Have fun!

# Background
Free-to-play was achieved with:
- **Airtable as a database** - they have a free tier
- **No backend server** - a single-page React app which can be hosted for free thanks to GitHub pages

Tradeoffs Made:
- **NOT SECURE** - your API key and Base ID are used to generate a URL to share with players. Since there's no backend there is no private salt to encrypt the key :/ You can regenerate the API Key and delete the base afterward, or if really concerned, setup a separate Airtable account
- **NO PUSH** - Maybe the free tier of AWS might cover something here, but for now everything is client-initiated. There are some workarounds approximating time, so the countdowns aren't consistent

# Developing
- `npm start`
