# Base-Site-Aware Express Handlers

## Rule

Use `createBaseSiteAwareRoute` from `@spartacus/setup/ssr` for custom Express endpoints that serve content for the base site in a leading URL segment, such as `/<baseSite>/llms.txt`. The helper resolves the base site before calling application code, without starting an Angular render.

Create the factory once at server startup and reuse its returned registration function for participating handlers. This shares the resolver and its OCC cache across those handlers.

## Validate the application first

Inspect the selected application in the Angular workspace, its build/SSR configuration, and its actual Express server entry point. Confirm that Spartacus SSR is configured; an installed package or an Angular server bootstrap file alone does not establish this.

If Spartacus Express SSR is missing, explain that the endpoint needs this server setup and ask: "Would you like to configure Spartacus SSR as a separate step first?" Wait for the answer before proceeding. Adding handlers does not include silently enabling SSR.

Check that the installed `@spartacus/setup/ssr` exposes `createBaseSiteAwareRoute`. When initial setup is needed, also check that `@spartacus/schematics` provides `add-base-site-aware-route`. If the needed API or schematic is unavailable, report the incompatibility before changing the application; do not invent a replacement or automatically upgrade dependencies.

Look for an existing call to `createBaseSiteAwareRoute`, including import aliases or setup in another server module. Reuse its registration function and preserve its options. Do not assume the customer's server file, variables, or workspace project have the names shown below.

## Initial setup through the schematic

When the application has no configured helper factory, run the schematic from the customer workspace root with its actual project name:

```bash
ng generate @spartacus/schematics:add-base-site-aware-route --project <project-name>
```

The schematic imports the helper, creates a shared registration function using the server's existing index HTML content, and registers `/<baseSite>/example.txt`. Inspect its changes, replace the example route with the requested suffix, and extract the response into a named handler function in the existing server file. Pass that function as `handler`. Keep the generated example endpoint only if the customer asked for it.

If the schematic cannot recognize the server setup, explain its diagnostic rather than bypassing its checks or guessing where to insert code.

For example, adapt the generated registration to serve a per-site `llms.txt`. The handler function and registration can stay together in the existing server file. Here `indexHtmlContent` is HTML content already read by the SSR server, and `server` is its existing Express application; use the customer's actual bindings. Preserve any existing factory options.

```typescript
import {
  createBaseSiteAwareRoute,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr';

export function llmsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.type('text/plain').send(`# Storefront guidance\n> Site: ${baseSite}\n`);
}

const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  indexHtml: indexHtmlContent,
});

server.use(
  registerBaseSiteAwareRoute({
    route: '/llms.txt',
    handler: llmsHandler,
  })
);
```

The handler body above illustrates site-specific content; replace it with the requested document. Mount with `server.use(...)` at the application root. Supply the suffix `/llms.txt`, since the helper adds the base-site segment. Keep applicable protective middleware ahead of the endpoint, and register it before static handlers that could consume it and before the Angular rendering catch-all.

## Additional handlers reuse the factory

When a registration function already exists, add only the requested handler. Do not run the initial-setup schematic again or create a new factory for each endpoint or request.

For example, a request to show the current base site needs only a handler that returns the resolved UID. Add the named function and its registration to the same server file, using the type imported above:

```typescript
export function siteInfoHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  res.json({ baseSite });
}

