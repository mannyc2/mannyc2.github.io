# mannyc2.github.io

Personal project homepage for [mannyc2.github.io](https://mannyc2.github.io/).

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

`npm test` type-checks and builds the static site, then verifies the generated
GitHub Pages artifact.

## Publishing

Pushes to `main` deploy through GitHub Actions. The generated site is entirely
static and is uploaded from `dist/`.
