# CXSPA-2662 — Option A: Bridge on Configure click

## Description

When the user clicks **Configure** on the PDP, read the quantity from
`CartItemQuantityService` (maintained by `cx-add-to-cart`) and copy it into
`ConfiguratorQuantityService` **before** navigating to the configuration page.
The rule-based configurator add-to-cart button already reads
`ConfiguratorQuantityService` on init.

`ConfiguratorQuantityService` lives in `@spartacus/product-configurator/common`
so the configure component does not depend on the rule-based entry point.

## Pros

- Small, focused change; matches Accelerator behaviour for rule-based configurators.
- Reuses existing config-page quantity counter and add-to-cart flow.
- Quantity must be set before navigation because add-to-cart uses `take(1)` on init.

## Cons

- Couples product-configurator **common** to `@spartacus/cart/base/root`.
- Does not fix textfield configurator (still uses hardcoded quantity `1`).
- Requires moving or sharing `ConfiguratorQuantityService` in **common** (layering).
