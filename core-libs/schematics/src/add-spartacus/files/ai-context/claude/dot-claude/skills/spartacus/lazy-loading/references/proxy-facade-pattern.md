# Proxy Facade Pattern — Lazy-Loading Bridge

A **proxy facade** is the eager-injectable abstraction that hides a lazy-loaded service behind a stable contract. It is the mechanism that lets a component eagerly `inject(ActiveCartFacade)` even though the cart code itself is in a separate lazy chunk.

## The two pieces

1. **The abstract Facade class**, declared in `@spartacus/<feature>/root` (eagerly available because `*RootModule` is always imported):

   ```typescript
   export abstract class ActiveCartFacade {
     abstract getActive(): Observable<Cart>;
     abstract getEntries(): Observable<OrderEntry[]>;
     abstract addEntry(productCode: string, quantity: number): void;
     abstract removeEntry(entry: OrderEntry): void;
   }
   ```

2. **A proxy `useFactory` provider** in the same `*RootModule`, bound to the abstract class via `@Injectable({ providedIn: 'root' })`:

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
   export abstract class ActiveCartFacade { /* ... */ }
   ```

`facadeFactory` returns an object that **looks** like an `ActiveCartFacade` to TypeScript — it has all the methods listed in `methods: [...]`. Internally each method is a stub that:

1. Triggers the lazy chunk for `feature: CART_BASE_CORE_FEATURE` if it isn't loaded yet.
2. Once loaded, asks the lazy injector for the real `ActiveCartFacade` token (which is bound to the concrete `ActiveCartService` inside the lazy chunk).
3. Forwards the call to the real instance and returns the result.
4. After the first call to any method, subsequent calls go directly to the real service — the chunk is in memory, the proxy stops doing extra work.

For methods that return `Observable<T>`, the proxy returns an `Observable` immediately and pipes through the real service's observable once it's available, so subscribers don't see a difference.

## Why this matters when you customize a Facade

Two distinct cases, two distinct techniques.

### Case 1 — Override the behavior of an existing method

The Facade's signature stays the same; you just want different behavior under the hood (e.g. `addEntry` should also fire a custom analytics event).

The proxy is fine. You override the **underlying service implementation** in the feature's lazy wrapper module so `facadeFactory`'s lookup resolves to your subclass:

```typescript
// In the lazy wrapper module (e.g. CartBaseFeatureModule)
@NgModule({
  providers: [
    { provide: ActiveCartService, useClass: MyCustomActiveCartService },
  ],
})
export class CartBaseWrapperModule {}
```

Spartacus's lazy injector binds `ActiveCartFacade` → `ActiveCartService` inside the chunk; overriding `ActiveCartService` is enough.

### Case 2 — Add a brand-new method to a Facade

The signature has to grow. Just adding `myNewMethod` to your custom subclass is **not enough** — `facadeFactory` only forwards the methods listed in its `methods: [...]` array, and consumers see only the `ActiveCartFacade` abstract class signature.

You need three pieces:

1. **Augment the abstract class** so consumers see the new method (declaration merging or a new abstract subclass that consumers inject by name).
2. **Override the underlying service implementation** in the lazy wrapper module (as in Case 1) so the runtime instance has the new method.
3. **Re-provide the facade** with an extended `facadeFactory` whose `methods: [...]` array includes `myNewMethod`, otherwise the proxy won't forward it.

This is genuinely tricky and the reason most customizations stay in Case 1. Reach for Case 2 only when adding a new method is the only sensible API.

## Where to learn more

- [Proxy Facades documentation](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/proxy-facades-f44487b.md)
- `facadeFactory`, `FacadeFactoryService`, `FacadeDescriptor` from `@spartacus/core` — read their source for the call-forwarding implementation.
- See the `extending-spartacus-classes` skill for the surrounding "extend, don't copy" rule.
