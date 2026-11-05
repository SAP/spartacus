# Base-Site-Aware Express Routes

Use `configureBaseSiteAwareRoutes` from `@spartacus/setup/ssr/express-base-site` to add an Express endpoint
whose response depends on the storefront base site. The helper resolves the site
before invoking your handler. These endpoints run entirely in Express, independently
of the Angular SSR pipeline.

## Add an endpoint

Start with an application configured for Spartacus Express SSR and an installed
version of `@spartacus/setup/ssr/express-base-site` that exports this API.

Add these imports and a handler to your server entry file:

```typescript
import {
  configureBaseSiteAwareRoutes,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr/express-base-site';

function llmsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.type('text/plain').send(`# Storefront guidance\n> Site: ${baseSite}\n`);
}
```

Inside `app()` or the equivalent Express setup function, call
`configureBaseSiteAwareRoutes` and register the endpoint:

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  pathBaseSiteIds: ['electronics-spa', 'powertools-spa'],
});

server.use(
  createBaseSiteAwareRoute({
    route: '/llms.txt',
    handler: llmsHandler,
  })
);
```

`server` is your existing Express application. Replace the example site IDs with
your application's literal base-site UIDs, such as those configured in
`context.baseSite`; Angular provider configuration is not read automatically.
Local UID resolution makes no OCC requests, so it needs no OCC base URL.
Replace the handler body with your site's content.

Call `configureBaseSiteAwareRoutes` once per Express application and reuse the
returned `createBaseSiteAwareRoute` function for additional endpoints. Each route
created by that function shares the same resolver and OCC cache. Configuration
does not perform an OCC request; `server.use(...)` mounts the created route.

Mount each returned router at the application root using `server.use(...)`. Keep
origin validation, authentication, and other applicable protective middleware
ahead of it. Register the endpoint before static handlers that could consume it
and before the Angular rendering catch-all.

## Choose how the base site is resolved

| `configureBaseSiteAwareRoutes` options | Resolution |
| --- | --- |
| Nonempty `pathBaseSiteIds` | Matches the leading URL segment against the supplied UIDs, case-sensitively, without OCC requests |
| Omitted or empty `pathBaseSiteIds` | Fetches and caches OCC base sites, then matches their URL patterns against the full request URL; prefixed routes restrict matching to the UID in the leading segment |

For OCC resolution, supply the backend base URL:

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { value: 'https://commerce.example.com' },
});
```

Use your actual HTTPS backend base URL. Alternatively, extract the address from
the `occ-backend-base-url` meta tag:

```typescript
const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { extractFromHtmlMetaTag: indexHtmlContent },
});
```

`extractFromHtmlMetaTag` takes the storefront index HTML content. Reuse the
content read by your SSR server, or read the index file with `readFileSync`
from `node:fs`. Its `occ-backend-base-url` meta tag must contain the backend base URL.
A missing, empty, or placeholder value (`OCC_BACKEND_BASE_URL_VALUE`) leaves the
address unconfigured.

Choose either `value` or `extractFromHtmlMetaTag` as the address source. The resolver
appends `/occ/v2/basesites?fields=FULL` to that address to fetch base-site configuration.

For a prefixed route, OCC resolution selects the site whose UID matches the leading
path segment and checks its `urlPatterns` against the full request URL. For example,
a pattern matching `https://shop.example.com/electronics-spa/.*` identifies
`electronics-spa` on that domain. For a route without a base-site prefix, resolution
matches the full URL against all sites' patterns.

## Route shape

By default, `route: '/llms.txt'` registers `/:baseSite/llms.txt`. Supply the suffix
without its base-site prefix. `route` accepts an Express string matcher or a
JavaScript `RegExp`.

| Request | Result for the default prefixed route |
| --- | --- |
| `/electronics-spa/llms.txt` | Invokes the handler when that site resolves |
| `/unknown-site/llms.txt` | Returns 404 before invoking the handler when the site is unknown or unmatched |
| `/llms.txt` | Continues to subsequent middleware without base-site resolution |
| `/electronics-spa/en/USD/llms.txt` | Continues to subsequent middleware; language and currency segments are not added automatically |

For a domain-root endpoint resolved through OCC, add `withBaseSiteInPath: false`
to its registration:

```typescript
server.use(
  createBaseSiteAwareRoute({
    route: '/llms.txt',
    withBaseSiteInPath: false,
    handler: llmsHandler,
  })
);
```

This matches `/llms.txt` and resolves its full URL through OCC. Configure OCC
resolution by omitting `pathBaseSiteIds` or supplying an empty array. Local UID
resolution requires a base-site prefix.

## Responses and failures

Your handler receives `{ req, res, next, baseSite }` and owns the status, headers,
and body. The router accepts all HTTP methods; implement any required method policy
in your handler. Calling `next()` continues through Express. Thrown errors and
rejected promises are forwarded to `next(error)`.

| Failure on a matching route | Response |
| --- | --- |
| Unknown or mismatched site | 404 before the handler |
| Cold-cache concurrency limit exceeded | 503 with `Retry-After: 3` by default |
| OCC unavailable or unconfigured in OCC mode | 503 with `Retry-After: 25` by default |
| Other resolver or handler error | Forwarded to Express error middleware |

Retry delays can be configured through the registration's `retryAfterSeconds`.
`configureBaseSiteAwareRoutes` options include `cacheTtlMs` (default `60_000`), `timeoutMs` (default `3_000`),
and `concurrencyLimit` (default `10`).

## Verify your endpoint

Build and start the application's SSR server using its own scripts. Request the
endpoint using its actual origin and a configured site UID, for example:

```bash
curl -i --max-time 10 http://localhost:4000/electronics-spa/llms.txt
```

Check the status, content type, and site-specific response. Repeat with a UID known
to be absent and verify a 404 before the handler. If you receive Angular HTML,
check middleware order and route shape. For a 503, check the OCC address, backend
availability, and URL patterns.
