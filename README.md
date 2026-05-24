# JSX Viewer — MATV1007

A small Vite + React app that auto-discovers every `.jsx` file in `src/` and serves them as standalone, navigable pages. Built to browse the MATV1007 (microbiology) topic overviews:

1. Introduksjon
2. Cellebiologi
3. Bakteriell Vekst
4. Virus
5. Taksonomi & Kretsløp
6. Bioteknologi
   1. Verktøy & teknikker
   2. Analyseteknikker
   3. Mutasjoner, genregulering & etikk

The index page lists every detected file; each topic loads lazily when you click it.

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (Vite 8 requirement)
- npm (ships with Node)

## Running it

```bash
# 1. install dependencies
npm install

# 2. start the dev server (HMR enabled)
npm run dev
```

The dev server prints a local URL (usually <http://localhost:5173>). Open it in a browser.

### Other scripts

```bash
npm run build     # production build → dist/
npm run preview   # serve the built bundle locally
npm run lint      # run ESLint
```

## Adding a new topic

Drop any `.jsx` file with a `default` export into `src/`. It will show up on the index automatically on the next reload — no routing config needed.
