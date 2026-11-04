# Base-Site-Aware Express Routes

Use `createBaseSiteAwareRoute` from `@spartacus/setup/ssr` to add an Express endpoint
whose response depends on the storefront base site. The helper resolves the site
before invoking your handler, without rendering Angular.

## Add an endpoint

Start with an application configured for Spartacus Express SSR and an installed
version of `@spartacus/setup/ssr` that exports this API. The same setup applies to
new and existing applications. Add the factory when you need an endpoint.

Add these imports and a handler to your server entry file:

```typescript
import {
  createBaseSiteAwareRoute,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr';

function llmsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.type('text/plain').send(`# Storefront guidance\n> Site: ${baseSite}\n`);
}
```

Inside `app()` or the equivalent Express setup function, after the server reads
its index HTML, create the factory and register the endpoint:

```typescript
const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  indexHtml: indexHtmlContent,
  pathBaseSiteIds: ['electronics-spa', 'powertools-spa'],
});

server.use(
  registerBaseSiteAwareRoute({
    route: '/llms.txt',
    handler: llmsHandler,
  })
);
```

`server` is your existing Express application and `indexHtmlContent` is the HTML
string already read by your SSR server, not a filename. If your server does not
already read the content, read its actual SSR index file with `readFileSync` from
`node:fs`. Replace the example site IDs with your application's literal base-site
UIDs, such as those configured in `context.baseSite`; Angular provider configuration
is not read automatically. Replace the handler body with your site's content.

Create one factory per Express application and reuse its returned function for
additional endpoints. The function name `registerBaseSiteAwareRoute` is local to
your application. The factory shares one resolver and OCC cache across its routes.
Creating it does not perform an OCC request.

Mount each returned router at the application root using `server.use(...)`. Keep
origin validation, authentication, and other applicable protective middleware
ahead of it. Register the endpoint before static handlers that could consume it
and before the Angular rendering catch-all.

## Choose how the base site is resolved

| Factory configuration | Resolution |
| --- | --- |
| Nonempty `pathBaseSiteIds` | Matches the leading URL segment against the supplied UIDs, case-sensitively, without OCC requests |
| Omitted or empty `pathBaseSiteIds` | Fetches and caches OCC base sites, then matches their URL patterns against the full request URL; prefixed routes restrict matching to the UID in the leading segment |

For OCC resolution, replace the factory options above with:

```typescript
const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  indexHtml: indexHtmlContent,
  occBaseUrl: 'https://commerce.example.com',
});
```

Use your actual HTTPS backend base URL. A configured `occ-backend-base-url` meta
tag in the supplied HTML takes precedence over `occBaseUrl`. The option is a
fallback when the tag is absent, empty, or contains `OCC_BACKEND_BASE_URL_VALUE`.
The resolver appends `/occ/v2/basesites?fields=FULL` to the backend base URL.

An OCC site must have a URL pattern matching the request; its UID in the path alone
is insufficient. Supplying `occBaseUrl` alongside a nonempty UID list still selects
local resolution. Preserve an existing factory's mode and options when adding routes.

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
  registerBaseSiteAwareRoute({
    route: '/llms.txt',
    withBaseSiteInPath: false,
    handler: llmsHandler,
  })
);
```

This matches `/llms.txt` and resolves its full URL through OCC. It requires a factory
with omitted or empty `pathBaseSiteIds`; local UID resolution requires a prefix.

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
Factory options include `cacheTtlMs` (default `60_000`), `timeoutMs` (default `3_000`),
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
