# Spartacus Storefront — AI Development Guidelines

This is a Spartacus (SAP Commerce Cloud) storefront application. Spartacus has its own architecture that differs significantly from standard Angular patterns; the rules below capture where it diverges.

## Skills

Each detailed section below covers one topic. Skip to the one whose trigger applies — sections are independent and can be read in any order.

- **`backend-communication`** — Use this skill when wiring a service to the backend in a Spartacus app, adding an OCC endpoint, configuring `backend.occ.endpoints`, or anywhere `HttpClient` is being introduced. Explains the layered Component → Facade → Connector → Adapter → Converter pipeline that all backend communication must go through.
- **`cms-component-wiring`** — Use this skill when introducing a component the CMS should be able to place on Spartacus pages, replacing an existing CMS component, or registering `cmsComponents` mappings. Explains why Angular routes are not the right tool for CMS-managed pages.
- **`configurable-urls`** — Use this skill when changing the URL pattern of an existing Spartacus page, generating router links via the `cxUrl` pipe, or adding a custom CMS-driven route with a dynamic parameter (e.g. `/my-account/trade-in/:id`). Covers `RoutingConfig` and the `path:null` + `cxRoute` + `PageLayoutComponent` + `CmsPageGuard` pattern.
- **`configuration`** — Use this skill when adding `provideConfig` / `provideDefaultConfig` calls in a Spartacus app, choosing between root-injector and lazy-wrapper placement, or troubleshooting an expected config value that isn't taking effect at runtime.
- **`correct-injector`** — Use this skill when a Spartacus customization (service override, normalizer, component mapping, config) compiles but doesn't take effect at runtime, or when deciding where to register an override. Covers wrapper-module placement for lazy-loaded features and how to discover them.
- **`existing-features`** — Use this skill before building any feature in a Spartacus app — Spartacus may already ship the feature out of the box. Covers how to inspect installed `@spartacus/*` packages, configured feature modules, and the `@spartacus/schematics` installable feature list.
- **`extending-spartacus-classes`** — Use this skill when customizing a Spartacus component, service, or facade. Subclass and override the methods you need rather than copying source files into your app; covers extension, composition, and the rare case where copying is the only option.
- **`facades-not-store`** — Use this skill when reading or writing Spartacus state from a component or service. Inject the public Spartacus service (proxy facades, eager core services, or component helpers — three distinct categories) instead of `Store<...>` from `@ngrx/store`.
- **`i18n`** — Use this skill when adding user-facing strings, translation chunks, or wiring up `cxTranslate` in a Spartacus app. Covers eager `provideConfig({ i18n: ... })` registration and lazy-loaded translation chunks via `i18n.backend.loader`.
- **`lazy-loading`** — Use this skill when adding a new feature module to a Spartacus app, deciding whether `loadChildren` belongs here, or understanding why a feature lib can be `inject(...)`'d eagerly even though its code is lazy. Covers `featureModules` config and the proxy-facade pattern.
- **`normalizers`** — Use this skill when surfacing extra OCC backend fields in the Spartacus UI model (e.g. a custom `loyaltyPoints` field on Product). Covers declaration merging, the `Converter<OccModel, UiModel>` interface, and registering with `multi: true` against the right `*_NORMALIZER` injection token.
- **`outlets`** — Use this skill when sprinkling new UI into an existing Spartacus page without replacing it (e.g. a trust badge under add-to-cart, a wishlist button next to product-tile actions, a banner above the product grid). Covers `provideOutlet`, `cxOutletRef`, finding outlet IDs, and when CMS mapping is the right tool instead.
- **`ssr-safety`** — Use this skill when touching `window`, `document`, `localStorage`, `sessionStorage`, `IntersectionObserver`, `navigator`, or any browser-only API in a Spartacus component or service. Covers the `WindowRef.isBrowser()` guard pattern and the limited cases where `disableSSR` is appropriate.
- **`state-management`** — Use this skill before introducing a `BehaviorSubject` or new NgRx feature for Spartacus data, or when figuring out whether a Spartacus feature uses NgRx or Commands/Queries. Covers picking the matching pattern when customizing.
- **`styling`** — Use this skill when adding SCSS or wiring up CSS for a brand-new component in a Spartacus app, or when restyling an existing Spartacus `cx-*` component. Distinguishes brand-new components (component-scoped styles OK) from `cx-*` overrides (global SCSS, because Spartacus styles its OOTB components entirely through global SCSS in `@spartacus/styles`).
- **`subscriptions`** — Use this skill when reaching for `.subscribe()` in a component or service in a Spartacus app, or when adding `cd.markForCheck()`. Covers acceptable vs unacceptable subscription patterns and `takeUntilDestroyed()` as the canonical unsubscription tool.

## Detailed guidance

# Backend Communication

## Rule

NEVER inject `HttpClient` in components or services. All backend communication goes through a layered pipeline:

```
Component → Facade → state layer → Connector → Adapter → Converter
```

The **state layer** is NgRx in older features and the Commands/Queries services in newer ones — match whichever the feature already uses (see the `state-management` skill). Only **Adapters** use `HttpClient`. Each layer has a specific role:

- **Facade** — Public API consumed by components. Hides internal complexity.
- **Connector** — Thin delegation layer injecting the abstract Adapter.
- **Adapter** — Abstract class in `connectors/`, OCC implementation in `occ/adapters/`. This is the ONLY layer that uses `HttpClient`.
- **Converter** — Transforms data between backend and UI models. Normalizers (backend→UI) and Serializers (UI→backend) are registered as `multi: true` providers on typed `InjectionToken`s.

## OCC Endpoint Configuration

NEVER hardcode endpoint URLs. Configure them via `provideConfig`:

```typescript
provideConfig({
  backend: {
    occ: {
      endpoints: {
        myEndpoint: 'my-resource/${resourceId}?fields=DEFAULT',
      }
    }
  }
})
```

In the adapter, resolve URLs using `OccEndpointsService`:

```typescript
this.occEndpoints.buildUrl('myEndpoint', { urlParams: { resourceId } })
```

## When creating a new backend integration

Create these files:

1. **Model** — TypeScript interface for the UI model
2. **Adapter (abstract)** — Abstract class defining the contract
3. **OCC Adapter** — Implementation using `HttpClient` and `OccEndpointsService`
4. **Connector** — Injects and delegates to the adapter
5. **Facade** — Public API for components, uses the connector (via NgRx or Commands/Queries)
6. **Normalizer** (optional) — Implements `Converter<OccModel, UiModel>`, registered with a typed `InjectionToken`

## Anti-pattern

