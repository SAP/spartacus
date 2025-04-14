All customizations of the `test-app` should be kept in the folder `src/app/custom`, to distinguish them from the fresh app code.

Any exceptional customizations made outside of the folder `src/app/custom` should be documented in this file:

### `src/app/app.module.ts`
Provide all our `customProviders` from this folder `src/app/custom`

### `src/styles.scss`
Import all our custom styles from this folder `src/app/custom`

### `angular.json`
Generate source maps also for _vendor_ libs (in this case `@spartacus` libs are vendor coming from `test-app/node_modules`) - both in dev and prod mode build.
