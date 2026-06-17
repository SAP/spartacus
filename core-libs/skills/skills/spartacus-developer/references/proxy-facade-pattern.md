# Proxy Facade Pattern — Lazy-Loading Bridge

A **proxy facade** is the eager-injectable abstraction that hides a lazy-loaded service behind a stable contract. It is the mechanism that lets a component eagerly `inject(ActiveCartFacade)` even though the cart code itself is in a separate lazy chunk.

> Because the proxy may need to lazy-load the real implementation before it can answer, a proxy facade must expose **only methods that return `Observable`s** (or `Promise`s) — never synchronous methods or plain value properties. A synchronous getter can't wait for the chunk to load, so it has nothing correct to return on the first call. Keep every facade member async.

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

You need three pieces, and **where each one is provided matters**. The factory resolves the facade from the *lazy* injector (`injector.get(facade)` after the chunk loads), so:

1. **Augment the abstract facade** so consumers see the new method (a new abstract subclass that consumers inject by name). Keep it in an eager file.
2. **Inside the lazy wrapper module**, subclass the underlying service to add the method, then bind your custom facade token to it — the factory looks the token up here, so the binding must live in the lazy module (not eagerly, or it would resolve back to the proxy).
3. **In an eager (root) module**, re-provide the facade proxy with a `facadeFactory` whose `methods: [...]` includes the new method. It must be eager so consumers can inject it before the chunk loads.

```typescript
// 1. Augmented abstract facade — consumers inject this (eager file).
export abstract class CustomActiveCartFacade extends ActiveCartFacade {
  abstract clearActiveCart(): void;
}

// 2. In the LAZY wrapper module: subclass the service and bind the custom
//    facade token to it. `facadeFactory` resolves CustomActiveCartFacade from
//    the lazy injector, so this binding has to live here.
@Injectable()
export class CustomActiveCartService
  extends ActiveCartService
  implements CustomActiveCartFacade
{
  clearActiveCart(): void {
    this.getEntries()
      .pipe(take(1))
      .subscribe((entries) => entries.forEach((e) => this.removeEntry(e)));
  }
}

@NgModule({
  imports: [CartBaseModule],
  providers: [
    CustomActiveCartService,
    { provide: CustomActiveCartFacade, useExisting: CustomActiveCartService },
  ],
})
export class CartBaseWrapperModule {}

// 3. In an EAGER (root) module: the proxy. `methods` must list the new method
//    (the proxy forwards only listed methods), and `async: true` matches the
//    original facade.
@NgModule({
  providers: [
    {
      provide: CustomActiveCartFacade,
      useFactory: () =>
        facadeFactory({
          facade: CustomActiveCartFacade,
          feature: CART_BASE_CORE_FEATURE,
          methods: [
            'getActive', 'getEntries', 'addEntry', 'removeEntry',
            'clearActiveCart',
          ],
          async: true,
        }),
    },
  ],
})
export class CustomCartRootModule {}
```

Prefer Case 1 — only add a new facade method (Case 2) when extending the API is the only sensible option.

## Where to learn more

- `facadeFactory`, `FacadeFactoryService`, `FacadeDescriptor` from `@spartacus/core` — read their source for the call-forwarding implementation.
- See the `extending-spartacus-classes` skill for the surrounding "extend, don't copy" rule.
