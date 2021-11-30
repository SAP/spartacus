## TODO:

1. search for "// TODO:#checkout"
2. make a dependency on the cart lib
   1. should we do it in the feature-libs/checkout/base/root/checkout-root.module.ts _or_ in the projects/storefrontapp/src/app/spartacus/features/checkout-feature.module.ts?
   2. the latter will require schematics to be updated
3. Styles - create styles per entry point
4. Check if the new checkout is aligned with the current state of components / guards / services / features / etc. For example, check:
   1. Is the cart validation properly applied in the new checkout?
   2. Express checkout fix: https://github.com/SAP/spartacus/pull/14418/files
   3. 
5. Is the checkout properly using the new cart lib?
6. Check other features which are using the old checkout:
   1. Digital Payments
   2. CDS
   3. Anything else? Some internal features?

## Questions / investigation

1. do we have a b2b express checkout? I guess not.

## Schematics 

1. move everything from `docs/migration/5_0-checkout.md` to the main 5_0.md
2. maybe it's worth having all checkout rename migrations in `projects/schematics/src/migrations/5_0/rename-symbol/checkout-rename-symbol.ts` ?

### migrations

1. Facades / services - import paths; some classes have been renamed
2. adapters / connectors - import paths; some classes have been renamed
3. components - import paths; some classes have been renamed
4. modules? import paths; some classes have been renamed

### installation

1. Update the current installation schematics for the new lib
2. If we decide to have dependency on the cart _in the feature module_, then reflect this in the schematics as well.

## Docs

1. go by example -> create the docs for one of the steps; maybe choose the mostly customized one - payment step?
2. cover the case when customers were using an old facade -> show how to switch to the new facade. This doesn't have to be a big section, as we'll have some migrations that'll handle this case.
3. If customized an effect -> please remove ngrx, and extend our facade service where you can add your custom logic by extending a method, or by adding new ones
4. if using old components:
   1. you can consider using our new components. 
   2. If you don't want to, you can just import our new facade in your existing components, and keep using them and potentially slightly modifying them.
5. go through triggers - mention how to do a single step checkout and what to keep an eye for. i.e. remove redundant events, in order to not trigger the query too many times.

## other-to-merge-with-later

4.  check the cart validation feature - is it using something from the checkout?
    1.  maybe the checkout needs to switch to using it?
5.  query debounce?
6.  converters and any - https://github.com/SAP/spartacus/pull/14165#discussion_r751912800


Deprecation strategy:

1. Rename component to have a Checkout prefix in order to avoid name clashes
2. Prefix the components' selectors
3. coordinate with UX and A11Y teams about the new checkout and announce a work on the components
4. not expose components in the public API --> how to use them internally? in our app, between endpoints, etc.
5. rename endpoints to b2b_experimental and publish / expose everything. Be clear to customers that it's still in an experimental state. --> what to do about the deprecations of the current classes? Deprecate them? Wait until 5.1?



# Checkout TO DO list

- branches:
  - epic/checkout-refactor-c-and-q
  - feature/base-entry-point
  - feature/b2b-checkout-entry-point
  - feature/checkout-scheduled-replenishement-entry-point
  - feature/prefix-components

1. implement unit tests
   - b2b entry point
   - scheduled replenishment entry point
   - checkout base entry point
   - takeActiveCartId in `projects/core/src/cart/facade/active-cart.service.ts`
2. styles in the base checkout?
3. Deprecate the existing components
4. add js doc comments
5. Checkout base:
   1. feature-libs/checkout/base/public_api.ts - populate
   2. types in:
      1. feature-libs/checkout/base/core/connectors/delivery-modes/converters.ts
      2. feature-libs/checkout/base/core/connectors/payment/converters.ts
      3. create a converter for the delivery-address
6. feature-libs/checkout/base/core/facade/checkout-delivery-address.service.ts, feature-libs/checkout/base/core/facade/checkout-payment.service.ts and feature-libs/checkout/base/core/facade/checkout-delivery-modes.service.ts - check the usage of the store
7. align the event names - start with Checkout?
8. augment checkoutsteptype enum in b2b - feature-libs/checkout/b2b/root/augmented-models/augmented-types.ts and feature-libs/checkout/b2b/root/augmented-models/index.ts
9. register b2b defaultB2bCheckoutConfig somewhere within the b2b entrypoint?
10. check ll of: base checkout, b2b, replenishment
11. move event listeners to /root? this means the feature will be ll if an event occurs before it is actually loaded. and this is what we want actually. consider the following scenario:
    1.  a user started the checkout, entered their delivery address, and set the delivery mode. This is set on the back-end for the active cart.
    2.  the user changes their mind, and navigates away from the checkout page to homepage, and refresh the browser.
    3.  after it, they decide to change their address in the profile menu. 
    4.  if they now start the checkout (and LL the feature), the current back-end data is _not_ valid for the active cart - we must reset the set delivery mode, and load the supported delivery modes again for the new address.
    5.  if the lister was in the root module, it can listen to the userupdateaddress event, ll the checkout, and issue a reset query event
12. adjust b2b's file structure (components/components)   https://github.com/SAP/spartacus/pull/14174/#discussion_r752874030
13. update schematics
    1. install from the new entry-points
    2. offer options for b2b and repl checkouts?
14. feature-libs/checkout/b2b/root/config/default-b2b-occ-config.ts - move to feature module?
15. remove orderType$ from feature-libs/checkout/scheduled-replenishment/root/facade/checkout-scheduled-replenishment.facade.ts - re-watch ep17, from ~30:00 - ~45:00
12. order$ from checkoutService should stay and not todo from Marcin. Maybe you're mentioning about part 17 (38:00 - 44:00)
13. catch refresh bug on b2b (account type on refresh displays the payment method step when it's not supposed to)
14. fix b2b mechanism if not done already for importing config (old vs new) - done but double check 
15. update schematic test for @spartacus/checkout assertions https://app.travis-ci.com/github/SAP/spartacus/jobs/549205902
16. go over the components on epic and compare with develop. ex: https://github.com/SAP/spartacus/commit/b23c1ef0cd82e4f9787fe2278c694db2fb1160e7







16. option
  - 5.0 -> release with the old-ish components in the new checkout/base
  - 5.0 -> deprecate the whole current checkout
  - 6.0 -> remove the current (now old) checkout
  - 6.0+ -> refactor components, add a11y, talk to UX guys and change UX



Feature matrix
- version in which was introduced
- checkout - from 5.0 default in our shell app
- order lib
- etc.
- comment - how to enable the new or the old one
- add cart


Usages of CART:

## Core

- ActiveCartService - added a method
- Cart - just a model
- StateWithMultiCart - not important, used just for the Store's type safety. We can use anything here really. 
- CartActions - how to import without breaking LL?
- MergeCartSuccessEvent - I created it. Move it to cart lib
- CART_NORMALIZER - how to import without breaking LL?

## Storefrontlib

- CartSharedModule - seems important how to import it without breaking LL?
- CartValidationGuard - seems important. How to import it without breaking LL?

### Test

- https://sap.service-now.com/now/workspace/agent/record/sn_customerservice_case/1117004f1bf7345c5b1fdcef9b4bcbb2 and  https://github.com/SAP/spartacus/issues/14386

- express checkout update - might not need to update 'new' checkout - https://github.com/SAP/spartacus/pull/14418/files