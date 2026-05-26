---
name: extending-spartacus-classes
description: Use this skill when customizing a Spartacus component, service, or facade. Subclass and override the methods you need rather than copying source files into the customer app; covers extension, composition, and the rare case where copying is the only option.
---

<!-- spartacus-version: 221121.7.0 -->

# Extending Spartacus Classes

## Rule

When customizing a Spartacus component, service, or facade, **extend the original class** and override only the methods you need. AVOID copying a file out of `@spartacus/*` into your app and editing it — copy only when no public hook exists and composition is also impossible.

Copies freeze at the version you copy from. Next release ships a bug fix, a security patch, or a feature-toggle gate — your copy doesn't get any of it. Spartacus classes are designed to be extensible: properties and methods are `public` or `protected`, so subclasses can reach them.

## How to extend a component

```typescript
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';

@Component({
  selector: 'app-custom-add-to-cart',
  templateUrl: './custom-add-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAddToCartComponent extends AddToCartComponent {
  // Reuse all inherited state (product$, quantity, addToCart(), etc.)
  // Override only what you need, or add new behavior on top.
}
```

Wire the subclass via CMS mapping (see the `cms-component-wiring` skill):

```typescript
provideConfig({
  cmsComponents: {
    ProductAddToCartComponent: { component: CustomAddToCartComponent },
  },
})
```

## How to extend a service

```typescript
@Injectable()
export class CustomProductService extends ProductService {
  override get(productCode: string, scopes?: string[]) {
    return super.get(productCode, scopes).pipe(
      map((p) => ({ ...p, customField: this.enrich(p) }))
    );
  }
}

// Provide at the correct injector (see the correct-injector skill):
providers: [{ provide: ProductService, useClass: CustomProductService }]
```

## If you can't extend

If a member you need is truly `private` and there's no public hook, prefer **composition** (wrap the original service and delegate) over copying. Copying source code should be a last resort, only when no other option exists.

## Codebase reference

- `AddToCartComponent` from `@spartacus/cart/base/components/add-to-cart`
- `ProductService` from `@spartacus/core`
- `MiniCartComponent` from `@spartacus/storefront`

📖 [Updating Composable Storefront](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/updating/index.md)
