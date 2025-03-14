All customizations of the `test-app` should be kept in the folder `src/app/custom`, to distinguish them from the fresh app code.

Any exceptional customizations made outside of the folder `src/app/custom` should be documented in this file:

- `src/app/app.module.ts`: include all our `customProviders` from this folder `src/app/custom`
- `src/styles.scss`: include all our custom styles from this folder `src/app/custom`