```typescript
// ❌ Component injects HttpClient directly — bypasses every layer
//    (no facade, no connector, no adapter, no converter, no normalizer
//    hook, no OCC endpoint resolution, no state-layer caching/reuse).
@Component({ /* ... */ })
export class LoyaltyPointsComponent implements OnInit {
  private http = inject(HttpClient);
  points = 0;

  ngOnInit() {
    this.http
      .get<{ points: number }>('/occ/v2/electronics-spa/users/current/loyalty')
      .subscribe((res) => (this.points = res.points));
  }
}
```

```typescript
// ✅ Component talks to a facade. The facade hides the connector/adapter
//    pipeline behind a stable public API.
@Component({ /* ... */ })
export class LoyaltyPointsComponent {
  private loyaltyFacade = inject(LoyaltyFacade);
  points$ = this.loyaltyFacade.getPoints();
}

// ✅ Adapter — the only layer that touches HttpClient and OccEndpointsService
@Injectable({ providedIn: 'root' })
export class OccLoyaltyAdapter implements LoyaltyAdapter {
  private http = inject(HttpClient);
  private occEndpoints = inject(OccEndpointsService);
  private converter = inject(ConverterService);

  load(userId: string): Observable<LoyaltyPoints> {
    return this.http
      .get<OccLoyaltyPoints>(this.occEndpoints.buildUrl('loyalty', { urlParams: { userId } }))
      .pipe(this.converter.pipeable(LOYALTY_NORMALIZER));
  }
}
```

## Debugging an existing endpoint

To see the exact URL Spartacus builds for a configured endpoint:

```typescript
inject(OccEndpointsService).buildUrl('product', { urlParams: { productCode: '123' } });
```

To inspect every configured OCC endpoint at runtime, log the merged config (see the `configuration` skill for the full debug flow):

```typescript
inject(ConfigurationService).unifiedConfig$.subscribe((c) =>
  console.log(c.backend?.occ?.endpoints)
);
```

## Source reference (in `node_modules/@spartacus/*`)

Look at how Product data flows for a complete example, all from `@spartacus/core`:
- `ProductService` — facade
- `ProductConnector` — connector
- `ProductAdapter` — abstract adapter
- `OccProductAdapter` — OCC implementation
- `OccEndpointsService`, `ConverterService`, `PRODUCT_NORMALIZER` — supporting tokens

---

# CMS Component Wiring

## Rule

Components are rendered because the **CMS backend** places a component type in a page slot — NOT because they appear in an Angular route definition. NEVER add components to Angular route configurations; otherwise their content won't be automatically CMS-driven (the CMS backoffice can't place, hide, or reorder them).

## How to register a component

Map your component to a CMS component type:

```typescript
provideConfig({
  cmsComponents: {
    MyCmsComponentType: {
      component: MyComponent,
    },
  },
})
```

## How to override an existing component

Map the same CMS type to your custom component. Prefer **extending** the original class over copying it (see the `extending-spartacus-classes` skill):

```typescript
provideConfig({
  cmsComponents: {
    ProductReviewComponent: {
      component: MyCustomProductReviewComponent,
    },
  },
})
```

## CMS Component Data

CMS components receive their CMS-managed data via `CmsComponentData<T>` injection:

```typescript
protected componentData = inject<CmsComponentData<MyCmsModel>>(CmsComponentData);

data$ = this.componentData.data$;
```

## Placing new components on pages

There are three mechanisms — see [references/placement-mechanisms.md](references/placement-mechanisms.md) for the detailed comparison and `cmsStructure` example. Quick summary:

1. **CMS-driven placement (preferred)** — the CMS backoffice places the component in a slot. Just add the `cmsComponents` mapping above; no further code.
2. **Outlets** — `provideOutlet` to insert content at specific points in existing layouts (see the `outlets` skill).
3. **Static `cmsStructure`** — for development/demo without CMS backend changes.

## Anti-pattern

```typescript
// ❌ Adding the component as an Angular route.
// Custom Angular routes are registered before Spartacus's wildcard CMS
// route (the wildcard `**` is appended last, at APP_INITIALIZER time via
// router.config.push). So this route actually *wins* for /recently-viewed
// and bypasses the CMS entirely: the component is no longer CMS-placed,
// the backoffice can't place/hide/reorder it, and you lose the CMS
// page/slot model.
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'recently-viewed', component: RecentlyViewedComponent },
    ]),
  ],
})
export class RecentlyViewedModule {}
```

```typescript
// ✅ Map the component to a CMS component type. The CMS slot decides
// where it appears; no Angular route is required.
@NgModule({
  providers: [
    provideConfig({
      cmsComponents: {
        RecentlyViewedComponent: {
          component: RecentlyViewedComponent,
        },
      },
    }),
  ],
})
export class RecentlyViewedModule {}
```

If the CMS backoffice cannot be changed during development, place the component via `cmsStructure` (mechanism 3) or an outlet. Both keep the page resolving through Spartacus's CMS routing — the `**` wildcard route plus `CmsPageGuard` — so the CMS still decides what renders, instead of adding a parallel Angular route that would bypass it.

## Debugging CMS page structure

If a component isn't appearing, log the CMS structure for the current page — it shows the slots and which component types the CMS placed in each:

```typescript
inject(CmsService).getCurrentPage().subscribe((page) => console.log(page));
```

