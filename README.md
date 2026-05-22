# JSX Viewer — IMAK2004

A small Vite + React app that auto-discovers every `.jsx` file in `src/` and serves them as standalone, navigable pages. Built to browse the IMAK2004 (analytical chemistry) topic overviews:

1. Statistikk og feil
2. Kromatografi
3. Syre/base og pH
4. Gravimetri
5. Elektrokjemi
6. Spektroskopiske metoder

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
