# Medbase Business — React + TypeScript

## Run locally

```powershell
npm install
npm run dev -- --host 127.0.0.1
```

Open the exact URL printed by Vite.

## Production build

```powershell
npm run build
npm run preview
```

## Routes

- `/` — Home
- `/about` — About
- `/contact` — Contact

The old `.html` URLs redirect to the clean routes on Vercel.

## Deploy to the existing Vercel project

```powershell
vercel link
vercel --prod
```

Vercel uses `vercel.json` to serve direct visits to `/about` and `/contact` correctly.