server.use(
  registerBaseSiteAwareRoute({
    route: '/site-info.json',
    handler: siteInfoHandler,
  })
);
```

Use the callback context's `baseSite` when producing site-specific content. A named handler function in the server file is sufficient even for a one-line response; retain the shared factory.

## Choose the base-site resolution source

The presence of base-site IDs selects the resolution mode. Both modes use `/<baseSite>/<route>`; switching to OCC does not change a prefixed endpoint into a domain-root endpoint. For `route: '/llms.txt'`, both register `/<baseSite>/llms.txt`.

| | Local UID resolution | OCC resolution |
|---|---|---|
| Selected by | Nonempty `pathBaseSiteIds` | Omitted or empty `pathBaseSiteIds` |
| Matching | The first nonempty path segment must exactly equal a supplied UID; comparison is case-sensitive | Restricts OCC candidates to the UID in the leading path segment, then matches that site's `urlPatterns` against the full request URL |
| Backend access | No I/O and no OCC fallback | Fetches `/occ/v2/basesites?fields=FULL` and caches base-site data |
| Configuration | Literal UID strings, not regular expressions | Site UIDs and Java-style URL patterns returned by OCC; conversion is handled by the framework |
| Unknown or unmatched prefix | 404 before the application callback | 404 before the application callback |

Providing `occBaseUrl` does not select OCC resolution. A nonempty UID list still selects local lookup even when an OCC address is configured. The chosen mode applies to all handlers registered through that factory; there is no per-route mode option.

Preserve the mode of an existing factory. Before configuring a new factory, follow the customer's requested mode or the application configuration that establishes it. If neither determines the choice, explain these differences and ask which mode the customer wants. Do not invent a fixed UID list or switch modes to make an endpoint pass.

Before configuring a new factory, inspect the selected application's `provideConfig` declarations and their referenced configuration values for `context.baseSite`. For local resolution, copy and paste the configured array of literal site IDs directly into `createBaseSiteAwareRoute` as `pathBaseSiteIds`. The helper does not read Angular providers automatically. Use the customer's actual IDs; regex strings are not valid `pathBaseSiteIds`.

For local resolution, configure the factory with the customer's actual UIDs copied from `context.baseSite` when available. The IDs below are examples:

```typescript
const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  pathBaseSiteIds: ['electronics-spa', 'powertools-spa'],
  indexHtml: indexHtmlContent,
});
```

For OCC resolution, omit `pathBaseSiteIds` (or use an empty array):

```typescript
const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  indexHtml: indexHtmlContent,
});
```

These are alternative factory configurations, not additional factories to create together. Keep the same `/llms.txt` registration and response from the earlier example in either case. An OCC site must have a URL pattern matching the request; its UID appearing in the path is not sufficient by itself.

## Where the OCC address comes from

`indexHtml` is required HTML content, not a filename. Reuse the content already read by the SSR server and inspect the HTML it actually reads for the `occ-backend-base-url` meta tag:

```html
<meta name="occ-backend-base-url" content="https://commerce.example.com" />
```

The resolver chooses the address in this order:

1. A populated `occ-backend-base-url` meta tag in the supplied HTML. This takes precedence even when `occBaseUrl` is explicitly configured.
2. The factory's `occBaseUrl` option when the tag is missing, empty, or still contains `OCC_BACKEND_BASE_URL_VALUE`.

Supply the full backend base URL, such as `https://commerce.example.com`. The resolver appends `/occ/v2/basesites?fields=FULL`; do not pass just `/occ/v2` or the complete base-sites endpoint.

The helper does not automatically read Angular dependency-injection configuration, `environment.occBaseUrl`, or `CX_BASE_URL`. An environment value can supply the fallback only if application code passes it as `occBaseUrl`, with the required import or environment access in scope. Reuse the customer's existing configuration rather than assuming the demo app's environment files.

In OCC mode, if neither the HTML meta tag nor the factory supplies a configured backend URL, add an `occBaseUrl` placeholder to the existing factory with a comment explaining that it is a local development fallback. Tell the customer to replace it with their real backend base URL before testing. Preserve any already configured address.

For example, when no configured address is available:

```typescript
const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
  indexHtml: indexHtmlContent,
  // Local development fallback when the HTML OCC meta tag is unconfigured.
  // Replace with your actual OCC backend base URL before testing.
  occBaseUrl: 'https://your-occ-backend.example',
});
```

This is another alternative factory configuration. A configured HTML address still wins over this fallback. In OCC mode, if neither source supplies an address, resolution fails with `OccUnavailableError` and the wrapper returns 503 when a matching endpoint is requested. Local UID resolution needs no OCC address.

