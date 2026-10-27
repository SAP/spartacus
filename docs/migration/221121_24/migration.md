# Migrating a custom app to use Spartacus 221121.24.0 with Angular 22

Before upgrading Spartacus to the new version with Angular 22, you need to first:

- upgrade Spartacus to version 221121.7.0 (with Angular 21)
- **ensure you have Node `^22.22.3` (or `^24.15.0`, or `>=26.0.0`) installed** — Angular 22's CLI does not run on older Node 22 patches. Also use **npm `>=11`** (npm 10.9.x can crash resolving the new Vitest 4 peer set).
- upgrade Angular to version v22

## Update Angular to 22 and 3rd party deps

Follow the [Angular guidelines for upgrading from v21 to v22](https://angular.dev/update-guide?v=21.0-22.0&l=3) and bump Angular locally, updating other 3rd-party dependencies from the Angular ecosystem to versions compatible with Angular 22 (e.g. `@ngrx/store@22`, `angular-oauth2-oidc@22`, `@ng-select/ng-select@latest`, `ngx-infinite-scroll@22`):

```bash
ng update @angular/core@22 @angular/cli@22 @ngrx/store@22 angular-oauth2-oidc@22 @ng-select/ng-select@latest ngx-infinite-scroll@22 --force
git add .
git commit -m "update angular 22 and 3rd party deps angular 22 compatible"
```

> **New peer dependency: `@angular/cdk`.** `@ng-select/ng-select` (v22-compatible line) now requires `@angular/cdk`. The Spartacus `ng update` migration adds it automatically; if you install manually, add `@angular/cdk@^22.x` to your app.

## Run Spartacus update

```bash
ng update @spartacus/schematics@2211.24 --force
git add .
git commit -m "update spartacus to 221121.24.0"
```

The Spartacus update runs two automated migrations relevant to this version:

1. **Dependency management** — adds `@angular/cdk` and bumps Angular/ngrx/ng-select peer ranges (caret ranges, so your app can stay on the latest compatible minor).
2. **Constructor `inject()` migration** — see below.

### Angular 22: Spartacus services and components moved to `inject()`

In this release, Spartacus services, components, guards, interceptors, adapters, connectors, and converters were migrated from **constructor-based dependency injection** to Angular's **`inject()` function**. As a result, these classes no longer declare their dependencies as constructor parameters — their constructors are now empty (or removed).

**This is a breaking change only if you _extend_ a Spartacus class and call `super(...)`** passing the dependencies the base class used to declare. For example:

```ts
// Before (Spartacus 221121.7 / Angular 21) — this compiled:
export class MyAddToCart extends AddToCartComponent {
  constructor(
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    component: CmsComponentData<CmsAddToCartComponent>,
    eventService: EventService,
    productListItemContext: ProductListItemContext
  ) {
    super(currentProductService, cd, activeCartFacade, component, eventService, productListItemContext);
  }
}
```

After the upgrade, `AddToCartComponent` has a 0-argument constructor, so the `super(...)` call above no longer compiles (`TS2554: Expected 0 arguments, but got 6`).

#### Automatic migration

The `ng update` migration **automatically fixes the common case**: for a subclass whose `super(...)` passes exactly the dependencies the Spartacus base class used to declare, it removes those arguments from the `super()` call and the corresponding constructor parameters. After the migration, the example above becomes:

```ts
export class MyAddToCart extends AddToCartComponent {}
```

If your subclass **also injected its own extra dependencies** (and still passed only the base's deps to `super()`), the migration strips the Spartacus deps and **keeps your own**:

```ts
export class MyAddToCart extends AddToCartComponent {
  constructor(protected myOwnService: MyOwnService) {
    super();
  }
}
```

#### Manual migration steps (cases the automated migration does NOT touch)

The migration deliberately **skips** (leaves untouched, never edits) subclasses it cannot transform safely. Fix these by hand:

1. **Your `super(...)` passes a different set/number of arguments** than the base used to declare (e.g. you reordered them, or passed only some of them through). The migration skips it (it only transforms a `super()` whose argument count matches the base's old parameter list exactly). **Fix:** remove the Spartacus dependencies from your `super()` call and constructor; the base now injects them itself, so access them via the inherited `protected` fields (`this.someService`), and declare only your own deps via `inject()`.

   ```ts
   // Before (fails on v22 with "TS2554: Expected 0 arguments, but got 2"):
   export class CustomAddToCart extends AddToCartComponent {
     constructor(
       protected currentProductService: CurrentProductService,
       protected cd: ChangeDetectorRef
     ) {
       super(currentProductService, cd);
     }
   }

   // After — the base injects its own deps, so drop the constructor entirely
   // (and remove the now-unused imports). Use this.currentProductService / this.cd as before:
   export class CustomAddToCart extends AddToCartComponent {}

   // If your subclass has its OWN dependency, keep it via inject():
   export class CustomAddToCart extends AddToCartComponent {
     protected myService = inject(MyService);
   }

   // If you need custom constructor logic, keep the constructor but call super() with no args:
   export class CustomAddToCart extends AddToCartComponent {
     constructor() {
       super();
       // custom init here
     }
   }
   ```

2. **You override a dependency with a different (narrowed/concrete) type**, or pass a concrete service where the base now injects a facade token. **Fix:** the base already injects its dependency with `inject()`. If you need a different concrete instance, provide it in your module/component `providers` (e.g. `{ provide: SomeFacade, useExisting: MyConcreteService }`) rather than passing it through `super()`.

3. **You reference a dependency the base used to expose as a constructor parameter.** All such deps are now `protected` fields on the base initialized with `inject()`, so `this.someService` continues to work. If the migration removed a constructor parameter you still reference, it is available as the inherited field — no change needed.

4. **You want to convert your own class to `inject()` too** (recommended). Replace `constructor(private x: X) {}` with `private x = inject(X);`. This is optional; constructor DI still works for your own classes.

> After running the migration, build your app (`ng build`). Any remaining `TS2554: Expected 0 arguments` errors point to a subclass that needs one of the manual fixes above.
