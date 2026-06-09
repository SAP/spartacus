---
name: lazy-loading
description: Use this skill when adding a new feature module to a Spartacus app, deciding whether `loadChildren` belongs here, or understanding why a feature lib can be `inject(...)`'d eagerly even though its code is lazy. Covers `featureModules` config and the proxy-facade pattern.
---

# Lazy Loading

## Rule

NEVER use Angular's `loadChildren` in route definitions. Spartacus has its own CMS-driven lazy loading system based on `featureModules` config.

## How it works

The library declares which CMS component types belong to a feature:

```typescript
featureModules: {
  [CHECKOUT_FEATURE]: {
    cmsComponents: ['CheckoutOrchestrator', 'CheckoutProgress', ...],
  },
}
```

Your app provides the dynamic import:

```typescript
provideConfig({
  featureModules: {
    [CHECKOUT_FEATURE]: {
      module: () =>
        import('./checkout-wrapper.module').then(m => m.CheckoutWrapperModule),
    },
  },
})
```

When any listed CMS component type is needed on a page, Spartacus loads the module automatically.

## Root modules vs main modules

- `*RootModule` is always imported **eagerly** — it registers config, tokens, outlets, and any **proxy facades** for the feature (see below).
- The main `*Module` is loaded **lazily** via the CMS feature-module mechanism above.

## Proxy facades — the lazy-loading bridge

The thing that lets your eager component code call into a lazy-loaded feature is a **proxy facade**, declared in the feature's `*RootModule`. A short example:

```typescript
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: ActiveCartFacade,
      feature: CART_BASE_CORE_FEATURE,
      methods: ['getActive', 'getEntries', 'addEntry', 'removeEntry'],
    }),
})
export abstract class ActiveCartFacade {
  abstract getActive(): Observable<Cart>;
  // ...
}
```

The proxy is eager; the implementation isn't. Your component can `inject(ActiveCartFacade)` from the root injector even though the cart code itself is lazy. For the full call-resolution mechanics and the implications for extending facades, see [references/proxy-facade-pattern.md](references/proxy-facade-pattern.md).

## For new features

If you create a brand-new feature, ship it as a lazy-loadable wrapper module + `featureModules` mapping, so its code isn't pulled into the root bundle on unrelated pages. Register it through `cmsComponents` mapping — not through Angular routes. The CMS decides when and where to render it.

## Anti-pattern

```typescript
// ❌ Angular loadChildren — bypasses Spartacus' CMS-driven feature loader.
//    The chunk loads on URL match, NOT when the CMS slot needs the
//    component, so the bundle ships even when the CMS hides the feature
//    and never ships when the CMS exposes the feature on a different URL.
const routes: Routes = [
  {
    path: 'order-history',
    loadChildren: () =>
      import('./order-history/order-history.module').then((m) => m.OrderHistoryModule),
  },
];
```

```typescript
// ✅ Map the feature's CMS component types to a dynamic import.
//    Spartacus loads the chunk on demand when the CMS slot resolves to one
//    of those types — no Angular route needed.
provideConfig({
  featureModules: {
    [ORDER_HISTORY_FEATURE]: {
      cmsComponents: ['AccountOrderHistoryComponent', 'AccountOrderDetailsComponent'],
      module: () =>
        import('./order-history-wrapper.module').then((m) => m.OrderHistoryWrapperModule),
    },
  },
});
```

If the wrapper module needs always-on providers (config, outlet registrations, event listeners), put those in a small eager `*RootModule` and keep the heavy code in the lazy `*Module` referenced above.

## Source reference

- Library side (`node_modules/@spartacus/*`): `CheckoutRootModule` from `@spartacus/checkout/base/root` (it provides the `featureModules.checkout.cmsComponents` mapping).
- App side: in this app, look for `*-feature.module.ts` files under `src/app/spartacus/features/` — they each call `provideConfig({ featureModules: { ...: { module: () => import(...) } } })`.

## Supplemental Information

- [references/proxy-facade-pattern.md](references/proxy-facade-pattern.md) — how `facadeFactory` resolves a call to a lazy-loaded service, and what it means for extending a facade.
