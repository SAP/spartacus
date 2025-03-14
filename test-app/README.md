### Install dependencies

- enter the `test-app` folder, e.g. `cd test-app`
- run `npm install`

### Build and run SSR in dev mode (watch mode)

- run `npm run dev:ssr`
- open http://localhost:4000/

Note: Runs `npm run watch` and `npm run serve:ssr:watch` in parallel. After code changes, build progress appears first, then SSR server restarts with updated code.

### Dependencies

- `@spartacus` libs should be built locally from branch `epic/performance-improvements` of the main Spartacus repo and published to local verdaccio

### Customizations

The folder `src/app/custom` contains the customizations with performance improvements.