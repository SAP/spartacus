---
name: configurable-urls
description: Use this skill when changing the URL pattern of an existing Spartacus page, generating router links via the `cxUrl` pipe, or adding a custom CMS-driven route with a dynamic parameter (e.g. `/my-account/trade-in/:id`). Covers `RoutingConfig` and the `path:null` + `cxRoute` + `PageLayoutComponent` + `CmsPageGuard` pattern.
---

<!-- spartacus-version: 221121.7.0 -->

# Routing & Configurable URLs

## Rule — Generating links

NEVER hardcode `routerLink="/some-path"`. Use the `cxUrl` pipe with a semantic route name:

```html
<a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">
  {{ product.name }}
</a>
```

`cxUrl` reads the live `RoutingConfig` so the link follows the configured URL pattern (and the locale prefix, if any).

## Rule — CMS-driven page routing

Spartacus uses a wildcard route (`path: '**'`) backed by `CmsPageGuard`. The CMS backend resolves the page and components for any URL. Don't add ordinary Angular routes for pages whose content the CMS should control — the CMS guard would shadow them and the placement, hiding, or reordering done in the CMS backoffice would have no effect.

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

- `paths` — multiple entries are allowed. The **first** is used for URL generation (what `cxUrl` produces); any match is accepted for inbound navigation. Keep older patterns in the list for backward compatibility.
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

3. Add an Angular route with `path: null` (so `RoutingConfig` controls the path), `data.cxRoute` matching the route name, `component: PageLayoutComponent`, and `canActivate: [CmsPageGuard]` (plus `AuthGuard` if the page is private):

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

`CmsPageGuard` will load the CMS content for `/my-account/trade-in` and `:tradeInId` is available via `RoutingService.getRouterState()`. Spartacus uses exactly this pattern for `orders`, `orderDetails`, and similar feature pages.

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
<!-- ✅ cxUrl pipe — resolves the configured route, including locale prefixes -->
<a [routerLink]="{ cxRoute: 'cart' } | cxUrl">View cart</a>
<a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">{{ product.name }}</a>
```

## Codebase reference

- `RoutingConfig`, `ConfigurableRoutesService`, `UrlPipe` (`cxUrl`), `RoutingService` from `@spartacus/core`.
- `PageLayoutComponent`, `CmsPageGuard` from `@spartacus/storefront`.
- Per-feature defaults (e.g. `defaultOrderRoutingConfig`) ship inside their feature root, e.g. `@spartacus/order/root`.

📖 [Adding and Customizing Routes](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/adding-and-customizing-routes-b427db4.md) · [Configurable Routing](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/configurable-routing-c985fc5.md)
