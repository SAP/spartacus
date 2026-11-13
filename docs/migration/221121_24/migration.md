# Migrating a custom app to Spartacus 221121.24.0 and Angular 22

Start from a committed, working Spartacus 221121.22.0 application using Angular 21. Keep your source and lockfile backup; record the installed versions with `npm ls` before updating. Use the exact published Spartacus patch being released (221121.24.0 below is the release example).

Use a supported Node version: `^22.22.3`, `^24.15.0` or `>=26.0.0`. Angular 22 CLI rejects older Node 22 patches. Validation used Node 22.23.4 and npm 12.2.2. Use a recent compatible npm version; older npm 10.9.x failed resolving the upgrade peer graph in earlier validation. The framework workspace npm pin is not a requirement to add framework tooling to a customer app.

## Update compatible dependencies together

Follow the [Angular 21 to 22 update guide](https://angular.dev/update-guide?v=21.0-22.0&l=3). Angular, its ecosystem and Spartacus have interdependent peer requirements; updating Angular alone while retaining Angular 21 Spartacus peers can fail. Update the installed packages together, without force or legacy peer resolution.

If the installed i18next version blocks TypeScript 6, first select a version supporting both TypeScript 5 and 6 within the old Spartacus peer range. Spartacus 221121.21.0 requires i18next ^25.7.4; 25.10.10 satisfies that range and supports both TypeScript versions. Skip this preparation step when the installed version is already compatible. Do not install i18next 26 separately while retaining the old Spartacus peers:

~~~bash
npm install i18next@25.10.10
git add .
git commit -m "Prepare i18next for TypeScript 6"
~~~

The reviewed ecosystem versions are Angular core 22.2.4, CLI/CDK 22.2.6, NgRx 22.0.1, ng-select 24.2.1, angular-oauth2-oidc 22.0.2 and ngx-infinite-scroll 22.0.0. Include only packages installed in your app; add your other Angular-dependent libraries with their reviewed compatible versions. For SSR, keep @angular/ssr and @angular/platform-server aligned with the other Angular packages.

~~~bash
SPARTACUS_VERSION=221121.24.0
ng update @angular/core@22.2.4 @angular/cli@22.2.6 \
  @ngrx/store@22.0.1 @ngrx/effects@22.0.1 @ngrx/router-store@22.0.1 \
  angular-oauth2-oidc@22.0.2 @ng-select/ng-select@24.2.1 \
  ngx-infinite-scroll@22.0.0 i18next@26.7.1 \
  @spartacus/schematics@$SPARTACUS_VERSION
npm install @angular/cdk@22.2.6
~~~

ng-select 24.2.1 requires Angular CDK. Add it as a direct application dependency; there is no Spartacus 221121.24 dependency-management migration that adds it for you. Review the resulting package.json and lockfile, including all installed @spartacus packages and Angular builders. Resolve third-party peer conflicts with compatible versions instead of forcing installation.

Spartacus packageGroup updates the installed Spartacus packages. The framework migrations relevant to this upgrade are:

1. SSR allowed-host script migration.
2. Customer constructor migration for the Spartacus inject() conversion.
3. Removed API and EPD review comments requiring manual customer cleanup.

The AI-context migration also offers installation or refresh of `spartacus-developer` and `spartacus-major-upgrade` guidance for `.agents` and Claude Code. Its registered version follows the package publishing version. Non-interactive updates refresh already-installed tool guidance; an app with no installed skills gets a manual-install notice. Declining the interactive prompt does not install skills.

The [major-upgrade skill](../../../core-libs/skills/skills/spartacus-major-upgrade/SKILL.md) separates automatic schematic changes from customer work on subclasses, removed APIs, templates, SSR and tests. It includes [before/after code recipes](../../../core-libs/skills/skills/spartacus-major-upgrade/references/code-migrations.md) and a [removed API lookup](../../../core-libs/skills/skills/spartacus-major-upgrade/references/removed-apis.md). An LLM without skill discovery can read the copied `SKILL.md` and its relative reference directly. To install it later with the selected release:

~~~bash
npm install --save-dev @spartacus/skills@$SPARTACUS_VERSION
ng generate @spartacus/schematics:ai-context --ai-tools=agents --ai-tools=claude
~~~

Run production builds and application tests, review migration output and commit the update:

~~~bash
ng build --configuration production
ng test --watch=false
git add .
git commit -m "Update Angular and Spartacus to the Angular 22 release"
~~~

Existing Karma and modern Angular unit-test targets remain supported. The modern unit-test builder takes assets and styles through its associated build target; do not copy Karma-only options into it. Nx is a development-workspace dependency of the Spartacus repository, and is not required in a customer application unless that application already uses Nx.

### Root component tests in fresh applications

When ng add replaces the Angular welcome template with the storefront, adjust the example tests created by Angular CLI. Their TestBed does not include application-level providers, and the assertion for the old welcome heading is no longer applicable. The missing Store provider in that default test is also reproducible on Angular 21.

For an isolated application-shell test, stub the storefront component and keep the real root template. Test customized Spartacus components separately with their required providers, and cover the real storefront with browser tests:

~~~ts
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app.component';

@Component({
  selector: 'cx-storefront',
  standalone: true,
  template: '<main>Customer storefront</main>',
})
class StorefrontStub {}

describe('App shell', () => {
  it('renders the storefront', () => {
    TestBed.configureTestingModule({ imports: [App] });
    TestBed.overrideComponent(App, { set: { imports: [StorefrontStub] } });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('cx-storefront main')?.textContent)
      .toBe('Customer storefront');
  });
});
~~~