## Route matching and middleware order

`route` accepts an Express string matcher or a JavaScript `RegExp` for the suffix after the base-site segment. Mount the returned middleware at the application root with `server.use(registerBaseSiteAwareRoute(...))`; adding another mount prefix would make routing and base-site resolution see different leading segments.

For `route: '/llms.txt'`:

| Request path | Behavior |
|---|---|
| `/electronics-spa/llms.txt` | Resolves and validates `electronics-spa`, then invokes the callback when it matches |
| `/unknown-base-site/llms.txt` | Returns wrapper 404 before the callback if that UID is unknown or unmatched |
| `/llms.txt` | Does not match the prefixed endpoint; continues to subsequent Express middleware without base-site resolution |
| `/electronics-spa/en/USD/llms.txt` | Does not match this suffix; continues to subsequent Express middleware without base-site resolution |

The helper adds exactly one base-site segment. It does not automatically add or decode language/currency segments from OCC configuration. Register domain-root endpoints separately with ordinary Express handlers.

Express middleware order determines which handler runs. Place applicable origin validation, authentication, or other protective middleware before the custom endpoint. Place the endpoint before static handlers that could consume it and before the Angular rendering catch-all. Base-site validation does not replace those application protections.

## Callback and error behavior

The callback receives `{ req, res, next, baseSite }`. `baseSite` is a validated string UID matching the leading segment; use it from the callback context. The wrapper returns 404 for an unknown or mismatched prefix before invoking application code.

The callback owns the response status, headers, and body. The wrapper accepts all HTTP methods. For a request to display the current base site, the handler simply returns that UID, as shown above. If the customer specifies allowed methods or the application's existing API contract defines them, implement that policy in the application-owned handler. Calling the supplied `next()` continues through Express. Thrown errors and rejected callback promises are forwarded through `next(error)`.

| Failure | Wrapper behavior |
|---|---|
| Unknown or mismatched base-site prefix on a matching route | 404 before the callback |
| `ConcurrencyLimitError` | 503 with `Retry-After: 3` by default |
| `OccUnavailableError` | 503 with `Retry-After: 25` by default |
| Other resolver errors or callback failures | Forwarded to Express through `next(error)` |

Retry delays are seconds and can be overridden through the registration's `retryAfterSeconds` options. OCC base-site data is cached per Node process for 60 seconds by default (`cacheTtlMs: 60_000`); OCC requests have a default three-second timeout (`timeoutMs: 3_000`). The shared factory shares these resolver settings and its cache across handlers. Local UID lookup performs no OCC requests.

## Validate the endpoint

Use the customer's actual build and SSR start scripts from `package.json`, project configuration, and server entry point. Check the source diff, run the relevant build/check commands, and start the server that includes the changed handler.

1. Request the configured endpoint using an actual UID, host, and port. For example, after replacing these example values as needed:

   ```bash
   curl -i --max-time 10 http://localhost:4000/electronics-spa/llms.txt
   ```

2. Check the status, content type, and requested site-specific body. For the `llms.txt` example, expect plain text rather than an Angular-rendered page.
3. Request the same suffix using a UID confirmed absent from the configuration. Expect wrapper 404 before the callback; the request should not produce an Angular-rendered 404 page.
4. If the endpoint has a specified method policy, test it. Root URLs and URLs with extra language/currency segments can reach later Express or Angular middleware; do not describe their response as a wrapper 404.

If the endpoint returns Angular HTML or a storefront 404 page, inspect route shape and middleware order. If it returns wrapper 503, inspect the configured OCC address and resolver failure rather than changing the UID list or mode to bypass the problem.

## Source reference (in `node_modules/@spartacus/*`)

- `createBaseSiteAwareRoute`, `BaseSiteResolverOptions`, and `BaseSiteHandlerContext` from `@spartacus/setup/ssr`.
- `add-base-site-aware-route` from the `@spartacus/schematics` collection.
