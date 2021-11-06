## b2b

- feature-libs/checkout/base/components/components/shipping-address/shipping-address.component.spec.ts contained some b2b-related tests
- feature-libs/checkout/base/components/components/review-submit/review-submit.component.spec.ts

## scheduled replenishment

- feature-libs/checkout/base/components/components/place-order/place-order.component.spec.ts

## other-to-merge-with-later

1. Handle Jalo error everywhere? When can it happen? Is there a doc for it?
2. go through all the queries, and add a back-off operator? we did this in the feature-libs/checkout/base/core/facade/checkout-delivery-modes.service.ts
3. append "state" to all facade methods that do return the state
4. fix xit in projects/core/src/util/command-query/query.service.spec.ts and feature-libs/checkout/base/core/facade/checkout-payment.service.spec.ts
5. search for "// TODO:#checkout"
6. some b2b-related tests were removed from b2c components / classes. Re-add them in /b2b entry point.
   1. feature-libs/checkout/base/components/guards/checkout-auth.guard.spec.ts - should return to /home when user roles does not have b2bcustomergroup


# Checkout TO DO list

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

