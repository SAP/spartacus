# BFF Integration — Backend URL Configuration

This document describes the complete reference implementation for integrating a Vivaldi
BFF (Backend for Frontend) with Spartacus Classic. It covers all files you need to
create or modify, and how they work together.

---

## How it works

CCv2 injects backend URLs into `index.html` at deploy time by replacing placeholder
strings with real values configured on the environment variable page. This avoids
rebuilding the app per environment and prevents two known issues:

- Mutating built JS files breaks PWA Service Worker integrity checks (hash mismatch)
- Replacing values in HTML/JS files invalidates CDN cache entries

The `BFF_BASE_URL` injection token reads the substituted value from the meta tag at
Angular bootstrap time — before any component renders. In local development, the
Angular dev-server proxy forwards `/bff/*` to the real BFF so the browser never makes
a cross-origin call.

---

## File overview

```
src/
  index.html                                  ← add bff-base-url meta tag
  app/
    app.module.ts                             ← spread bffExampleProviders
    app.module.server.ts                      ← SSR: override BFF_BASE_URL with absolute URL
    bff/
      bff-base-url.token.ts                   ← InjectionToken reading meta tag
      bff-http.service.ts                     ← HTTP client for BFF tRPC procedures
      examples/
        bff-example.providers.ts              ← lazy route registration
        say-hello.component.ts                ← demo: custom BFF procedure
        occ-base-sites.component.ts           ← demo: OCC call via BFF
  environments/
    models/environment.model.ts               ← add bffBaseUrl field
    environment.ts                            ← read CX_BFF_BASE_URL
    environment.prod.ts                       ← read CX_BFF_BASE_URL
proxy.conf.js                                 ← dev-server proxy (reads CX_BFF_BASE_URL)
.env-cmdrc                                    ← add CX_BFF_BASE_URL to dev profiles
project.json                                  ← point serve to proxy.conf.js
```

---

## 1. `src/index.html`

Add the `bff-base-url` meta tag inside `<head>`. CCv2 replaces the placeholders
at deploy time:

```html
<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />
<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />
<meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
```

| Placeholder | Environment variable | Set by |
|---|---|---|
| `OCC_BACKEND_BASE_URL_VALUE` | `OCC_BASE_URL` | User via VariableSet |
| `MEDIA_BACKEND_BASE_URL_VALUE` | `MEDIA_BASE_URL` | User via VariableSet |
| `BFF_BASE_URL_VALUE` | `BFF_BASE_URL` | Platform auto-injects on "Connect to BFF" (value: `/bff/`) |

> **Note:** If no BFF is connected, `BFF_BASE_URL_VALUE` is left unreplaced.
> The `BFF_BASE_URL` token treats the placeholder as "not configured" and falls
> back to `/bff/api` — BFF calls will fail gracefully rather than silently.

---

## CRITICAL: Remove hardcoded `baseUrl` from Spartacus configuration

`provideConfig()` takes precedence over meta tag factories. If your
`spartacus-configuration.module.ts` contains a hardcoded `baseUrl`, the meta tag
is ignored and CCv2 URL injection will not work.

**Remove this:**
```ts
provideConfig(<OccConfig>{
  backend: {
    occ: {
      baseUrl: 'https://hardcoded-url.example.com', // ← remove this
    },
  },
}),
```

With this removed, Spartacus reads `<meta name="occ-backend-base-url">` which CCv2
replaces at deploy time.

---

## CRITICAL: OCC URL must have a valid CA-signed certificate for BFF use

The BFF runs as a Node.js server on CCv2. Node.js is strict about TLS certificate
verification and will **reject self-signed certificates** (e.g. raw IP addresses like
`https://40.x.x.x:9002`).

- The **browser** works with self-signed certs because users can manually accept the
  security exception
- **Node.js** (the BFF container) has no such mechanism — it rejects self-signed certs
  by default in production
- Vivaldi builds the HTTPS agent as `new Agent({ rejectUnauthorized: !isDev })` —
  locally `isDev=true` so self-signed certs are accepted, on CCv2 `isDev=false` so
  they are rejected

**Fix:** The `OCC_BASE_URL` used by the BFF must point to an OCC hostname with a
CA-signed certificate (e.g. `https://api.xxx.model-t.myhybris.cloud`), not a raw IP.

---

## 2. `src/app/bff/bff-base-url.token.ts` *(new file)*

Reads the `bff-base-url` meta tag at Angular bootstrap time. Falls back to `/bff/api`
for local development (handled by the dev-server proxy).

