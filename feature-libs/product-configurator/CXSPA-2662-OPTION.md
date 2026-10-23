# CXSPA-2662 — Option E: Unified PDP quantity in core

## Description

Introduce `ProductDetailQuantityService` in `@spartacus/core` as the single
source of truth for quantity selected on the PDP. `CartItemQuantityService`
delegates to it (backward compatible for cart and OPF Quick Buy).

For product-bound rule-based configurations,
`ConfiguratorAddToCartButtonComponent` seeds its counter from
`ProductDetailQuantityService` on init.

## Pros

- Clean cross-feature API; configurator does not depend on `@spartacus/cart`.
- Aligns with the original “discuss with SPA core” direction for CXSPA-2662.
- Cart consumers keep using `CartItemQuantityService` without breaking changes.

## Cons

- Touches `core-libs` and `feature-libs/cart` (broader review surface).
- Textfield configurator still needs an explicit change to use the core service.
- Two quantity stores remain on the config page (`ProductDetailQuantityService`
  seed vs. `ConfiguratorQuantityService` while editing).
