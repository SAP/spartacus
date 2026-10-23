# CXSPA-2662 — Option D: Storefront-only composition

## Description

Keep `ConfigureProductComponent` in the product-configurator library unchanged.
In **storefrontapp**, register `ConfigureProductPdpQuantityBridgeComponent` as
the CMS mapping for `ConfigureProductComponent`. The bridge extends the library
component and copies `CartItemQuantityService` → `ConfiguratorQuantityService`
before calling `super.navigateToConfigurator()`.

Wiring lives in `ConfigureProductPdpQuantityBridgeModule`, imported from
`rulebased-configurator-wrapper.module.ts`.

## Pros

- No new coupling in publishable feature libraries until core team promotes it.
- Projects can adopt or drop the bridge independently.
- Same runtime behaviour as option A for rule-based configurators.

## Cons

- Not default Spartacus behaviour; every storefront must import the bridge module.
- Duplicate component selector (`cx-configure-product`) must stay aligned with upstream template.
- Textfield and other configurator types need separate storefront handling if required.
