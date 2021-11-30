## Checkout

TODO:#checkout - write some introduction here, explaining the motive behind the refactor:
  - subscribe to command and get the result in the same method call, instead of using three actions in ngrx
  - the same is for the queries - subscribe to a query, and get the state feedback in the same call (loading, error or the data itself).
  - easier to extend - everything is in classes, and it's easy to extends / override a method, as opposed to ngrx, where you can't really extend a reducer or an effect

### Setup library

We are moving away from our initial idea of having recipes contained in the setup library. For this reason we've move our existing configurations to either library's root, or to the app itself.

- `defaultB2bCheckoutConfig` - moved to `@spartacus/checkout/b2b/root`.
- `defaultB2bOccConfig` - moved to `@spartacus/checkout/b2b/root`.
