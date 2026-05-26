---
name: normalizers
description: Use this skill when surfacing extra OCC backend fields in the Spartacus UI model (e.g. a custom `loyaltyPoints` field on Product). Covers declaration merging, the `Converter<OccModel, UiModel>` interface, and registering with `multi: true` against the right `*_NORMALIZER` injection token.
---

<!-- spartacus-version: 221121.7.0 -->

# Normalizers — Adding Custom Backend Fields

## Rule

When the OCC API returns extra attributes (e.g. a custom `loyaltyPoints` field on products, a `warrantyMonths` field on orders), add them to the UI model via a **normalizer registered as `multi: true`**. NEVER omit `multi: true` and NEVER replace the default normalizer.

Omitting `multi: true` replaces the entire converter chain — including Spartacus's built-in name, image, price, and URL normalizers — so you silently lose image URLs, formatted prices, and slugs.

## Full recipe (product example)

### 1. Augment the model via declaration merging

```typescript
// src/app/model/product.model.ts
import '@spartacus/core';

declare module '@spartacus/core' {
  interface Product {
    loyaltyPoints?: number;
  }
}
```

This extends the existing `Product` interface everywhere — no need to duplicate the type or cast.

### 2. Write the normalizer

```typescript
import { Converter, Occ, Product } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class LoyaltyPointsNormalizer implements Converter<Occ.Product, Product> {
  convert(source: Occ.Product, target: Product = {}): Product {
    target.loyaltyPoints = (source as any).loyaltyPoints;
    return target;
  }
}
```

Mutate and return `target` — don't overwrite it. The chain passes the same `target` through each normalizer.

### 3. Register with `multi: true` on the correct token

```typescript
import { PRODUCT_NORMALIZER } from '@spartacus/core';

providers: [
  {
    provide: PRODUCT_NORMALIZER,
    useExisting: LoyaltyPointsNormalizer,
    multi: true,
  },
]
```

`useExisting` (not `useClass`) — so the same singleton instance is used if the normalizer is injected elsewhere.

## Common normalizer tokens

- `PRODUCT_NORMALIZER` — product list + detail
- `PRODUCT_SEARCH_PAGE_NORMALIZER` — search/category results
- `ORDER_NORMALIZER` — order history and detail
- `CART_NORMALIZER` — cart entries
- `USER_NORMALIZER` — user account data
- `ADDRESS_NORMALIZER` — addresses in checkout/account

Serializers (UI → backend) work the same way; look for `*_SERIALIZER` tokens.

## Codebase reference

- `Converter`, `ConverterService`, `PRODUCT_NORMALIZER` from `@spartacus/core`.
- Default product normalizers ship inside `@spartacus/core` (`occ` adapters).
- Injector correctness: see the `correct-injector` skill — register normalizers in the feature wrapper module for lazy features, or in the root injector for eager ones.

📖 [Connecting to Other Systems](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/connecting-to-other-systems-5a1394b.md)