```ts
import { InjectionToken, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// Inlined until BFF meta tag constants are released in @spartacus/core (CXSPA-13587).
const BFF_BASE_URL_META_TAG_NAME = 'bff-base-url';
const BFF_BASE_URL_META_TAG_PLACEHOLDER = 'BFF_BASE_URL_VALUE';

export const BFF_BASE_URL = new InjectionToken<string>('BFF_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    const meta = inject(Meta);
    const tag = meta.getTag(`name="${BFF_BASE_URL_META_TAG_NAME}"`);
    const content = tag?.content ?? '';
    return content && content !== BFF_BASE_URL_META_TAG_PLACEHOLDER
      ? content
      : '/bff/api';
  },
});
```

---

## 3. `src/app/bff/bff-http.service.ts` *(new file)*

Generic HTTP client for calling BFF tRPC procedures. Reads `BFF_BASE_URL` and forwards
the Spartacus OCC Bearer token as the `Authorization` header.

BFF traffic bypasses Spartacus's OCC interceptor chain because interceptors are gated
on `backend.occ.baseUrl` — BFF calls go to `/bff/...` which does not match.

> **Known limitation:** Automatic token renewal on 401 is not implemented. The token
> is read once at call time. If it expires mid-session, BFF calls will receive a 401
> with no automatic retry.

```ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthStorageService } from '@spartacus/core';
import { Observable, switchMap, take, map } from 'rxjs';
import { BFF_BASE_URL } from './bff-base-url.token';

@Injectable({ providedIn: 'root' })
export class BffHttpService {
  private readonly http = inject(HttpClient);
  private readonly bffBaseUrl = inject(BFF_BASE_URL);
  private readonly authStorage = inject(AuthStorageService);

  /** GET — calls a tRPC query procedure. Input is serialized as ?input={"json":{...}} */
  query<T = unknown>(
    procedure: string,
    input?: Record<string, unknown>,
    extraHeaders?: Record<string, string>,
  ): Observable<T> {
    return this.withAuthHeader((headers) => {
      const params = input
        ? new HttpParams().set('input', JSON.stringify({ json: input }))
        : undefined;
      return this.http
        .get<{ result: { data: { json: T } } }>(
          `${this.bffBaseUrl}/${procedure}`,
          { headers: { ...headers, ...extraHeaders }, params },
        )
        .pipe(map((res) => res.result.data.json));
    });
  }

  /** POST — calls a tRPC mutation procedure. Input is sent as { "json": <input> }. */
  mutate<T = unknown>(
    procedure: string,
    input?: Record<string, unknown>,
  ): Observable<T> {
    return this.withAuthHeader((headers) =>
      this.http
        .post<{ result: { data: { json: T } } }>(
          `${this.bffBaseUrl}/${procedure}`,
          { json: input ?? {} },
          { headers },
        )
        .pipe(map((res) => res.result.data.json)),
    );
  }

  private withAuthHeader<T>(
    fn: (headers: Record<string, string>) => Observable<T>,
  ): Observable<T> {
    if (!this.bffBaseUrl) {
      throw new Error(
        'BFF_BASE_URL is not configured. ' +
          'Set the <meta name="bff-base-url"> tag or override BFF_BASE_URL in providers.',
      );
    }
    return this.authStorage.getToken().pipe(
      take(1),
      switchMap((token) => {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token?.access_token) {
          headers['Authorization'] = `Bearer ${token.access_token}`;
        }
        return fn(headers);
      }),
    );
  }
}
```

---

## 4. `src/app/app.module.server.ts` *(modify)*

In SSR, Node.js has no document origin so `/bff/api` can't be resolved. Override
`BFF_BASE_URL` with an absolute URL from the environment:

```ts
import { NgModule } from '@angular/core';
import { provideServer } from '@spartacus/setup/ssr';
import { BFF_BASE_URL } from './bff/bff-base-url.token';

@NgModule({
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    {
      provide: BFF_BASE_URL,
      useValue: process.env['BFF_BASE_URL'] ?? 'https://localhost:8482/bff/api',
    },
  ],
})
export class AppServerModule {}
```

---

## 5. `proxy.conf.js` *(new file, project root)*

Replaces the static `proxy.conf.json`. Reads `CX_BFF_BASE_URL` at dev-server startup
and sets the proxy target dynamically. This means the browser always calls `/bff/api`
(same origin — no CORS), and Node forwards it to the real BFF (accepting the
self-signed cert via `secure: false`).

```js
const bffBaseUrl =
  process.env['CX_BFF_BASE_URL'] || 'https://localhost:8482/bff/api';
const bffTarget = new URL(bffBaseUrl).origin;

module.exports = {
  '/bff': {
    target: bffTarget,
    secure: false,
    changeOrigin: true,
    logLevel: 'info',
  },
};
```

