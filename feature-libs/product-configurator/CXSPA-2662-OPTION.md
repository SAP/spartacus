# CXSPA-2662 — Option B: Bridge in configurator add-to-cart init

## Description

For product-bound configurations (`ownerType === product`), seed the
configuration page quantity counter from `CartItemQuantityService` when
`ConfiguratorAddToCartButtonComponent` initializes. Cart-entry and other owners
keep using `ConfiguratorQuantityService` only.

The configure button and routing stay unchanged.

## Pros

- Configure component stays free of cart dependencies.
- Single place owns “PDP → config cart quantity” for rule-based configurators.
- Works as long as the user set quantity on the PDP before opening configure.

## Cons

- Couples rule-based product-configurator UI to `@spartacus/cart/base/root`.
- Depends on router data being available on first `extractRouterData()` emission.
- Does not fix textfield configurator add-to-cart (hardcoded quantity `1`).
