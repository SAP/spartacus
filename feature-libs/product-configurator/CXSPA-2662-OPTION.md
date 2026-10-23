# CXSPA-2662 — Option C: Quantity query parameter

## Description

Pass PDP quantity as a `quantity` query parameter when navigating from
`ConfigureProductComponent`. On configurator routes,
`ConfiguratorRouterListener` reads that parameter and updates
`ConfiguratorQuantityService` before the add-to-cart button initializes.

Configure navigation does not call `ConfiguratorQuantityService` directly.

## Pros

- Explicit contract in the URL; easy to trace and test.
- Configure component only needs cart (for reading PDP qty), not rule-based APIs.
- Listener centralizes applying query params on configurator entry.

## Cons

- Quantity visible in the URL; bookmark/back behaviour must be considered.
- In-config navigation without `quantity` leaves prior service state unchanged.
- Does not fix textfield configurator without additional query-param handling.
