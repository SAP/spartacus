## TODO:

1. search for "// TODO:#checkout" (leftovers that can't be done until cart is merged)
2. catch refresh bug on b2b (account type on refresh displays the payment method step when it's not supposed to)
3. make a dependency on the cart lib (whenever cart is merged)
   1. should we do it in the feature-libs/checkout/base/root/checkout-root.module.ts _or_ in the projects/storefrontapp/src/app/spartacus/features/checkout-feature.module.ts?
   2. the latter will require schematics to be updated
4. BUG - There's a TS error on the last checkout step (review order) when running b2b. Seems related to import-export. 
   ```ts
      ERROR TypeError: can't access property "__source", token is undefined
      Angular 2
      get routing-context.service.ts:57
      RxJS 50
      Angular 4
      ExportOrderEntriesComponent_Template export-order-entries.component.html:2
   ```
5. BUG - When doing b2b checkout:
   1. select the credit card payment method
   2. go all the way to the last step (review order)
   3. notice the delivery method is there
   4. go back to the previous step (payment), and refresh browser
   5. go to the last step - the delivery mode is not there.
6. BUG - the payment method infinite spinner:
   1. repeat the steps above
   2. go to the first step (payment method)
   3. notice the infinite spinner
7. In b2b, add a spinner to the 1st checkout step (payment method). The reason is the bug:
   1. Have the account type selected
   2. Switch to credit card
   3. if we're quick enough, and click "continue" button before the two API calls are resolved, we'll see _4_ steps instead of _5_.
9. Is the checkout properly using the new cart lib?
   1. `CartSharedModule` - Ask Wei and Patrick to confirm the import of this module. They mentioned this is being used with outlets? https://sap-cx.slack.com/archives/C02L8BUATM5/p1637252372013100
   2. order and repl order confirmation page context: https://github.com/SAP/spartacus/pull/14466/files (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638282843004200)
   3. sample data changes: https://github.tools.sap/cx-commerce/spartacussampledata/pull/211 (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638283007005900)
10.  check the event listeners for the following scenario:
    1.  a user started the checkout, entered their delivery address, and set the delivery mode, and the data is sent on the back-end for the active cart
    2.  the user changes their mind, and navigates away from the checkout page to homepage, and refreshes the browser.
    3.  after it, they decide to change their address in the profile menu. 
    4.  if they now start the checkout (and LL the feature), the current back-end data is _not_ valid for the active cart - we must reset the set delivery mode, and load the supported delivery modes again for the new address.
    5.  if the listener was in the root module, it can listen to the userupdateaddress event, ll the checkout, and issue a reset query event
11. Check how do various checkouts work:
    1.  base only (without b2b and repl)
    2.  b2b (without repl)
12. Check other features which are using the old checkout:
   4. Digital Payments
   5. CDS
   6. Anything else? Some internal features?
13. remove orderType$ from feature-libs/checkout/scheduled-replenishment/root/facade/checkout-scheduled-replenishment.facade.ts - re-watch ep17, from ~30:00 - ~45:00
14. When using b2b (organization), we should do the following ( feature-libs/checkout/b2b/occ/config/default-occ-checkout-b2b-config.ts ):
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
15. align the event names - prefix them with Checkout?
16. Rename b2b and repl endpoint config keys - https://github.com/SAP/spartacus/pull/14495/files#r760445274
17. When we were renaming components / folders to have the checkout prefix, we intentionally left out the components' prefix untouched.
   7.  Rename the checkout components' selectors to have the checkout prefix?
18. query debounce - `feature/query-debounce`
19. converters and any - https://github.com/SAP/spartacus/pull/14165#discussion_r751912800
20. Look into `TODO(#8880):`


## Near the end

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
8. check LL:
   1. check the chunks: base, b2b, replenishment
   2. check if and when those are loaded
   3. check the deps, e.g. land on a b2b step, and check if the checkout chunk is loaded before the b2b one.
   4. Check the transitive LL after we create a dependency on the cart:
      1. the _base_ checkout depends on _cart_
      2. the _b2b_ / _repl_ depend on _base_
      3. when landing on a _b2b_ step, will the order of chunks being loaded be the following: _cart_ first, then _base_, and lastly the _b2b_ chunk?
9. Remove `checkout-git-check.sh`

### Future

1. coordinate with UX and A11Y teams about the new checkout and announce a work on the components
2. search for `TODO:#deprecation-checkout`