---

## 6. `project.json` *(modify)*

Point the `serve` (and `serve-ssr`) targets at `proxy.conf.js`:

```json
"serve": {
  "executor": "@angular-builders/custom-esbuild:dev-server",
  "options": {
    "proxyConfig": "projects/storefrontapp/proxy.conf.js"
  },
  ...
}
```

---

## 7. `.env-cmdrc` *(modify)*

Add `CX_BFF_BASE_URL` to each dev profile. This value is used **only** by
`proxy.conf.js` at dev-server startup — it is never read by the Angular app itself:

```jsonc
{
  "dev": {
    "CX_BASE_URL": "https://your-commerce-host",
    "CX_BFF_BASE_URL": "https://localhost:8482/bff/api"
  }
}
```

---

## 8. Environment files *(modify)*

### `src/environments/models/environment.model.ts`

```ts
export interface Environment {
  bffBaseUrl?: string;
  // ... existing fields
}
```

### `src/environments/environment.ts`

```ts
export const environment: Environment = {
  bffBaseUrl: buildProcess.env.CX_BFF_BASE_URL ?? '/bff/api',
  // ... existing fields
};
```

### `src/environments/environment.prod.ts`

```ts
export const environment: Environment = {
  bffBaseUrl: buildProcess.env.CX_BFF_BASE_URL,
  // ... existing fields
};
```

> **Note:** `environment.bffBaseUrl` is not used by the Angular app at runtime.
> It exists only to make `CX_BFF_BASE_URL` available to `proxy.conf.js` via the
> build-time esbuild plugin. The app reads the BFF URL from the meta tag via
> `BFF_BASE_URL` token, not from the environment object.

---

## 9. Example: custom BFF procedure (`say-hello.component.ts`)

Route: `/bff-say-hello`

Calls the BFF's `sample.sayHello` procedure with a `name` input and a custom
`x-app-custom` header. Triggered by a button click — no call on init.

```ts
this.bff
  .query<{ message: string }>(
    'sample.sayHello',
    { name: 'Spartacus' },
    { 'x-app-custom': 'foo' },
  )
  .subscribe((res) => console.log(res.message));
```

---

## 10. Example: OCC call via BFF (`occ-base-sites.component.ts`)

Route: `/occ-base-sites`

Calls the BFF's `occ.getBaseSites` procedure, which proxies to
`GET /occ/v2/basesites` on the OCC backend. Triggered by a button click.

```ts
this.bff
  .query('occ.getBaseSites')
  .subscribe((res) => console.log(res));
```

The BFF procedure in `apps/bff/src/api/routers/occ.ts`:

```ts
import { HttpRequestBuilder } from '@vivaldi/connectivity';

export const getBaseSitesFn = async ({ ctx }) => {
  return ctx.execute.http(
    HttpRequestBuilder.get('/basesites').addCustomHeaders({
      authorization: ctx.forwardHeaders['authorization'],
    }),
    ctx.destinations.occ.v2(),
  );
};
```

Both examples use `takeUntilDestroyed()` + `Subject` + `switchMap` to avoid
Angular pending task issues — the HTTP call is only triggered by user interaction,
never on component initialization.

---

## 11. `bff-example.providers.ts` *(new file)*

Registers both example routes lazily:

```ts
export const bffExampleProviders: Provider[] = [
  {
    provide: ROUTES,
    multi: true,
    useValue: [
      {
        path: 'bff-say-hello',
        loadComponent: () =>
          import('./say-hello.component').then((m) => m.SayHelloComponent),
      },
      {
        path: 'occ-base-sites',
        loadComponent: () =>
          import('./occ-base-sites.component').then((m) => m.OccBaseSitesComponent),
      },
    ],
  },
];
```

Spread into `app.module.ts` providers: `providers: [privateProviders, bffExampleProviders]`

---

## Testing meta tag substitution locally

```bash
# 1. Build
npm run build:ssr

# 2. Substitute placeholders (simulates CCv2 deploy-time substitution)
sed -i '' 's|BFF_BASE_URL_VALUE|https://your-bff-host/bff/api|g' \
  dist/storefrontapp/browser/index.html

# 3. Verify
grep "bff-base-url" dist/storefrontapp/browser/index.html

# 4a. CSR
npx http-server dist/storefrontapp/browser -p 4200 --proxy http://localhost:4200?

# 4b. SSR
BFF_BASE_URL=https://your-bff-host/bff/api \
SERVER_REQUEST_ORIGIN=http://localhost:4000 \
node dist/storefrontapp/server/server.mjs
```
