# Base-Site-Aware Express Handlers

## Rule

Use `configureBaseSiteAwareRoutes` from `@spartacus/setup/ssr/express-base-site` for custom Express endpoints that serve site-specific content, such as `/<baseSite>/llms.txt` or a domain-based `/llms.txt`. These endpoints run entirely in Express, independently of the Angular SSR pipeline. The returned `createBaseSiteAwareRoute` function resolves the base site before calling application code.

Call `configureBaseSiteAwareRoutes` once during server setup and reuse the returned `createBaseSiteAwareRoute` function for participating handlers. It creates Express routes sharing one resolver and its OCC cache; mount each route with `server.use(...)`.

## Validate the application first

Inspect the selected application in the Angular workspace, its build/SSR configuration, and its actual Express server entry point. Confirm that Spartacus SSR is configured; an installed package or an Angular server bootstrap file alone does not establish this.

If Spartacus Express SSR is missing, explain that the endpoint needs this server setup and ask: "Would you like to configure Spartacus SSR as a separate step first?" Wait for the answer before proceeding. Adding handlers does not include silently enabling SSR.

Check that the installed `@spartacus/setup/ssr/express-base-site` exposes `configureBaseSiteAwareRoutes`. If the API is unavailable, report the incompatibility before changing the application; do not invent a replacement or automatically upgrade dependencies.

Look for an existing call to `configureBaseSiteAwareRoutes`, including import aliases or setup in another server module. Reuse its returned `createBaseSiteAwareRoute` function and preserve its options. Do not assume the customer's server file, variables, or workspace project have the names shown below.

## Initial setup using the public API

For both new and existing applications, use `configureBaseSiteAwareRoutes` when adding the requested base-site-aware endpoint. If it is not already configured, import `configureBaseSiteAwareRoutes`, choose its resolution source as described below, and destructure `createBaseSiteAwareRoute` from its result inside the application's server setup. Read HTML only when the chosen OCC address source is `extractFromHtmlMetaTag`. Create and mount only the requested endpoint.

For example, serve a per-site `llms.txt` by adding the following to the existing server file. Keep the named handler at module scope and the `configureBaseSiteAwareRoutes` call and route registration inside `app()` or the equivalent server setup function. Here `indexHtmlContent` is HTML content already read by the SSR server, and `server` is its existing Express application; use the customer's actual bindings. Preserve any existing `configureBaseSiteAwareRoutes` options.

```typescript
import {
  configureBaseSiteAwareRoutes,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr/express-base-site';

export function llmsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.type('text/plain').send(`# Storefront guidance\n> Site: ${baseSite}\n`);
}

const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { extractFromHtmlMetaTag: indexHtmlContent },
});

server.use(
  createBaseSiteAwareRoute({
    route: '/llms.txt',
    handler: llmsHandler,
  })
);
```

The handler body above illustrates site-specific content; replace it with the requested document. Mount with `server.use(...)` at the application root. Supply the suffix `/llms.txt`, since the helper adds the base-site segment. Keep applicable protective middleware ahead of the endpoint, and register it before static handlers that could consume it and before the Angular rendering catch-all.

## Additional handlers reuse `createBaseSiteAwareRoute`

When `createBaseSiteAwareRoute` is already configured, add only the requested handler and reuse that function.

For example, a request to show the current base site needs only a handler that returns the resolved UID. Add the named function and its registration to the same server file, using the type imported above:

```typescript
export function siteInfoHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.json({ baseSite });
}

