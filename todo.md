## TODO: before merge

1. search for "// TODO:#checkout" (leftovers that can't be done until cart is merged)
2. Is the checkout properly using the new cart lib? (still waiting for cart-lib PR to be merged)
   1. order and repl order confirmation page context: https://github.com/SAP/spartacus/pull/14466/files (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638282843004200) - related to waiting for Wei and Patrick PR to be merged 
   - (related to above) sample data changes: https://github.tools.sap/cx-commerce/spartacussampledata/pull/211 (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638283007005900)
4. Check how do various checkouts work:
    1.  base only (without b2b and repl)
    2.  b2b (without repl)
5. When using b2b (organization), we should do the following ( feature-libs/checkout/b2b/occ/config/default-occ-checkout-b2b-config.ts ):
    - ```ts
      const defaultB2bUserAccountOccEndpoints: UserAccountOccEndpoints = {
        user: 'orgUsers/${userId}',
      };
      ```

    - ```ts
      const defaultB2bUserProfileOccEndpoints: UserProfileOccEndpoints = {
        userUpdateProfile: 'users/${userId}',
        userCloseAccount: 'users/${userId}',
      };
      ```

    - ```ts
      const defaultB2bCartOccEndpoints: CartOccEndpoints = {
        addEntries: 'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
      };
      ```

    - ```ts
      const defaultB2bOrderOccEndpoints: OrderOccEndpoints = {
        scheduleReplenishmentOrder:
          'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
        replenishmentOrderDetails:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderDetailsHistory:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}/orders',
        cancelReplenishmentOrder:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderHistory:
          'users/${userId}/replenishmentOrders?fields=FULL,replenishmentOrders(FULL, purchaseOrderNumber)',
      };
7. When we were renaming components / folders to have the checkout prefix, we intentionally left out the components' prefix untouched.
   4.  Rename the checkout components' selectors to have the checkout prefix? (revisit as I think it's fine)
8. converters and any - https://github.com/SAP/spartacus/pull/14165#discussion_r751912800
9. check changes to the old checkout (we might remove as mentioned before and Kris is for it too)
   1. revert the variable names from *facade to *service _in old checkout only_
10. remove old checkout
11. Remove `checkout-git-check.sh`
12. remove `todo.md` and 

## Second phase

1. Test the checkout with slow network. It could yield some racing condition issues (remember the spinner on the checkout payment type).
2. Schematics and deprecations
   1. Write migration schematics
   2. Deprecate the current classes / APIs / functions
   3. Check and add js doc comments
   4. Write installation schematics
3. Migration schematics
   1. Facades / services - import paths; some classes have been renamed
   2. adapters / connectors - import paths; some classes have been renamed
   3. components - import paths; some classes have been renamed
   4. modules? import paths; some classes have been renamed
4. Installation schematics
   1. Update the current installation schematics for the new lib
   2. create a prompt for each of the checkout entry points? (base, b2b, repl)
   3. If we decide to have dependency on the cart _in the feature module_, then reflect this in the schematics as well.
5. move everything from `docs/migration/5_0-checkout.md` to the main 5_0.md
6. maybe it's worth having all checkout rename migrations in `projects/schematics/src/migrations/5_0/rename-symbol/checkout-rename-symbol.ts` ?
7. Docs
   1. go by example -> create the docs for one of the steps; maybe choose the mostly customized one - payment step?
   2. reference the docs for LL, where it is explained how to create a custom feature module, and LL custom code.
   3. Mention how to properly use the queries - check if it's loading, or if there's an error. E.g.:
      ```ts
         service.getDataState().pipe(
            filter(state => !state.loading && !state.error),
            map(state => state.data),
            ...
         )
      ```
   4. cover the case when customers were using an old facade -> show how to switch to the new facade. This doesn't have to be a big section, as we'll have some migrations that'll handle this case.
   5. If customized an effect -> please remove ngrx, and extend our facade service where you can add your custom logic by extending a method, or by adding new ones
   6.  if using old components:
      1. you can consider using our new components. 
      2. If you don't want to, you can just import our new facade in your existing components, and keep using them and potentially slightly modifying them.
   7.  go through triggers - mention how to do a single step checkout and what to keep an eye for. i.e. remove redundant events, in order to not trigger the query too many times.
   8.  Mention the available events - e.g. CheckoutReloadDeliveryModesEvent and ReloadCheckoutQueryEvent
8. check LL:
   1. check the chunks: base, b2b, replenishment
   2. check if and when those are loaded
   3. check the deps, e.g. land on a b2b step, and check if the checkout chunk is loaded before the b2b one.
   4. Check the transitive LL after we create a dependency on the cart:
      1. the _base_ checkout depends on _cart_
      2. the _b2b_ / _repl_ depend on _base_
      3. when landing on a _b2b_ step, will the order of chunks being loaded be the following: _cart_ first, then _base_, and lastly the _b2b_ chunk?
9. check the bundle size of checkout (maybe using webpack analyzer)
10. query debounce - `feature/query-debounce`

### Future

1. coordinate with UX and A11Y teams about the new checkout and announce a work on the components:
   1. UX dev - should create a draft wireframes
   2. dev(s) - Brian and Nik at least, and Kris would be good to review the design
   3. Bill
   4. Miguel for a11y
2. search for `TODO:#deprecation-checkout`
