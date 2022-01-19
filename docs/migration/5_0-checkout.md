## Checkout

Checkout refactoring + code splitting was done as part of the initiative of removing ngrx dependencies from Spartacus by replacing it with [commands and queries](https://sap.github.io/spartacus-docs/commands-and-queries/#page-title).

As we want to reduce the bundle size in Spartacus, the checkout refactoring also consisted of decoupling the checkout logic into three different entry points: 

- `@spartacus/checkout/base` - offers a basic checkout functionality, such as b2c.
- `@spartacus/checkout/b2b` - offers a b2b checkout flow.
- `@spartacus/checkout/scheduled-replenishment` - offers a scheduled replenishment checkout flow.

Note: Although the checkout libraries might still have some reference to some ngrx actions within the library, it is not possible to fully separate ngrx from checkout until the other libraries from Spartacus get refactored, such as Cart or User libraries.

Benefits of converting to `command and queries`:
  - as all functionality is in classes, it is easier to extend, as opposed to ngrx where you can not really extend a reducer or an effect (without dismantling Spartacus' ngrx modules)
  - commands are built in a more reactive way, and return the execution result as part of the same method call.
  - similarly to the commands, listening to loading, error, and data state changes are as simple as calling one method and getting all the results in one call.

For more about commands and queries, please see [this](https://sap.github.io/spartacus-docs/commands-and-queries/#page-title)

### General changes

- Majority of old checkout imports (`@spartacus/checkout`) are now spread across the new entry points, and its secondary entry points.
- `normalizeHttpError()` is moved from the effects to the adapter layer

### Setup library

We are moving away from our initial idea of having recipes contained in the setup library. For this reason we've move our existing configurations to either library's root, or to the app itself.

- `defaultB2bCheckoutConfig` - moved to `@spartacus/checkout/b2b/root`.
- `defaultB2bOccConfig` - moved to `@spartacus/checkout/b2b/root`.

### New functionality

- `backOff` pattern is now added to the OCC adapters, and configured to retry on OCC-specific JALO errors. 
- validation and error handling - the commands now perform various precondition checks. At the same time, commands will throw errors if the execution fails. Previously, effects were dispatching Fail actions, which usually were't handled.