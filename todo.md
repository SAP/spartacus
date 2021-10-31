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
7. align the event names - start with Checkout?
8. augment checkoutsteptype enum in b2b - feature-libs/checkout/b2b/root/augmented-models/augmented-types.ts and feature-libs/checkout/b2b/root/augmented-models/index.ts
9. register b2b defaultB2bCheckoutConfig somewhere within the b2b entrypoint?