server.use(
  createBaseSiteAwareRoute({
    route: '/site-info.json',
    handler: siteInfoHandler,
  })
);
```

Use the callback context's `baseSite` when producing site-specific content. A named handler function in the server file is sufficient even for a one-line response; reuse the existing `createBaseSiteAwareRoute` function.

## Choose the base-site resolution source

`pathBaseSiteIds` selects the resolution mode. `withBaseSiteInPath` controls the route shape: `true` (the default) registers `/<baseSite>/llms.txt` for `route: '/llms.txt'`; `false` registers `/llms.txt` and requires OCC resolution.

| | Local UID resolution | OCC resolution |
|---|---|---|
| Selected by | Nonempty `pathBaseSiteIds` | Omitted or empty `pathBaseSiteIds` |
| Matching | The first nonempty path segment must exactly equal a supplied UID; comparison is case-sensitive | Matches sites' `urlPatterns` against the full request URL; with `withBaseSiteInPath: true`, restricts candidates to the UID in the leading path segment |
| Backend access | In-memory UID lookup | Fetches `/occ/v2/basesites?fields=FULL` and caches base-site data |
| Configuration | Literal UID strings, not regular expressions | Site UIDs and Java-style URL patterns returned by OCC; conversion is handled by the framework |
| No matching base site | 404 before the application callback | 404 before the application callback |

The resolution mode is shared by all handlers using the same returned `createBaseSiteAwareRoute` function. Each route specifies its own `withBaseSiteInPath` option.

Preserve the mode of an existing `configureBaseSiteAwareRoutes` call. Before adding a new call, follow the customer's requested mode or the application configuration that establishes it. If neither determines the choice, explain these differences and ask which mode the customer wants. Do not invent a fixed UID list or switch modes to make an endpoint pass.

Before calling `configureBaseSiteAwareRoutes`, inspect the selected application's `provideConfig` declarations and their referenced configuration values for `context.baseSite`. For local resolution, copy and paste the configured array of literal site IDs directly into `configureBaseSiteAwareRoutes` as `pathBaseSiteIds`. The helper does not read Angular providers automatically. Use the customer's actual IDs; regex strings are not valid `pathBaseSiteIds`.

For local resolution, call `configureBaseSiteAwareRoutes` with the customer's actual UIDs copied from `context.baseSite` when available. The IDs below are examples:

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  pathBaseSiteIds: ['electronics-spa', 'powertools-spa'],
});
```

For OCC resolution, omit `pathBaseSiteIds` (or use an empty array):

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { extractFromHtmlMetaTag: indexHtmlContent },
});
```

Choose one of these `configureBaseSiteAwareRoutes` configurations. Keep the same `/llms.txt` registration and response from the earlier example in either case. An OCC site must have a URL pattern matching the request; its UID appearing in the path is not sufficient by itself.

## Where the OCC address comes from

In OCC mode, choose one `occBaseUrl` source: `{ value: '<backend URL>' }` or `{ extractFromHtmlMetaTag: indexHtmlContent }`. Local UID resolution needs neither an OCC address nor HTML.

`extractFromHtmlMetaTag` takes HTML content, not a filename. Reuse the content already read by the SSR server, or read its actual SSR index file if necessary. Inspect that HTML for the `occ-backend-base-url` meta tag:

```html
<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />
```

Replace `OCC_BACKEND_BASE_URL_VALUE` with the customer's actual HTTPS backend base URL when configuring this tag.

With `extractFromHtmlMetaTag`, a missing, empty, or placeholder meta tag leaves the OCC address unconfigured. With `value`, the resolver uses the supplied address. Preserve the customer's chosen source.

Supply the full HTTPS backend base URL, including the hostname and port if needed. The resolver appends `/occ/v2/basesites?fields=FULL`; do not pass just `/occ/v2` or the complete base-sites endpoint.

The helper does not automatically read Angular dependency-injection configuration, `environment.occBaseUrl`, or `CX_BASE_URL`. An environment value can supply the address only if application code passes it as `occBaseUrl: { value: ... }`, with the required import or environment access in scope. Reuse the customer's existing configuration rather than assuming the demo app's environment files.

In OCC mode, if no configured backend URL is available, use an explicit `value` placeholder and tell the customer to replace it with their real backend base URL before testing. Preserve any already configured address.

For example, when no configured address is available:

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  // Replace with your actual HTTPS OCC backend base URL before testing.
  occBaseUrl: { value: '<OCC_BACKEND_BASE_URL>' },
});
```

This is another alternative configuration for `configureBaseSiteAwareRoutes`. In OCC mode, if the selected source supplies no address, resolution fails with `OccUnavailableError` and the wrapper returns 503 when a matching endpoint is requested.

## Route matching and middleware order

`route` accepts an Express string matcher or a JavaScript `RegExp`. With the default `withBaseSiteInPath: true`, it matches the suffix after the base-site segment; with `false`, it matches the path without that prefix. Mount the returned middleware at the application root with `server.use(createBaseSiteAwareRoute(...))`; adding another mount prefix would make routing and base-site resolution see different paths.

For `route: '/llms.txt'` with the default `withBaseSiteInPath: true`:

