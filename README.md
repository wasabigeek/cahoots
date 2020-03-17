An experiment at making a free-to-play quiz game.

This branch attempts to achieve this with:
- **Airtable as a database** - they have a free tier
- **No backend server** - a single-page React app which can be hosted for free thanks to GitHub pages

Tradeoffs Made:
- **NOT SECURE** - your API key and Base ID are used to generate a URL to share with players. Since there's no backend there is no private salt to encrypt the key :/ You can regenerate the API Key and delete the base afterward, or if really concerned, setup a separate Airtable account
- **NO PUSH** - Maybe the free tier of AWS might cover something here, but for now everything is client-initiated

To run
- Setup your Airtable (TODO: add link to sample base in Airtable Universe)
- use `npm start`
