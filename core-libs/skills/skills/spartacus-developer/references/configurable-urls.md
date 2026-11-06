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
