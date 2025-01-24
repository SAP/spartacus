# Spartacus migration - Bootstrap

1. Uninstall Bootstrap
   If the bootstrap package is still installed in your project, uninstall it to avoid conflicts. Use
   the following command:
   ```npm uninstall bootstrap```
2. Update `styles.scss`
   Modify the `styles.scss` file to integrate Spartacus styles along with Bootstrap. Proper import order is critical for
   styles to be applied correctly.
### Steps to Update:
1. Place the following import for styles-config at the top of the file:
       ```@import 'styles-config';```
2. Add Spartacus core styles first. Importing Spartacus styles before Bootstrap ensures core styles load as a
   priority.
3. Follow this by importing Bootstrap styles using the Bootstrap copy provided by Spartacus. Ensure the order of
   Bootstrap imports matches the sequence below for consistency.
4. Conclude with the Spartacus index styles.


   Final file structure should look like this:

```styles.scss
// ORDER IMPORTANT: Spartacus core first
@import '@spartacus/styles/scss/core';

// ORDER IMPORTANT: Bootstrap next
@import '@spartacus/styles/vendor/bootstrap/scss/reboot';
@import '@spartacus/styles/vendor/bootstrap/scss/type';
@import '@spartacus/styles/vendor/bootstrap/scss/grid';
@import '@spartacus/styles/vendor/bootstrap/scss/utilities';
@import '@spartacus/styles/vendor/bootstrap/scss/transitions';
@import '@spartacus/styles/vendor/bootstrap/scss/dropdown';
@import '@spartacus/styles/vendor/bootstrap/scss/card';
@import '@spartacus/styles/vendor/bootstrap/scss/nav';
@import '@spartacus/styles/vendor/bootstrap/scss/buttons';
@import '@spartacus/styles/vendor/bootstrap/scss/forms';
@import '@spartacus/styles/vendor/bootstrap/scss/custom-forms';
@import '@spartacus/styles/vendor/bootstrap/scss/modal';
@import '@spartacus/styles/vendor/bootstrap/scss/close';
@import '@spartacus/styles/vendor/bootstrap/scss/alert';
@import '@spartacus/styles/vendor/bootstrap/scss/tooltip';

@import '@spartacus/styles/index';
```
3. Individual imports.
   If your application directly imports specific Bootstrap classes in any of your stylesheets, replace those imports with the corresponding Spartacus imports. For example:
```
// Original import
@import '~bootstrap/scss/reboot';

// Replace with
@import '@spartacus/styles/vendor/bootstrap/scss/reboot';
```

4. Some libraries have stopped importing Bootstrap-related styles. Instead, these styles should now be imported directly within the application. For example, the lib-cart.scss file should include the following imports:
```scss
// original imports
@import '../styles-config';
@import '@spartacus/cart';
// new imports
@import '@spartacus/styles/vendor/bootstrap/scss/functions';
@import '@spartacus/styles/vendor/bootstrap/scss/variables';
@import '@spartacus/styles/vendor/bootstrap/scss/_mixins';
```
Affected libraries:
- cart
- checkout
- organization
- pick-up-in-store
- product
- product-multi-dimensional
- qualtrics
- quote
- storefinder
- epd-visualization
- opf