If your component type isn't listed in any slot, the CMS backoffice hasn't placed it (or the `cmsComponents` mapping name doesn't match the CMS component type).

## Source reference (in `node_modules/@spartacus/*`)

- `CmsConfig`, `provideConfig`, `CmsComponentData`, `CmsService` from `@spartacus/core`.
- `BannerModule`, `OutletDirective` from `@spartacus/storefront`.

# CMS Component Placement — Three Mechanisms

There are three ways to make a component appear on a Spartacus page. Pick whichever suits the situation.

## 1. CMS-driven placement (preferred)

The CMS backoffice places the component in a slot on a page template. No code is needed beyond the `cmsComponents` mapping that connects the CMS component type to your Angular component class:

```typescript
provideConfig({
  cmsComponents: {
    MyCmsComponentType: {
      component: MyComponent,
    },
  },
})
```

This is the canonical mechanism: the CMS backoffice decides where, when, and on which pages the component is rendered, and the Angular code never has to be modified to move it. Use this whenever the CMS team can configure the slot.

## 2. Outlets

Use `provideOutlet` to insert content at specific points in existing Spartacus page layouts (e.g. add a trust badge under the add-to-cart button on every PDP):

```typescript
import { provideOutlet, OutletPosition } from '@spartacus/storefront';

provideOutlet({
  id: 'AddToCart',
  position: OutletPosition.AFTER,
  component: TrustBadgesComponent,
})
```

See the `outlets` skill for the full surface (positions, `cxOutletRef`, finding outlet IDs, and when CMS mapping is the right tool instead).

## 3. Static `cmsStructure` (for development/demo without CMS backend changes)

When you need a CMS slot but can't change the CMS backoffice (local development, a demo branch, or a fixture in tests), use `cmsStructure` in config to declare a page layout and slot in code:

```typescript
provideConfig({
  cmsStructure: {
    pages: [{
      pageId: 'my-custom-page',
      template: 'ContentPage1Template',
      slots: {
        Section1: { componentTypes: ['MyCmsComponentType'] }
      }
    }]
  }
})
```

This synthesizes a CMS page locally so the wildcard route + `CmsPageGuard` can resolve `/my-custom-page` and render `MyCmsComponentType` in the `Section1` slot. The synthesized structure overrides anything the CMS backend would return for the same `pageId`, so revert to mechanism 1 once the CMS team has configured the real page.

---

# Routing & Configurable URLs

## Rule — Generating links

NEVER hardcode `routerLink="/some-path"`. Use the `cxUrl` pipe with a semantic route name:

```html
<a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">
  {{ product.name }}
</a>
```

`cxUrl` reads the live `RoutingConfig`, so the link follows the configured URL **pattern** and param mapping — if the storefront later changes a route's path, your links update automatically.

> The locale / site-context prefix (e.g. `/en/USD/…`) is added separately by Spartacus's `SiteContextUrlSerializer` for **every** serialized URL, whether or not it came from `cxUrl`. So the prefix is not the reason to use `cxUrl`; following the configured route pattern and param mapping is.

## Rule — CMS-driven page routing

Spartacus uses a wildcard route (`path: '**'`) backed by `CmsPageGuard`, appended **last** at startup (in an `APP_INITIALIZER` that does `router.config.push(...)`). The CMS backend then resolves the page and components for any URL the wildcard matches. Don't add ordinary Angular routes for pages whose content the CMS should control: because a custom route is registered *before* the wildcard, it actually **wins** and bypasses the CMS — the component is rendered by your route instead of being CMS-placed, so the backoffice can't place, hide, or reorder it.

## Changing the URL pattern of an existing page

Configure `RoutingConfig`. `ConfigurableRoutesService` rewrites the Angular router config at startup from this map.

```typescript
import { RoutingConfig } from '@spartacus/core';

provideConfig({
  routing: {
    routes: {
      product: {
        paths: ['p/:productCode/:slug', 'p/:productCode'],
        paramsMapping: { slug: 'name' },
      },
    },
  },
})
```

- `paths` — multiple entries are allowed, but keep the list short; multiple aliases are discouraged. For URL generation `cxUrl` uses the **first** path whose required params are all available on the `params` object, falling back to the next alias when they aren't. Any listed path is accepted for inbound navigation, so older patterns can stay for backward compatibility.
- `paramsMapping` — when generating a URL with `cxUrl`, this maps URL placeholders to properties on the `params` object. `{ slug: 'name' }` means `:slug` is filled from `params.name`.

## Adding a custom CMS-driven route with a dynamic param

Sometimes you need a brand-new page whose content is CMS-driven AND whose URL contains a dynamic segment (e.g. `/my-account/trade-in/:tradeInId`). The wildcard `**` route can't capture the param, so you add an explicit Angular route entry — but you wire it through Spartacus's CMS plumbing rather than rendering a custom component.

1. Create a CMS content page in the backoffice with a unique URL prefix, e.g. `/my-account/trade-in`.
2. Add a `RoutingConfig` entry that names the route and declares its dynamic path:

   ```typescript
   provideConfig({
     routing: { routes: { tradeIn: { paths: ['my-account/trade-in/:tradeInId'] } } },
   });
   ```

3. Add an Angular route with `path: null` (so `RoutingConfig` controls the path), `data.cxRoute` matching the route name, `component: PageLayoutComponent`, and `canActivate: [CmsPageGuard]`:

   ```typescript
   import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

   const routes: Routes = [
     {
       path: null as any,
       data: { cxRoute: 'tradeIn' },
       component: PageLayoutComponent,
       canActivate: [CmsPageGuard],
     },
   ];
   ```

`CmsPageGuard` will load the CMS content for `/my-account/trade-in` and `:tradeInId` is available via `RoutingService.getRouterState()`. Spartacus uses exactly this pattern for routes with names `orders`, `orderDetails`, and similar feature pages.

For access control, don't add extra guards (like `AuthGuard`) onto the `Route` object — prefer CMS-component-driven guards configured on the CMS page/component (via the `guards` property in `cmsComponents`), so protection stays CMS-driven and consistent with the rest of the page.

## Common route names

`product`, `category`, `brand`, `search`, `cart`, `orders`, `orderDetails`, `orderGuest`, `login`, `register`, `logout`, `checkout`, `checkoutDeliveryAddress`, `checkoutPaymentType`, `checkoutReviewOrder`.

Routing config is contributed by every installed feature lib's `*RootModule` (eagerly), e.g. `@spartacus/order/root` adds `orders`, `orderDetails`, `orderGuest`. To list every named route at runtime, log `config.routing.routes` once the app has bootstrapped.

## Anti-pattern

```html
<!-- ❌ Hardcoded path — breaks when the storefront reconfigures the route -->
<a routerLink="/cart">View cart</a>
<a [routerLink]="['/product', product.code]">{{ product.name }}</a>
```

```html
<!-- ✅ cxUrl pipe — resolves the configured route path from RoutingConfig -->
<a [routerLink]="{ cxRoute: 'cart' } | cxUrl">View cart</a>
<a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">{{ product.name }}</a>
```

## Source reference (in `node_modules/@spartacus/*`)

- `RoutingConfig`, `ConfigurableRoutesService`, `UrlPipe` (`cxUrl`), `RoutingService` from `@spartacus/core`.
- `PageLayoutComponent`, `CmsPageGuard` from `@spartacus/storefront`.
- Per-feature defaults (e.g. `defaultOrderRoutingConfig`) ship inside their feature root, e.g. `@spartacus/order/root`.

---

# Configuration System

## Rule

In your app, ALWAYS use `provideConfig()`. NEVER use `provideDefaultConfig()` — that is for Spartacus library internals only.

## How it works

Spartacus deep-merges every config chunk into a single runtime `Config`. `provideConfig` values always win over `provideDefaultConfig` values. Arrays are overwritten, not merged.

## Where to put `provideConfig`

Default to the **root injector** (an eagerly imported module). That is the only place where the config is guaranteed to be available before any consumer reads it.

A config chunk is fine to declare in a lazy-loaded wrapper module **if and only if everything that reads it lives inside that same lazy chunk**. Values placed in a lazy chunk are merged into the root `Config` only at the moment the chunk loads, so the root and other lazy modules can't read them until then. Facades cross module boundaries; config does not.

The two canonical examples are `cmsComponents` mappings and `backend.occ.endpoints` — both are consumed only by code inside the chunk that provides them (the CMS component the mapping points at, the adapter that calls the endpoint). The same principle covers anything else you add that's scoped to one lazy feature: a feature-specific subtree under `featureToggles`, a custom config namespace your feature owns, OCC URL parameters that only one feature's connector uses, and so on. If the consumer is in the same chunk, lazy placement is fine.

Everything that's read app-wide — `i18n`, `routing`, app-level `featureToggles`, `siteContext`, `auth`, `view`, etc. — must be eager. A lazy chunk means the value is absent during bootstrap and absent on the first render that needs it.

## OCC endpoint configuration

```typescript
provideConfig({
  backend: {
    occ: {
      endpoints: {
        product: 'products/${productCode}?fields=DEFAULT,customField',
      }
    }
  }
})
```

## CMS component mapping

```typescript
provideConfig({
  cmsComponents: {
    ProductReviewComponent: {
      component: MyCustomComponent,
    },
  },
})
```

## i18n configuration

```typescript
provideConfig({
  i18n: {
    resources: myTranslations,
    chunks: myTranslationChunks,
  },
})
```

## Anti-pattern

```typescript
// ❌ provideDefaultConfig is reserved for Spartacus library code.
// In an app you build, library defaults will sit at the SAME merge level
// as your override, so the merge result is undefined and depends on
// provider order.
@NgModule({
  providers: [
    provideDefaultConfig({
      backend: { occ: { endpoints: { product: 'products/${productCode}?fields=FULL' } } },
    }),
  ],
})
export class AppOccConfigModule {}
```

```typescript
// ✅ provideConfig — guaranteed to win over any provideDefaultConfig.
@NgModule({
  providers: [
    provideConfig({
      backend: { occ: { endpoints: { product: 'products/${productCode}?fields=FULL' } } },
    }),
  ],
})
export class AppOccConfigModule {}
```

## Troubleshooting — "my config isn't applied"

When a config value isn't taking effect at runtime, see [references/troubleshooting.md](references/troubleshooting.md) for the full debug flow (live-config logging plus the three common root causes).

## Source reference (in `node_modules/@spartacus/*`)

- `provideConfig`, `provideDefaultConfig`, `Config` from `@spartacus/core`.
- Example default config (OCC user endpoints) ships inside `@spartacus/core`.

# Troubleshooting — "My Spartacus Config Isn't Applied"

When a `provideConfig` value isn't taking effect, it's almost always one of three things. Inspect the live config first, then walk the checklist.

## 1. Inspect the merged runtime config

```typescript
import { inject } from '@angular/core';
import { ConfigurationService } from '@spartacus/core';

inject(ConfigurationService).unifiedConfig$.subscribe((cfg) => console.log(cfg));
```

`unifiedConfig$` emits the deep-merged result of every `provideConfig` and `provideDefaultConfig` call resolved so far. Lazy-loaded modules contribute config chunks only after they are loaded, and `unifiedConfig$` emits again every time a lazy module loads. So log at the moment the broken consumer runs (component constructor, `ngOnInit`, service usage), not just at app startup.

> Lazy loading is what makes config timing tricky here — see the `lazy-loading` skill for how Spartacus loads feature modules on demand.

## 2. Walk the three common causes

### a. The key isn't in the merged config at all

Your `provideConfig` is not running — the providing module is not imported, or it's tree-shaken because nothing references it. Make sure the wrapper module is imported by `AppModule` (or by the lazy module the app actually loads). If you grep for the providing module name and find no `imports: [...YourConfigModule...]` site, that's the answer.

### b. A different chunk overrides yours under the same deep key

Two `provideConfig` calls with the same deep key — the one whose multi-provider runs last wins. Search the workspace for the key (e.g. `endpoints: {...product`) and decide which copy is canonical.

Common culprits:
- A schematics-generated config module (e.g. `spartacus-features.module.ts`) that you forgot was setting the same key.
- An older copy of the config left over after a refactor.
- A library you depend on that ships its own `provideConfig` for the same key.

### c. The value lives behind a lazy boundary

If you put it in a lazy wrapper module, it appears in the unified config only after that chunk loads. Force-load every lazy feature and re-log; if the value now appears, it was inside that lazy module. The simplest trigger is to navigate to a CMS page that uses the feature, but from devtools you can also force every feature module to load (verify this in your app before relying on it):

```typescript
import { firstValueFrom } from 'rxjs';
import { CmsConfig, FeatureModulesService } from '@spartacus/core';

async function forceLoadAllFeatureModules(
  cmsConfig: CmsConfig,
  featureModulesService: FeatureModulesService
): Promise<void> {
  const featureModules = cmsConfig.featureModules ?? {};
  const promises: Promise<unknown>[] = [];
  for (const [name, config] of Object.entries(featureModules)) {
    if (typeof config === 'string' || !(config as any)?.module) continue;
    promises.push(
      firstValueFrom(featureModulesService.resolveFeature(name)).catch((err) =>
        console.warn(`Failed to load ${name}:`, err)
      )
    );
  }
  await Promise.all(promises);
}

// In an injection context (e.g. a devtools breakpoint or a throwaway component):
await forceLoadAllFeatureModules(inject(CmsConfig), inject(FeatureModulesService));
```

Once everything is loaded, decide whether lazy placement is actually right:

- Lazy placement is legitimate when **every consumer of the value lives in the same lazy chunk** — the canonical cases are `cmsComponents` mappings and `backend.occ.endpoints`, but the rule applies to any feature-scoped section you add (a feature-specific `featureToggles` subtree, a custom config namespace owned by that feature, etc.).
- Move it to an eager module if it's read app-wide — e.g. `i18n`, `routing`, app-level `featureToggles`, `siteContext`, `auth`, `view` — so the value is present from bootstrap and not just after a particular chunk happens to load.

## 3. Which exact module ran last?

If two chunks have the same key and you can't tell which is winning, make each provider observable. The merge order is provider-list order at runtime, which usually mirrors `imports: [...]` order in the parent module.

The easiest approach is to swap `provideConfig(value)` for `provideConfigFactory(factory)` temporarily, so you can log (or breakpoint) as each chunk contributes:

```typescript
import { provideConfigFactory } from '@spartacus/core';

provideConfigFactory(() => {
  console.log('[OCC config from feature X]');
  return { backend: { occ: { endpoints: { product: '...' } } } };
});
```

The chunk that logs **last** is the one that wins for the shared key.

---

# Correct Injector Placement

## Rule

Where you provide a customization (service override, component mapping, config) determines whether it works.

## For lazy-loaded features

Your override MUST go in the **wrapper module** for that feature. If you put it in `AppModule` or `SpartacusFeaturesModule`, the feature's child injector won't see it — the original provider in the child injector takes precedence.

```typescript
@NgModule({
  imports: [CheckoutModule, MyCustomCheckoutExtensionsModule],
})
export class CheckoutWrapperModule {}
```

If a wrapper module doesn't exist in the app for a lazy-loaded feature, create one.

Check existing wrapper modules in `src/app/spartacus/features/` — they follow the pattern `*-wrapper.module.ts`.

## For eager-loaded features

Override goes in the **root injector** (e.g., `AppModule` providers).

## Service override pattern

```typescript
providers: [
  { provide: OriginalSpartacusService, useClass: MyCustomService },
]
```

This provider MUST be in the wrapper module if the feature is lazy-loaded.

## Discovering which features are lazy-loaded

To find every lazy-loaded feature wired up in this app, search the workspace for `provideConfig` calls whose `featureModules.<NAME>.module` is a dynamic `import()`:

```typescript
provideConfig({
  featureModules: {
    checkout: { module: () => import('./checkout-wrapper.module').then((m) => m.CheckoutWrapperModule) },
  },
});
```

Or, at runtime, log the feature map. `featureModules` keys are registered eagerly in the root injector, so the static merged config already has them — no need to wait on `unifiedConfig$`:

```typescript
import { CmsConfig } from '@spartacus/core';

console.log(Object.keys(inject(CmsConfig).featureModules ?? {}));
```

Each key is the feature name; the value's `module` is its lazy entry point. The wrapper module those imports point at is where overrides for that feature must go.

## Where overrides live in this app

- Wrapper modules in this app live under `src/app/spartacus/features/`, one per lazy-loaded feature, named `*-wrapper.module.ts` (or `*-feature.module.ts`).

---

# Check Existing Features

## Rule

Before implementing a feature, ALWAYS check whether Spartacus already provides it out of the box.

## Where to look

1. `node_modules/@spartacus/` — every installed Spartacus package. List them with:

   ```bash
   ls node_modules/@spartacus/
   ```

   Then read each package's `README.md` and `package.json#description` for the feature surface it ships.

2. `src/app/spartacus/features/` — feature modules already configured in this app. If a `*-feature.module.ts` exists, the feature is already wired up; extend it instead of starting fresh.

3. If `node_modules/@spartacus/<feature>` is missing, Spartacus may still offer the feature as an installable library — it's just not added to this app yet. Inspect the installable feature list in the schematic schema:

   ```bash
   cat node_modules/@spartacus/schematics/src/add-spartacus/schema.json | jq '.properties.features.items.enum'
   ```

   If the feature is listed, install it via `ng add @spartacus/schematics --features <FeatureName>` (or the feature lib's own `ng add`, e.g. `ng add @spartacus/order`) and follow the official setup docs. After install it appears under `node_modules/@spartacus/` and `src/app/spartacus/features/`.

## If the feature exists

**Extend or customize it** rather than building from scratch (see the `cms-component-wiring` and `extending-spartacus-classes` skills for how).

## If the feature doesn't exist

Build it, reaching for the specific skill that matches each part of the task — e.g. `backend-communication` for data access, `cms-component-wiring` for placement, `lazy-loading` for a new feature module.

---

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

Most Spartacus components are `OnPush`, so keep `OnPush` on your subclass. A few intentionally use `ChangeDetectionStrategy.Default` (e.g. `ActiveFacetsComponent`, several product-configurator components) and their children may rely on the parent being checked on every event — when subclassing one of those, keep its original strategy unless you have verified the children handle `OnPush`.

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

## Source reference (in `node_modules/@spartacus/*`)

- `AddToCartComponent` from `@spartacus/cart/base/components/add-to-cart`
- `ProductService` from `@spartacus/core`
- `MiniCartComponent` from `@spartacus/storefront`

---

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

These are what people usually mean by "Spartacus Facades". The **underlying service** is the concrete implementation inside the lazy chunk — it's what you override in the feature wrapper module when customizing behavior (see the `extending-spartacus-classes` skill). Discover facades by searching `facadeFactory({ facade:` under `node_modules/@spartacus/*/root`.

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
- For lazy proxy facades (Category 1), adding a new method requires two pieces: extend the abstract Facade class to declare the method, and override the underlying implementation in the feature's wrapper module so `facadeFactory` forwards calls to your subclass. See the `extending-spartacus-classes` skill.
- For eager core services (Category 2), `useClass` swap in the root injector is enough.

## Source reference (in `node_modules/@spartacus/*`)

- `ActiveCartFacade`, `OrderFacade`, `CheckoutDeliveryAddressFacade`, `UserAccountFacade` — proxy facades from `@spartacus/<feature>/root`.
- `ProductService`, `CmsService`, `RoutingService`, `AuthService` — eager core services from `@spartacus/core`.
- `facadeFactory`, `FacadeFactoryService`, `FacadeDescriptor` from `@spartacus/core` — the lazy-loading plumbing behind Category 1.

---

# Internationalization (i18n)

## Rule

NEVER hardcode user-facing strings in templates. Use the `cxTranslate` pipe with a translation key:

```html
{{ 'myFeature.myLabel' | cxTranslate }}
{{ 'myFeature.greeting' | cxTranslate: { name: user.name } }}
```

Hardcoded strings can't be translated and break the moment a second language is enabled. There is no compile-time error — the regression is silent.

## Registering translations (eager)

Feature modules register translations via `provideConfig`. The simplest form ships everything eagerly with the root bundle:

```typescript
export const myTranslations = {
  myFeature: {
    myLabel: 'My Label',
    greeting: 'Hello, {{name}}!',
  },
};

export const myTranslationChunks = {
  myFeature: ['myFeature'],
};

provideConfig({
  i18n: {
    resources: { en: { myFeature: myTranslations.myFeature } },
    chunks: myTranslationChunks,
  },
})
```

`chunks` maps a namespace key (`myFeature.myLabel` → `myFeature`) to the chunk name that holds it. With eager registration the resources are bundled into the root JS, which is fine for a few small dictionaries.

## Lazy-loaded translations

For larger dictionaries or per-feature translations, configure a backend `loader` so chunks load on demand. The `loader` returns a Promise of the chunk's resources, and a dynamic `import()` lets the bundler code-split each translation file:

```typescript
provideConfig({
  i18n: {
    backend: {
      loader: (lng, chunk) =>
        import(`../assets/i18n-assets/${lng}/${chunk}.json`),
    },
    chunks: myTranslationChunks,
    fallbackLang: 'en',
  },
})
```

Spartacus's `TranslationService` invokes the loader on demand, so a chunk is imported only when a key from that namespace is first rendered. Prefer `backend.loader` over `backend.loadPath` for translations bundled with your app — it's more performant, especially under SSR. `loadPath` (an HTTP path with `{{lng}}`/`{{ns}}` placeholders) is recommended only for loading translations from an external server.

## Anti-pattern

```html
<!-- ❌ Hardcoded user-facing strings — cannot be translated, no chunk loading -->
<button>Add to wishlist</button>
<h2>Recently viewed products</h2>
```

```html
<!-- ✅ cxTranslate pipe + translation chunk -->
<button>{{ 'wishlist.addAction' | cxTranslate }}</button>
<h2>{{ 'recentlyViewed.title' | cxTranslate }}</h2>
```

## Debugging translations

If a key shows up untranslated (renders the raw key, or the fallback), turn on i18n debug logging — it logs every lookup, which chunks load, and missing keys to the console:

```typescript
provideConfig({ i18n: { debug: true } }) // never enable in production
```

To test a single key resolves at runtime:

```typescript
inject(TranslationService).translate('myFeature.myLabel').subscribe(console.log);
```

## Source reference (in `node_modules/@spartacus/*`)

- `TranslatePipe` (`cxTranslate`), `TranslationService`, `I18nConfig` from `@spartacus/core`.
- Default translation chunks ship from `@spartacus/assets` and `@spartacus/*/assets`.

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

---

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

> The `declare module` augmentation only takes effect once this file is **imported somewhere in the app** so TypeScript (and the bundler) actually include it. Import it from the module that registers the normalizer below — e.g. `import './model/product.model';` at the top of that module file. An augmentation in a file nothing imports is silently dropped.

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

## Source reference (in `node_modules/@spartacus/*`)

- `Converter`, `ConverterService`, `PRODUCT_NORMALIZER` from `@spartacus/core`.
- Default product normalizers ship inside `@spartacus/core` (`occ` adapters).
- Injector correctness: see the `correct-injector` skill — register normalizers in the feature wrapper module for lazy features, or in the root injector for eager ones.

---

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

## Source reference (in `node_modules/@spartacus/*`)

- `OutletService`, `provideOutlet`, `OutletPosition`, `OutletDirective`, `OutletRefDirective` all from `@spartacus/storefront`.

---

# SSR Safety — Browser-Only Code

## Rule

If this app was installed with `--ssr` (or set up via `ng add @spartacus/setup --ssr`), it runs Server-Side Rendering in production. A single unguarded `window.something` reference crashes the server render: the initial SSR HTML comes back blank, then transitions to the CSR page after a delay. First paint is delayed, Core Web Vitals suffer, and SEO crawling sees the blank page.

If a component or service uses `window`, `document`, `localStorage`, `sessionStorage`, `IntersectionObserver`, `navigator`, a browser-only third-party widget (maps, analytics, chat, video players), or any API that doesn't exist in Node — guard the browser-only code with `WindowRef.isBrowser()`.

## Guard with `WindowRef.isBrowser()` (preferred)

`WindowRef` is the Spartacus-idiomatic way to check the platform and reach `window`/`document`/storage. Internally it uses Angular's `isPlatformBrowser`, but it exposes one consistent API and pairs `isBrowser()` with `nativeWindow`, `nativeDocument`, `localStorage`, and `sessionStorage` accessors that are SSR-safe.

```typescript
import { WindowRef } from '@spartacus/core';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent implements OnInit {
  private winRef = inject(WindowRef);

  ngOnInit() {
    if (!this.winRef.isBrowser()) return;
    const stored = this.winRef.localStorage?.getItem('recentlyViewed') ?? '[]';
    this.loadProducts(JSON.parse(stored));
  }
}
```

The component renders on the server with empty/default state, then hydrates and fills in browser-only data on the client.

## Last-resort: `disableSSR`

```typescript
provideConfig({
  cmsComponents: {
    MyBrowserOnlyComponent: {
      component: MyBrowserOnlyComponent,
      disableSSR: true,
    },
  },
})
```

`disableSSR: true` prevents the component from rendering on the server; the slot is empty in the SSR HTML and only fills in once the CSR app boots.

AVOID `disableSSR` on publicly crawlable pages — the SSR-to-CSR transition causes a visible flicker, hurts the CLS Core Web Vital (which impacts SEO), and removes the content from the server-rendered HTML that crawlers read. Reach for it only when the component has no useful server-rendered fallback at all (e.g. a third-party live-chat widget, a client-only map). For everything else, use `WindowRef.isBrowser()` so the component still renders meaningful default markup on the server.

## Source reference (in `node_modules/@spartacus/*`)

- `WindowRef` from `@spartacus/core` — `isBrowser()`, `nativeWindow`, `nativeDocument`, `localStorage`, `sessionStorage`.
- `disableSSR` is handled by `ComponentWrapperDirective` in `@spartacus/storefront`.

---

# State Management

## Rule

Spartacus uses two state management patterns. When customizing a feature, MATCH the pattern used by the existing Spartacus code in that feature. Do NOT introduce a third pattern (e.g., plain `BehaviorSubject` or custom state services).

## NgRx pattern

Actions, Effects, Reducers, Selectors. Facades dispatch actions and select from the store. Effects call connectors.

Used by: **Product, Cart, CMS, Auth, Site Context**

## Commands/Queries pattern

`CommandService` and `QueryService` replace NgRx for newer features. Commands wrap imperative operations; Queries hold `QueryState<T>` with loading/error/data.

Used by: **Checkout, User Account, User Profile, Quote, Customer Ticketing**

### Command example

```typescript
protected myCommand: Command<Payload, Result> = this.commandService.create(
  (payload) =>
    this.userIdService.takeUserId(true).pipe(
      switchMap((uid) => this.myConnector.doSomething(uid, payload))
    ),
  { strategy: CommandStrategy.Queue }
);
```

### Query example

```typescript
protected myQuery: Query<MyData> = this.queryService.create(
  () => this.userIdService.takeUserId(true).pipe(
    switchMap((userId) => this.myConnector.getData(userId))
  ),
  { reloadOn: [MyDataChangedEvent], resetOn: [LoginEvent, LogoutEvent] }
);
```

## How to detect which pattern a feature uses

Look at the facade's service implementation in `node_modules/@spartacus/`:
- If it dispatches NgRx actions and selects from store → NgRx
- If it uses `CommandService`/`QueryService` → Commands/Queries

## Anti-pattern

```typescript
// ❌ Hand-rolled BehaviorSubject for a feature that already has a facade.
//    No caching across components, no integration with reloadOn/resetOn
//    events, no replay for late subscribers, no SSR transfer-state.
@Injectable({ providedIn: 'root' })
export class GiftCardService {
  private http = inject(HttpClient);
  private balance$ = new BehaviorSubject<number | null>(null);

  load(userId: string) {
    this.http
      .get<{ balance: number }>(`/occ/v2/users/${userId}/giftcard`)
      .subscribe((res) => this.balance$.next(res.balance));
  }

  getBalance(): Observable<number | null> {
    return this.balance$.asObservable();
  }
}
```

```typescript
// ✅ Query — declarative, deduped, integrates with the event system.
//    Resets on logout, reloads when the gift-card balance event fires.
@Injectable({ providedIn: 'root' })
export class GiftCardFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected giftCardConnector = inject(GiftCardConnector);

  protected balanceQuery: Query<number> = this.queryService.create(
    () =>
      this.userIdService
        .takeUserId(true)
        .pipe(switchMap((uid) => this.giftCardConnector.getBalance(uid))),
    { reloadOn: [GiftCardChangedEvent], resetOn: [LogoutEvent] },
  );

  getBalance(): Observable<number> {
    return this.balanceQuery.get().pipe(filter((v): v is number => v != null));
  }
}
```

A new `BehaviorSubject` (or hand-written cache class) is almost always the wrong answer in Spartacus — it competes with the existing NgRx store and the Commands/Queries layer instead of plugging into them. Reach for one only when the feature truly has no facade and you have ruled out NgRx and Commands/Queries.

## Source reference (`@spartacus/*` libs in `node_modules`, not your app code)

- `CommandService`, `QueryService`, `CommandStrategy`, `Command`, `Query` from `@spartacus/core`.
- `CheckoutQueryService` (Commands/Queries example) from `@spartacus/checkout/base/core`.

---

# Styling / CSS Architecture

## Rule

There are two cases. They have different rules.

### Case A — Tweaking a Spartacus OOTB component

The component already exists in `@spartacus/storefront` or a feature lib, with a `cx-*` selector. You are restyling it without rewriting it. Use **global SCSS** targeting the same `cx-*` selector:

```scss
// src/styles/cx-mini-cart.scss  (one file per component you override)
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count {
    font-weight: 700;
  }
}
```

Why global, not component-scoped? Spartacus's OOTB `@Component`s declare **no** `styles`/`styleUrls` — they are styled entirely by the global SCSS that ships in `@spartacus/styles` (keyed on `cx-*` selectors and `--cx-*` custom properties). So your overrides belong at that same global level, where they sit in the same cascade and can read the `--cx-*` variables. Don't try to override the styling by subclassing the component and adding component-scoped `styleUrls`: Angular's emulated encapsulation scopes those styles to your subclass's own view, so they don't reach the nested `cx-*` children that the component composes (and you'd need a CMS remap just to inject styling).

Keep one SCSS file per component you override (e.g. `cx-mini-cart.scss`, `cx-page-layout.scss`) rather than piling everything into a single `_overrides.scss`.

### Case B — Brand-new custom component

The component is yours, lives under your own selector (`app-*`), and renders content the CMS doesn't already own. Here either approach works — pick one and stay consistent across the app:

- **Component-scoped styles** (`styleUrls` / `styles`) are fine. They keep CSS local and avoid polluting the global cascade.
- **Global SCSS** scoped by the component's element selector is also fine, and is what Spartacus itself uses.

```typescript
@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent {}
```

Do NOT use the `cx-` prefix for your custom components — that prefix is reserved for Spartacus.

## How to customize Spartacus theme

Override SCSS variables or CSS custom properties. Do NOT copy components just to change styles.

```scss
// Override SCSS variables before importing Spartacus styles
$primary: #1B2A4A;

// Or override CSS custom properties
:root {
  --cx-color-primary: #1B2A4A;
  --cx-color-accent: #00D4AA;
}
```

## Anti-pattern

```typescript
// ❌ Subclassing a Spartacus @Component just to add component-scoped styles.
//    Emulated encapsulation scopes them to this view, so they don't reach
//    the nested cx-* children, and you've added a CMS remap purely for CSS.
@Component({
  selector: 'cx-mini-cart',
  templateUrl: './my-mini-cart.component.html',
  styleUrls: ['./my-mini-cart.component.scss'],
})
export class MyMiniCartComponent extends MiniCartComponent {}
```

```scss
// ✅ src/styles/cx-mini-cart.scss — global, scoped via the cx-* selector,
//    at the same cascade level as @spartacus/styles.
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count { font-weight: 700; }
}
```

## Source reference (in `node_modules/@spartacus/*`)

- Global styles ship from `@spartacus/styles` (e.g. `@spartacus/styles/index`, `@spartacus/styles/scss/theme/sparta`).
- Per-feature styles ship from each feature lib's `/styles` subpath, e.g. `@spartacus/cart/base/styles`, `@spartacus/checkout/base/styles`.

---

# RxJS Subscriptions in Components and Services

## Rule

In templates, ALWAYS use the `async` pipe. In TypeScript, AVOID `.subscribe()` unless you have a true imperative side effect that cannot be expressed declaratively.

`.subscribe()` is acceptable for:

1. **Form initialization from a one-shot Query** with `take(1)` or `first()`.
2. **Navigation** (`router.navigate(...)`) triggered by an event stream.
3. **Showing a global UI message** (toast, dialog) on a one-off event.
4. **Pure side effects that don't drive the view** (logging, analytics, telemetry, persisting to storage).

`.subscribe()` is NEVER acceptable for:

1. Copying a stream value into a component property "so the template can read it" — use `async` pipe.
2. Driving state that the template displays — use `async` pipe over a derived stream.
3. Calling `cd.markForCheck()` from inside a `.subscribe()` callback — that's the framework telling you the state should have been a stream.

For concrete before/after examples of each unacceptable pattern, see [references/anti-patterns.md](references/anti-patterns.md).

## Acceptable patterns — don't "fix" these

### ✅ Form initialization from a one-shot Query

```typescript
ngOnInit(): void {
  this.deliveryInstructionsService
    .getDeliveryInstructions()
    .pipe(take(1))
    .subscribe((instructions) => {
      this.form.patchValue(instructions);
    });
}
```

Forms are inherently imperative; `take(1)` makes the stream complete itself, so no `takeUntil` needed. This is the canonical escape hatch — leave it alone.

### ✅ Navigation triggered by an event

```typescript
this.cartEvents.add$
  .pipe(takeUntilDestroyed())
  .subscribe(() => this.router.navigate(['/cart']));
```

Side effect with no view state, no `markForCheck()` — fine.

## Unsubscription

If you must `.subscribe()` and the stream isn't self-completing (`take`, `first`, HTTP):

- **Use** `.pipe(takeUntilDestroyed())` from `@angular/core/rxjs-interop`. It uses Angular's `DestroyRef`, so no `Subscription` field and no `ngOnDestroy` are needed.
- **Avoid** `takeUntil(this.destroy$)` with a manually-managed `Subject` — `takeUntilDestroyed` does the same thing without the boilerplate.

```typescript
private eventService = inject(EventService);

constructor() {
  this.eventService
    .get(ProductDetailsPageEvent)
    .pipe(takeUntilDestroyed())
    .subscribe((event) => event.code && this.addProductCode(event.code));
}
```

`takeUntilDestroyed()` reads the current `DestroyRef` in a constructor or other injection context, so the subscription completes when the component is torn down — no field, no `ngOnDestroy`.

## Singleton services and SSR

The same discipline matters even more in `providedIn: 'root'` (singleton) services. Under SSR a fresh injector is created and destroyed for **every** request, so a long-lived subscription that's never torn down keeps the whole request's injector (and everything it captured) alive — a memory leak that grows with traffic on the server. In a service, tie the subscription to the injector lifetime the same way:

```typescript
@Injectable({ providedIn: 'root' })
export class MyService {
  constructor() {
    this.someEvent$.pipe(takeUntilDestroyed()).subscribe(/* ... */);
  }
}
```

(Or implement `ngOnDestroy` in the service and unsubscribe there — services have lifecycle hooks too.)

## Source reference (in `node_modules/@spartacus/*`)

- `EventService` from `@spartacus/core`.
- `LaunchDialogService` from `@spartacus/storefront`.
- `takeUntilDestroyed` from `@angular/core/rxjs-interop`.

📖 [Angular: takeUntilDestroyed](https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed) · [RxJS: switchMap](https://rxjs.dev/api/operators/switchMap)

# Subscription Anti-Patterns (Real Cases)

Three patterns that come up repeatedly in Spartacus customizations, each with a paired fix.

## ❌ Subscribing to copy data into a property

```typescript
ngOnInit(): void {
  this.subscription.add(
    this.launchDialogService.data$.subscribe((data) => {
      if (data?.product) {
        this.product = data.product;
      }
    })
  );
}
```

`this.product` is read by the template — that's exactly what `async` pipe is for. With `OnPush`, the assignment also won't trigger CD on its own, so this is subtly broken in addition to being verbose.

✅ Fix:

```typescript
product$ = this.launchDialogService.data$.pipe(
  map((data) => data?.product),
  filter(Boolean),
);
```

```html
<ng-container *ngIf="product$ | async as product">
  <!-- ... -->
</ng-container>
```

## ❌ `.subscribe()` + `markForCheck()` after a Command

```typescript
redeem(value: number): void {
  this.subscription.add(
    this.loyaltyFacade.redeemPoints(value).subscribe({
      next: (result) => {
        this.redemption = result;
        this.cd.markForCheck();
      },
      error: () => {
        this.redeemError = true;
        this.cd.markForCheck();
      },
    })
  );
}
```

Every `markForCheck()` is the framework saying "you're working around OnPush". `redemption` and `redeemError` should be emissions on a stream, not mutable fields.

✅ Fix:

```typescript
private redeemTrigger$ = new Subject<number>();

redeemResult$ = this.redeemTrigger$.pipe(
  switchMap((value) =>
    this.loyaltyFacade.redeemPoints(value).pipe(
      map((result) => ({ result, error: false, pending: false } as const)),
      catchError(() => of({ result: null, error: true, pending: false } as const)),
      startWith({ result: null, error: false, pending: true } as const),
    ),
  ),
);

redeem(value: number): void {
  this.redeemTrigger$.next(value);
}
```

Template binds `redeemResult$ | async`; `markForCheck()` disappears, `Subscription` field disappears, `ngOnDestroy` disappears.

## ❌ Manual `Subscription` field + `ngOnDestroy` unsubscribe

```typescript
private subscription = this.eventService
  .get(ProductDetailsPageEvent)
  .subscribe((event) => event.code && this.addProductCode(event.code));

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```

The `Subscription` field and the lifecycle hook are pure boilerplate.

✅ Fix:

```typescript
private eventService = inject(EventService);

constructor() {
  this.eventService
    .get(ProductDetailsPageEvent)
    .pipe(takeUntilDestroyed())
    .subscribe((event) => event.code && this.addProductCode(event.code));
}
```

`takeUntilDestroyed()` reads the current `DestroyRef` in a constructor or other injection context, so the subscription completes when the component is torn down — no field, no `ngOnDestroy`.


## Quick Reference

Backend, routing, and lazy loading:
- NEVER use `HttpClient` directly in components or generic services — use the Adapter pipeline.
- NEVER add Angular routes for CMS-managed pages — components are placed by the CMS.
- NEVER define new Angular routes to change URL patterns — use `RoutingConfig`.
- NEVER use `loadChildren` — Spartacus has its own CMS-driven lazy loading.

Templates and styling:
- NEVER hardcode user-facing strings — use the `cxTranslate` pipe.
- NEVER hardcode router links — use the `cxUrl` pipe.
- For brand-new custom components, component-scoped styles are fine; for tweaking Spartacus OOTB components, use global SCSS so `@spartacus/styles` overrides win.

State and customization:
- NEVER inject `Store<...>` for Spartacus state — inject the corresponding Spartacus service.
- NEVER omit `multi: true` when registering normalizers — it wipes out the default converter chain.
- AVOID copying Spartacus source code; extend the class first, copy only when no public hook exists.

Components and SSR:
- ALWAYS use `ChangeDetectionStrategy.OnPush` on new components, paired with the `async` pipe (preserve `Default` when extending a Spartacus component that uses it).
- AVOID `.subscribe()` in components when the data drives the template; if you reach for `markForCheck()`, the data should be a stream.
- NEVER reference `window`/`document`/`localStorage` without guarding via `WindowRef.isBrowser()`.

Configuration:
- ALWAYS use `provideConfig()` (not `provideDefaultConfig()`)
- ALWAYS check `node_modules/@spartacus/` for existing features before building from scratch.
- PREFER outlets for targeted UI additions; CMS mapping for whole-component replacement.

Debugging:
- Most skills include a short "Debugging" section with copy-paste `console.log` recipes for the non-obvious Spartacus runtime state — resolved OCC endpoints (`backend-communication`), merged config (`configuration`), CMS page structure (`cms-component-wiring`), and translations (`i18n`).