Use the actual root class name of your app. For a full component integration test, provide the application configuration and replace backend dependencies with suitable test doubles instead. Preserve existing customer assertions; replacing the Angular CLI example is a fresh-app setup step.

## SSR allowed hosts

Angular 22.2.1 CommonEngine validates request hosts and reads the comma-separated NG_ALLOWED_HOSTS environment variable directly. When set, this environment variable takes precedence over the engine's allowedHosts option. Spartacus delegates to CommonEngine, so existing servers do not need additional environment wiring. Fresh Spartacus server templates also provide a localhost fallback and merge SSR_ALLOWED_HOSTS into their allowedHosts option; an explicit NG_ALLOWED_HOSTS still takes precedence.

The migration detects SSR applications and prefixes scripts named serve:ssr or serve:ssr:* with NG_ALLOWED_HOSTS=localhost. Scripts already containing NG_ALLOWED_HOSTS are left unchanged. This supplies a local development default; review an existing variable rather than assuming it is valid for deployment.

~~~bash
NG_ALLOWED_HOSTS=localhost,store.example.com node dist/my-app/server/server.mjs
~~~

Set trusted hostnames for your deployment, without schemes or ports. Inspect the actual built server entry path. Configure the environment through your container/process manager for custom script names or deployment commands. POSIX inline environment assignment does not work in Windows cmd; use PowerShell (`$env:NG_ALLOWED_HOSTS='localhost'`) or a suitable environment-setting tool. Configure proxy forwarding and test both an allowed host and a rejected host. Do not disable validation to make local requests pass.

### Prerender configuration

Set `SERVER_REQUEST_ORIGIN` to the application's public origin when prerendering. There is no incoming HTTP request from which Spartacus can infer it. This is separate from Angular's host allowlist. For the repository demo, run:

~~~bash
SERVER_REQUEST_ORIGIN=http://localhost:4200 SPA_ENV=b2c npm run prerender
~~~

Customer applications must also enable prerendering in their build target and supply the routes to render. Verify the generated HTML and the `prerendered-routes.json` entries: a successful SSR build reporting zero static routes does not verify prerendering.

### Angular 22: Spartacus services and components moved to `inject()`

In this release, Spartacus services, components, guards, interceptors, adapters, connectors, and converters were migrated from **constructor-based dependency injection** to Angular's **`inject()` function**. Many public constructors no longer accept their former DI arguments. Some constructors remain for initialization or non-DI arguments; check the published signature of the class you extend.

This changes the public construction API. Customer subclasses calling `super(...)` with dependencies removed from the base constructor need to migrate. Direct construction in tests also needs an Angular injection context and the appropriate providers. For example:

```ts
// Before (Spartacus 221121.22.0 / Angular 21) — this compiled:
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

The `ng update` migration **automatically fixes the common case**: for a subclass whose `super(...)` passes exactly the dependencies the Spartacus base class used to declare, it matches arguments to parameters in their original order, removes those arguments from the `super()` call and removes corresponding constructor parameters only when they are used solely for forwarding. It supports named import aliases and multiple direct subclasses in one file. Shared imports and dependencies used by customer code are preserved. After the migration, the example above becomes:

```ts
export class MyAddToCart extends AddToCartComponent {
  constructor() {
    super();
  }
}
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

1. **Your `super(...)` passes a different set/number of arguments** than the base used to declare (e.g. you reordered them, or passed only some of them through). The migration also skips expressions, namespace base imports, indirect customer inheritance with explicit constructors, and narrowed types. It only transforms a `super()` whose argument count and ordered parameter types match the old constructor exactly. **Fix:** remove the Spartacus dependencies from your `super()` call and constructor; the base now injects them itself, so access them via the inherited `protected` fields (`this.someService`), and declare only your own deps via `inject()`.

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

2. **You override a dependency with a different (narrowed/concrete) type**, or pass a concrete service where the base now injects a facade token. **Fix:** the base already injects its dependency with `inject()`. If you need a different concrete instance, provide it in your module/component `providers` (e.g. `{ provide: SomeFacade, useExisting: MyConcreteService }`) rather than passing it through `super()`. Configure the provider at the same injector scope where the base is created, and test that your concrete implementation is actually used.

3. **You reference a dependency the base used to expose as a constructor parameter.** Many dependencies are now fields initialized with `inject()`, but their names and visibility depend on the class. The migration preserves parameters referenced in your constructor body or methods. Review explicit overrides against the new declaration; do not assume every dependency is an inherited field with the same name.

4. **You want to convert your own class to `inject()` too** (recommended). Replace `constructor(private x: X) {}` with `private x = inject(X);`. This is optional; constructor DI still works for your own classes.

5. **You extend the abstract organization `ItemService` directly.** Implement its `currentItemService` and `formService` properties with the concrete services for your entity. The base class cannot inject these abstract service tokens because each entity requires a different implementation. Its `key$`, `current$`, and `unit$` streams resolve the concrete service when subscribed, after subclass fields have initialized. For example, a unit item service declares:

   ```ts
   protected currentItemService = inject(CurrentUnitService);
   protected formService = inject(UnitFormService);
   ```

   Classes extending a concrete item service, such as `UnitItemService`, inherit these implementations. Override the properties only when the subclass needs different services.

> After running the migration, build your app (`ng build`). Any remaining `TS2554: Expected 0 arguments` errors point to a subclass that needs one of the manual fixes above.
