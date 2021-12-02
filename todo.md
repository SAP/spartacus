## TODO:

1. search for "// TODO:#checkout" (leftovers that can't be done until cart is merged)
2. catch refresh bug on b2b (account type on refresh displays the payment method step when it's not supposed to)
3. make a dependency on the cart lib (whenever cart is merged)
   1. should we do it in the feature-libs/checkout/base/root/checkout-root.module.ts _or_ in the projects/storefrontapp/src/app/spartacus/features/checkout-feature.module.ts?
   2. the latter will require schematics to be updated
4. Styles - create styles per entry point
5. Check if the new checkout is aligned with the current state of components / guards / services / features / etc. For example, check:
   1. Is the cart validation properly applied in the new checkout?
   2. https://github.com/SAP/spartacus/issues/14386
   3. Do we need to apply this express checkout fix to the base checkout? https://github.com/SAP/spartacus/pull/14418/files
   4. https://sap.service-now.com/now/workspace/agent/record/sn_customerservice_case/1117004f1bf7345c5b1fdcef9b4bcbb2
   5. https://github.com/SAP/spartacus/commit/b23c1ef0cd82e4f9787fe2278c694db2fb1160e7
   6. order and repl order confirmation page context: https://github.com/SAP/spartacus/pull/14466/files (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638282843004200)
   7. sample data changes: https://github.tools.sap/cx-commerce/spartacussampledata/pull/211 (source: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638283007005900)
   8. Benjamin's global messages: https://github.com/SAP/spartacus/pull/14060
   9. Jerry's https://github.com/SAP/spartacus/pull/14401/files
   10. Monitor develop using Patrick's script: https://sap-cx.slack.com/archives/C02L8BUATM5/p1638291772009300. 
   11. ...
6. Is the checkout properly using the new cart lib?
   1. CORE
      - ActiveCartService - we added a method. Move it to the cart lib.
      - Cart - just a model, not important.
      - StateWithMultiCart - not important, used just for the Store's type safety. We can use anything here really. 
      - CartActions - we can use a facades method for one case. For other case create a method.
      - MergeCartSuccessEvent - I created it. Move it to the cart lib.
      - CART_NORMALIZER - how to import without breaking LL?
   2. Storefrontlib
      - CartSharedModule - seems important how to import it without breaking LL?
      - CartValidationGuard - seems important. How to import it without breaking LL?
7.  check the event listeners for the following scenario:
    1.  a user started the checkout, entered their delivery address, and set the delivery mode, and the data is sent on the back-end for the active cart
    2.  the user changes their mind, and navigates away from the checkout page to homepage, and refreshes the browser.
    3.  after it, they decide to change their address in the profile menu. 
    4.  if they now start the checkout (and LL the feature), the current back-end data is _not_ valid for the active cart - we must reset the set delivery mode, and load the supported delivery modes again for the new address.
    5.  if the listener was in the root module, it can listen to the userupdateaddress event, ll the checkout, and issue a reset query event
8. Check how do various checkouts work:
    1.  base only (without b2b and repl)
    2.  b2b (without repl)
9. Check other features which are using the old checkout:
   3. Digital Payments
   4. CDS
   5. Anything else? Some internal features?
10. remove orderType$ from feature-libs/checkout/scheduled-replenishment/root/facade/checkout-scheduled-replenishment.facade.ts - re-watch ep17, from ~30:00 - ~45:00
11. align the event names - prefix them with Checkout?
12. Rename b2b and repl endpoint config keys - https://github.com/SAP/spartacus/pull/14495/files#r760445274
13. When we were renaming components / folders to have the checkout prefix, we intentionally left out the components' prefix untouched.
   6. Rename the checkout components' selectors to have the checkout prefix?
14. query debounce - `feature/query-debounce`
15. converters and any - https://github.com/SAP/spartacus/pull/14165#discussion_r751912800


## Near the end

1. Schematics and deprecations
   1. Write migration schematics
   2. Deprecate the current classes / APIs / functions
   3. Check and add js doc comments
   4. Write installation schematics
2. Migration schematics
   1. Facades / services - import paths; some classes have been renamed
   2. adapters / connectors - import paths; some classes have been renamed
   3. components - import paths; some classes have been renamed
   4. modules? import paths; some classes have been renamed
3. Installation schematics
   1. Update the current installation schematics for the new lib
   2. create a prompt for each of the checkout entry points? (base, b2b, repl)
   3. If we decide to have dependency on the cart _in the feature module_, then reflect this in the schematics as well.
4. move everything from `docs/migration/5_0-checkout.md` to the main 5_0.md
5. maybe it's worth having all checkout rename migrations in `projects/schematics/src/migrations/5_0/rename-symbol/checkout-rename-symbol.ts` ?
6. Docs
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
7. check LL:
   1. check the chunks: base, b2b, replenishment
   2. check if and when those are loaded
   3. check the deps, e.g. land on a b2b step, and check if the checkout chunk is loaded before the b2b one.
   4. Check the transitive LL after we create a dependency on the cart:
      1. the _base_ checkout depends on _cart_
      2. the _b2b_ / _repl_ depend on _base_
      3. when landing on a _b2b_ step, will the order of chunks being loaded be the following: _cart_ first, then _base_, and lastly the _b2b_ chunk?
8. There's a TS error on the last checkout step (review order) when running b2b. Seems related to import-export. (fix existing issue from develop)
   ```ts
      ERROR TypeError: can't access property "__source", token is undefined
      Angular 2
      get routing-context.service.ts:57
      RxJS 50
      Angular 4
      ExportOrderEntriesComponent_Template export-order-entries.component.html:2
   ```

### Future

1. coordinate with UX and A11Y teams about the new checkout and announce a work on the components
2. search for `TODO:#deprecation-checkout`
