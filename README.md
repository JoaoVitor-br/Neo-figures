# NeoFigures - Local env setup

This project uses Expo. Environment variables for Firebase are stored in `.env` and injected into the app via `app.config.js`.

Setup

1. Copy the example and fill your keys:

```powershell
Copy-Item .env.example .env
# then edit .env with your values
```

2. Install `dotenv` if not present:

```powershell
npm install dotenv --save-dev
```

3. Start Expo (clear cache recommended):

```powershell
npx expo start -c
```

Notes

- `.env` is ignored by git. Do NOT commit your secrets.
- The runtime code reads variables from `Constants.expoConfig.extra` or `process.env` as a fallback. See `config/firebaseConfig.js`.
