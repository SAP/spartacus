# BFF Integration — Backend URL Configuration

This document describes the reference implementation for integrating a Vivaldi BFF
(Backend for Frontend) with Spartacus Classic, and how to configure backend URLs at
runtime using HTML meta tags.

## Overview

CCv2 injects backend URLs into `index.html` at deploy time by replacing placeholder
strings. This avoids rebuilding the app per environment and prevents two known issues:

- Mutating built JS files breaks PWA Service Worker integrity checks (hash mismatch)
- Replacing values in HTML/JS files invalidates CDN cache entries

Spartacus already uses this mechanism for the OCC and Media URLs. This reference
implementation extends it with a `BFF_BASE_URL_VALUE` placeholder for the Vivaldi BFF.

---

## `index.html` meta tags

Add the following tags to your `<head>`. CCv2 replaces the placeholder values at
release time using the values configured on the environment variable page:

```html
<!-- OCC backend (legacy placeholder — CCv2 replaces OCC_BACKEND_BASE_URL_VALUE) -->
<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />

<!-- Media / CDN -->
<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />

<!-- Vivaldi BFF — CCv2 replaces BFF_BASE_URL_VALUE -->
<meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
```

At runtime, Spartacus's `MetaTagConfigModule` (activated automatically by
`BaseCoreModule`) reads `occ-backend-base-url` and `media-backend-base-url` and
contributes them to `backend.occ.baseUrl` and `backend.media.baseUrl` in the Spartacus
config. The `bff-base-url` tag is read by `BFF_BASE_URL` token (see below).

---

## `BFF_BASE_URL` injection token

**File:** `projects/storefrontapp/src/app/bff/bff-base-url.token.ts`

An Angular `InjectionToken<string>` that provides the BFF base URL to any service or
component that needs it.

**Resolution order:**

1. SSR override — `process.env['BFF_BASE_URL']` provided in `app.module.server.ts`
   (Node has no document origin, so relative URLs don't work in SSR)
2. Browser — reads the `bff-base-url` meta tag from the document at Angular bootstrap
3. Fallback — `/bff/api` (relative, handled by the Angular dev-server proxy in local dev)

```ts
import { BFF_BASE_URL } from './bff/bff-base-url.token';

@Injectable({ providedIn: 'root' })
export class MyService {
  private readonly bffBaseUrl = inject(BFF_BASE_URL);
}
```

---

## `BffHttpService`

**File:** `projects/storefrontapp/src/app/bff/bff-http.service.ts`

A generic Angular service for calling BFF tRPC procedures over plain HTTP.

- Uses Angular's `HttpClient` (not `fetch`) so it works with Angular's HTTP testing
  infrastructure
- Reads the Bearer token from `AuthStorageService` and forwards it as `Authorization`
  header
- Deliberately bypasses Spartacus's OCC interceptor chain — BFF traffic uses a
  different base URL so none of the OCC interceptors (`SiteContextInterceptor`,
  `AuthHttpHeaderService`, etc.) fire
- Wraps input in `{ "json": <value> }` per the tRPC/superjson wire format

**Query (GET):**
```ts
this.bff.query<{ message: string }>(
  'sample.sayHello',           // procedure path
  { name: 'Spartacus' },       // input (serialized as ?input={"json":...})
  { 'x-app-custom': 'foo' }    // optional extra headers
).subscribe(res => console.log(res.message));
```

**Mutation (POST):**
```ts
this.bff.mutate<Cart>(
  'mcs.storefront.cart.v1.carts.createCart',
  { salesChannelId: 'electronics' }
).subscribe(cart => console.log(cart));
```

The response envelope `{ result: { data: { json: T } } }` is unwrapped automatically —
subscribers receive the inner value directly.

---

## SSR configuration

**File:** `projects/storefrontapp/src/app/app.module.server.ts`

In SSR (Node.js), relative URLs like `/bff/api` have no base to resolve against.
`BFF_BASE_URL` is overridden with an absolute URL from `process.env['BFF_BASE_URL']`:

```ts
{
  provide: BFF_BASE_URL,
  useValue: process.env['BFF_BASE_URL'] ?? 'https://localhost:8482/bff/api',
}
```

Required environment variables for SSR:

| Variable | Purpose |
|---|---|
| `BFF_BASE_URL` | Absolute BFF URL reachable from the Node.js process |
| `SERVER_REQUEST_ORIGIN` | Public-facing origin of the storefront (e.g. `http://localhost:4200`) |
| `NODE_TLS_REJECT_UNAUTHORIZED=0` | Local dev only — accept self-signed BFF cert |

---

## Local development proxy

**File:** `projects/storefrontapp/proxy.conf.js`

The Angular dev-server proxies `/bff/*` to the real BFF, solving two local dev problems:

- CORS — browser calls go to the same origin (`localhost:4200`), the proxy forwards
  server-side where CORS doesn't apply
- Self-signed certificate — Node accepts it via `secure: false`

The proxy target is read from `CX_BFF_BASE_URL` at dev-server startup:

```js
// .env-cmdrc
{
  "dev": {
    "CX_BASE_URL": "https://your-commerce-host",
    "CX_BFF_BASE_URL": "https://localhost:8482/bff/api"
  }
}
```

`CX_BFF_BASE_URL` is used **only** by `proxy.conf.js` — it is never read by the Angular
app at runtime. The browser always calls `/bff/api` (relative).

To start both servers:
```bash
# Terminal 1 — BFF
cd /path/to/bff-repo && OCC_BASE_URL=https://your-commerce-host npx nx serve bff

# Terminal 2 — Spartacus
npm run start
```

---

## Example component

**File:** `projects/storefrontapp/src/app/bff/examples/say-hello.component.ts`

Demonstrates calling the BFF's `sample.sayHello` procedure. Route: `/bff-say-hello`.

- Input: `name` (string)
- Custom header: `x-app-custom` (`'foo'` | `'bar'`)
- Output: `{ message: string }`

Route registered in `bff-example.providers.ts` and spread into `app.module.ts`.

---

## Testing the meta tag substitution locally

To simulate CCv2's deploy-time substitution:

```bash
# 1. Build
npm run build:ssr

# 2. Substitute placeholders
sed -i '' 's|OCC_BACKEND_BASE_URL_VALUE|https://your-commerce-host|g' dist/storefrontapp/browser/index.html
sed -i '' 's|BFF_BASE_URL_VALUE|https://your-bff-host/bff/api|g'      dist/storefrontapp/browser/index.html

# 3. Verify
grep -E "occ-backend-base-url|bff-base-url" dist/storefrontapp/browser/index.html

# 4a. Serve CSR
npx http-server dist/storefrontapp/browser -p 4200 --proxy http://localhost:4200?

# 4b. Or serve SSR
BFF_BASE_URL=https://your-bff-host/bff/api \
SERVER_REQUEST_ORIGIN=http://localhost:4000 \
node dist/storefrontapp/server/server.mjs
```
