---
name: outlets
description: Use this skill when sprinkling new UI into an existing Spartacus page without replacing it (e.g. a trust badge under add-to-cart, a wishlist button next to product-tile actions, a banner above the product grid). Covers `provideOutlet`, `cxOutletRef`, finding outlet IDs, and when CMS mapping is the right tool instead.
---

<!-- spartacus-version: 221121.7.0 -->

# Outlets — Targeted UI Additions

## Rule

**Outlets** are for sprinkle-in additions to existing Spartacus pages:
- A shipping badge under add-to-cart
- A trust mark under the mini-cart
- A wishlist button next to product-tile actions
- A custom banner above the product grid

For **entire-component replacement** or page restructuring, use CMS mapping instead (see the `cms-component-wiring` skill). Outlet IDs are internal Spartacus names that occasionally change between major versions — keep the count low, and prefer CMS mapping for anything structural.

## `provideOutlet` for component-based outlets

```typescript
import { provideOutlet, OutletPosition } from '@spartacus/storefront';

@NgModule({
  providers: [
    provideOutlet({
      id: 'AddToCart',
      position: OutletPosition.AFTER,
      component: TrustBadgesComponent,
    }),
  ],
})
export class TrustBadgesModule {}
```

- `position: AFTER` (default) — append after the outlet's target. Use this for additions.
- `position: BEFORE` — prepend before.
- `position: REPLACE` — replace the target. Use sparingly and only when you mean it.

Omitting `position` defaults to `AFTER`, which is almost always what you want for additive UI.

## `cxOutletRef` in templates

For template-level additions inside your own component:

```html
<ng-template cxOutletRef="AddToCart" cxOutletPos="after">
  <app-trust-badges></app-trust-badges>
</ng-template>
```

## Finding outlet IDs

Outlet IDs are declared by Spartacus components in `<ng-container *cxOutlet="'Name'">`. Search `node_modules/@spartacus/` for `cxOutlet=` to discover them.

Common outlet IDs:
- `AddToCart`, `AddToCartActions`
- `MiniCart`
- `ProductTile`, `ProductSummary`, `ProductDetails`
- `Header`, `Footer`
- `SearchBox`, `SearchResults`

## When NOT to use outlets

- Replacing a whole CMS-backed component → CMS mapping (see the `cms-component-wiring` skill).
- Adding a page with your own layout → CMS page + slot config.
- Changing URL structure → `RoutingConfig` (see the `configurable-urls` skill).

## Codebase reference

- `OutletService`, `provideOutlet`, `OutletPosition`, `OutletDirective`, `OutletRefDirective` all from `@spartacus/storefront`.

📖 [Outlets](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/outlets-b98af37.md)
