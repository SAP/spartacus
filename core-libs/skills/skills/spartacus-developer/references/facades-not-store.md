# Use Spartacus Public Services, Not the NgRx `Store`

## Rule

In components and services, inject the public Spartacus service for the data you need. NEVER inject `Store<...>` from `@ngrx/store` against Spartacus state, and NEVER import action creators, selectors, or anything from `@spartacus/*/core` internals.

The public services are the stable contract. Internals have been moved, renamed, and in several features (checkout, user account, user profile, quote, customer ticketing) entirely replaced with Commands/Queries across releases. Code that dispatches actions directly breaks on upgrade; code that calls `facade.method(...)` doesn't.

## Three categories of public service

Spartacus's public services are not all the same shape. Knowing which is which matters when you customize them.

### 1. Lazy-loaded Facades (the proper "Facades")

Eagerly available in the root injector via a `*RootModule`, but their real implementation lives in a lazy-loaded feature lib. The root injector binds them through `facadeFactory(...)`, which forwards every call to the real service once the lazy chunk has loaded.

Examples:

| Facade | Underlying service | From |
|--------|--------------------|------|
| `ActiveCartFacade` | `ActiveCartService` | `@spartacus/cart/base/root` |
| `MultiCartFacade` | `MultiCartService` | `@spartacus/cart/base/root` |
| `OrderFacade` | `OrderService` | `@spartacus/order/root` |
| `OrderHistoryFacade` | `OrderHistoryService` | `@spartacus/order/root` |
| `CheckoutDeliveryAddressFacade` | `CheckoutDeliveryAddressService` | `@spartacus/checkout/base/root` |
| `CheckoutPaymentFacade` | `CheckoutPaymentService` | `@spartacus/checkout/base/root` |
| `CheckoutPaymentTypeFacade` | `CheckoutPaymentTypeService` | `@spartacus/checkout/b2b/root` |
| `UserAccountFacade` | `UserAccountService` | `@spartacus/user/account/root` |
| `UserProfileFacade` | `UserProfileService` | `@spartacus/user/profile/root` |

These are what people usually mean by "Spartacus Facades". The **underlying service** is the concrete implementation inside the lazy chunk — it's what you override in the feature wrapper module when customizing behavior (see [extending-spartacus-classes.md](./extending-spartacus-classes.md)). Discover facades by searching `facadeFactory({ facade:` under `node_modules/@spartacus/*/root`.

### 2. Eager `core` services backed by NgRx

Live in `@spartacus/core` (the `core` package is always eager). They inject `Store<...>` themselves and expose Observables and imperative methods.

Examples: `ProductService`, `CmsService`, `RoutingService`, `AuthService`, `LanguageService`, `CurrencyService`, `BaseSiteService`.

These are NOT lazy proxies, but they ARE the public API for that data — keep using them and stay away from `Store<...>`.

### 3. Component helper services

A handful of services in `@spartacus/storefront` carry the `*ComponentService` suffix. They are NOT facades — they are component-local helpers (state for one UI piece, click handlers, etc.). Examples: `MiniCartComponentService`, `ProductListComponentService`. Use them only inside the component they belong to.

## Correct usage

```typescript
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Component({ /* ... */ })
export class MiniCartBadgeComponent {
  private activeCart = inject(ActiveCartFacade);

  quantity$ = this.activeCart.getActive().pipe(map((c) => c.totalItems ?? 0));

  clear(): void {
    this.activeCart.getEntries().pipe(take(1)).subscribe((entries) =>
      entries.forEach((e) => this.activeCart.removeEntry(e))
    );
  }
}
```

## Anti-patterns

```typescript
// ❌ Injecting Store directly
private store = inject<Store<StateWithCart>>(Store);
this.store.dispatch(CartActions.loadCart(...));
this.store.select(getCartEntries);

// ❌ Importing from @spartacus/*/core or internal selectors
import { getCartState } from '@spartacus/cart/base/core';

// ❌ Using @ngrx/store APIs against Spartacus state
this.store.pipe(select(...)).subscribe(...);
```

## If a method you need doesn't exist

- Check both `@spartacus/<feature>/root` (lazy proxy facades) and `@spartacus/core` (eager core services). Some features split data across both.
- For lazy proxy facades (Category 1), adding a new method requires two pieces: extend the abstract Facade class to declare the method, and override the underlying implementation in the feature's wrapper module so `facadeFactory` forwards calls to your subclass. See [extending-spartacus-classes.md](./extending-spartacus-classes.md).
- For eager core services (Category 2), `useClass` swap in the root injector is enough.

## Source reference (in `node_modules/@spartacus/*`)

- `ActiveCartFacade`, `OrderFacade`, `CheckoutDeliveryAddressFacade`, `UserAccountFacade` — proxy facades from `@spartacus/<feature>/root`.
- `ProductService`, `CmsService`, `RoutingService`, `AuthService` — eager core services from `@spartacus/core`.
- `facadeFactory`, `FacadeFactoryService`, `FacadeDescriptor` from `@spartacus/core` — the lazy-loading plumbing behind Category 1.