| Request path | Behavior |
|---|---|
| `/electronics-spa/llms.txt` | Resolves and validates `electronics-spa`, then invokes the callback when it matches |
| `/unknown-base-site/llms.txt` | Returns wrapper 404 before the callback if that UID is unknown or unmatched |
| `/llms.txt` | Does not match the prefixed endpoint; continues to subsequent Express middleware without base-site resolution |
| `/electronics-spa/en/USD/llms.txt` | Does not match this suffix; continues to subsequent Express middleware without base-site resolution |

By default the helper adds exactly one base-site segment. It does not automatically add or decode language/currency segments from OCC configuration. For a base-site-aware domain-root endpoint such as `/llms.txt`, use OCC resolution and set `withBaseSiteInPath: false` in the registration. The resolver then matches the full URL against OCC URL patterns without requiring a UID prefix. Local UID resolution requires the prefix; registering an unprefixed route with that mode throws during server setup.

Express middleware order determines which handler runs. Place applicable origin validation, authentication, or other protective middleware before the custom endpoint. Place the endpoint before static handlers that could consume it and before the Angular rendering catch-all. Base-site validation does not replace those application protections.

## Callback and error behavior

The callback receives `{ req, res, next, baseSite }`. `baseSite` is a validated string UID; use it from the callback context. For default prefixed routes it matches the leading segment, and the wrapper returns 404 for an unknown or mismatched prefix before invoking application code. For unprefixed OCC routes it is the UID of the site whose URL patterns match the full request URL.

The callback owns the response status, headers, and body. The wrapper accepts all HTTP methods. For a request to display the current base site, the handler simply returns that UID, as shown above. If the customer specifies allowed methods or the application's existing API contract defines them, implement that policy in the application-owned handler. Calling the supplied `next()` continues through Express. Thrown errors and rejected callback promises are forwarded through `next(error)`.

| Failure | Wrapper behavior |
|---|---|
| Unknown or mismatched base-site prefix, or no matching OCC site on an unprefixed route | 404 before the callback |
| `ConcurrencyLimitError` | 503 with `Retry-After: 3` by default |
| `OccUnavailableError` | 503 with `Retry-After: 25` by default |
| Other resolver errors or callback failures | Forwarded to Express through `next(error)` |

Retry delays are seconds and can be overridden through the registration's `retryAfterSeconds` options. OCC base-site data is cached by the shared resolver for 60 seconds by default (`cacheTtlMs: 60_000`); OCC requests have a default three-second timeout (`timeoutMs: 3_000`). Routes created by the same returned `createBaseSiteAwareRoute` function share these resolver settings and the cache within the Node process. Local UID lookup performs no OCC requests.

## Validate the endpoint

Use the customer's actual build and SSR start scripts from `package.json`, project configuration, and server entry point. Check the source diff, run the relevant build/check commands, and start the server that includes the changed handler.

1. Request the configured endpoint using its actual host, port, and route shape. For a prefixed endpoint, replace `<STOREFRONT_ORIGIN>` with the running server's origin (scheme, hostname, and port) and use a configured UID:

   ```bash
   curl -i --max-time 10 "<STOREFRONT_ORIGIN>/electronics-spa/llms.txt"
   ```

   For `withBaseSiteInPath: false`, request `<STOREFRONT_ORIGIN>/llms.txt` using a host whose full request URL matches an OCC site's URL patterns. If multiple storefront domains are configured, check that each resolves to the expected UID.

2. Check the status, content type, and requested site-specific body. For the `llms.txt` example, expect plain text rather than an Angular-rendered page.
3. For a prefixed endpoint, request the same suffix using a UID confirmed absent from the configuration. For an unprefixed OCC endpoint, use an origin confirmed not to match any configured site's URL patterns. Expect wrapper 404 before the callback; the request should not produce an Angular-rendered 404 page.
4. If the endpoint has a specified method policy, test it. Paths outside the configured route shape can reach later Express or Angular middleware; do not describe their response as a wrapper 404.

If the endpoint returns Angular HTML or a storefront 404 page, inspect route shape and middleware order. If it returns wrapper 503, inspect the configured OCC address and resolver failure rather than changing the UID list or mode to bypass the problem.

## Source reference (in `node_modules/@spartacus/*`)

- `configureBaseSiteAwareRoutes`, `BaseSiteResolverOptions`, and `BaseSiteHandlerContext` from `@spartacus/setup/ssr/express-base-site`.
