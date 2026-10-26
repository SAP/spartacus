# Runtime Configuration via /config.json

## What it solves

Spartacus traditionally sets backend URLs at **build time** in two ways: either hardcoded as a literal string in `spartacus-configuration.module.ts` (the schematic default), or injected via a `<meta name="occ-backend-base-url">` placeholder that the server replaces before the page is served (`--useMetaTags`). Both require a deployment pipeline that can inject values into build artifacts — incompatible with the SAP Hosting Portal's "build once, deploy anywhere" model, and problematic for PWA deployments where rewriting built JS files breaks Service Worker file-integrity hashes.

The `/config.json` mechanism solves this by fetching environment variables from a well-known endpoint at **runtime**, before Angular bootstraps. The Hosting Portal's Caddy reverse proxy serves this file at the same origin as the storefront - no CORS, no extra infrastructure for customers. The existing `<meta>` tag mechanism remains active as a fallback.

Related ticket: [CXSPA-12541](https://jira.tools.sap/browse/CXSPA-12541). The reference implementation in the BFF project: [CXSPA-11078](https://jira.tools.sap/browse/CXSPA-11078).

---

## How it works

`/config.json` is fetched once before `bootstrapApplication()` runs (CSR) or once at Express server startup (SSR). The result is provided as the `RUNTIME_ENVIRONMENT` injection token. `provideRuntimeOccConfig()` reads this token synchronously via `provideConfigFactory` and maps the recognised keys into Spartacus `OccConfig`. The `ENVIRONMENT` token (derived from `RUNTIME_ENVIRONMENT` with SSR→CSR TransferState handoff) is the single source of truth for all config factories.

### Why the fetch is separate from the provider (`RUNTIME_ENVIRONMENT` token design)

`/config.json` is fetched **once** in `main.ts` before bootstrap and the result is stored in the `RUNTIME_ENVIRONMENT` injection token. `provideRuntimeOccConfig()` then reads that token inside a synchronous `provideConfigFactory`.

The key benefit of this split: **multiple factories can consume the same fetch result** without triggering a second network request. For example, a customer mapping a custom key alongside the built-in OCC keys:

```ts
// app.config.ts
provideRuntimeOccConfig(), // maps OCC_BASE_URL; MEDIA_BASE_URL is wired via MediaModule.forRoot()

provideConfigFactory(() => {
  const env = inject(ENVIRONMENT, { optional: true }) ?? {};
  return env['PAYMENT_API_KEY']
    ? { myPayment: { apiKey: env['PAYMENT_API_KEY'] } }
    : {};
}),
```

Both factories share the single `ENVIRONMENT` value - `/config.json` is fetched exactly once regardless of how many consumers are registered.

### Environment variable priority (lowest → highest)

```
1. DefaultConfigChunk    library defaults  (provideDefaultConfig / provideDefaultConfigFactory)
   └── MediaModule.forRoot()      ← MEDIA_BASE_URL from /config.json  (lowest — can be overridden)
        ↓
2. ConfigChunk           static app config  (provideConfig / provideConfigFactory)
   ├── <meta name="occ-backend-base-url">  ← MetaTagConfigModule (always active)
   └── provideRuntimeOccConfig()  ← OCC_BASE_URL from /config.json
```

Last write wins within the same layer. `OCC_BASE_URL` from config.json overrides meta tags because both are at `ConfigChunk` level and `provideRuntimeOccConfig()` is registered after `MetaTagConfigModule`. `MEDIA_BASE_URL` is a `DefaultConfigChunk` default — any customer `provideConfig({ backend: { media: { ... } } })` will override it. Keys absent from config.json (or set to `""`) fall through to the lower layers unchanged.

---

## config.json format

Each key maps to an object with a `value` string and an optional `secret` flag. Secret entries are stripped before being passed to Angular - they will never appear in the browser bundle or TransferState.

```json
{
  "OCC_BASE_URL": { "value": "https://api.commerce.sap.com" },
  "MEDIA_BASE_URL": { "value": "https://api.commerce.sap.com" },
  "API_KEY": { "value": "sk-abc123", "secret": true }
}
```

Keys recognised by `provideRuntimeOccConfig()` out of the box:

| Key | Maps to |
|-----|---------|
| `OCC_BASE_URL` | `backend.occ.baseUrl` |
| `MEDIA_BASE_URL` | `backend.media.baseUrl` |

Empty string values (`"value": ""`) are treated as absent - the key is skipped and the lower-priority fallback takes effect.

---

## Step-by-step setup (opt-in)

### 1. Wire the pre-bootstrap fetch (CSR) - `main.ts`

```ts
import { getRuntimeEnvironment, RUNTIME_ENVIRONMENT } from '@spartacus/setup';

getRuntimeEnvironment().then(({ runtimeEnvironment }) => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment },
      ...appConfig.providers,
    ],
  });
});
```

`getRuntimeEnvironment()` fetches `/config.json` relative to `window.location.origin`. It short-circuits on CSR hydration when TransferState already contains the data written by SSR. It returns `{}` gracefully on 404 - the app boots normally without any runtime config.

### 2. Wire the SSR boot fetch - `server.ts`

```ts
import { getServerRuntimeEnvironment, RUNTIME_ENVIRONMENT } from '@spartacus/setup';

// Once at server startup, not per-request
const runtimeEnvironment = await getServerRuntimeEnvironment({
  url: process.env['CONFIG_URL'],
});

// Pass to ngExpressEngine via providers
{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }
```

`CONFIG_URL` must be an absolute URL (e.g. `http://localhost:4200/config.json`) because the Node process has no `window.location`. If `CONFIG_URL` is absent, `getServerRuntimeEnvironment` returns `{}` silently.

### 3. Register the OCC config provider - `app.config.ts`

```ts
import { provideRuntimeOccConfig } from '@spartacus/setup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRuntimeOccConfig(),
    // ... rest of providers
  ],
};
```

This synchronously maps `OCC_BASE_URL` from the runtime environment into `OccConfig.backend.occ.baseUrl`. `MEDIA_BASE_URL` is mapped automatically by `MediaModule.forRoot()` in `@spartacus/storefront` — no additional call needed.

### 4. Serve `config.json` locally — Spartacus Dev Proxy

In production, Caddy serves `/config.json`. Locally you need something to do the same job. The Spartacus Dev Proxy is a small Fastify server that intercepts `GET /config.json`, reads a local file from disk, and forwards every other request to `ng serve` or `dev:ssr`. It ships in `@spartacus/setup/dev-proxy`.

**Install the proxy's runtime dependencies once:**

`fastify` and `@fastify/http-proxy` are declared as `optionalDependencies` of `@spartacus/setup`. They install automatically when you run `npm install` — no separate install step needed.

**Create `src/config.json` with empty placeholder values.** This file is read by the proxy at runtime — it is **not** a build asset and must **not** be added to `angular.json` / `project.json`:

```json
{
  "OCC_BASE_URL": { "value": "" },
  "MEDIA_BASE_URL": { "value": "" }
}
```

To avoid accidentally committing real values, add it to your personal git exclude list:

```bash
echo "src/config.json" >> .git/info/exclude
```

**CSR dev (`ng serve`):** the schematic automatically creates `proxy.conf.json` at the project root and wires it into the Angular dev server `serve` target. This means the Angular dev server (port 4200) silently forwards `GET /config.json` to the Spartacus Dev Proxy on 4222; you never need to change browser ports or know that port 4222 exists.

Run both processes in separate terminals:

```bash
# Terminal 1 — Angular dev server (browser port stays 4200)
ng serve

# Terminal 2 — Spartacus Dev Proxy (serves /config.json from src/config.json)
npx spartacus-dev-proxy
```

Open `http://localhost:4200` as usual. The `GET /config.json` request will be transparently proxied to the Spartacus Dev Proxy and return the values from your local `src/config.json`.

**SSR dev (`npm run dev:ssr`):** the Node process has no dev server to proxy through, so point it directly at the proxy:

```bash
CONFIG_URL=http://localhost:4222/config.json npm run dev:ssr
```

The SSR server fetches config once at startup from the proxy.

---

## Opt-out

Do not add `provideRuntimeOccConfig()` to `app.config.ts` and do not modify `main.ts` or `server.ts`. Nothing changes - no `/config.json` fetch occurs, the app behaves exactly as it does today. There is no feature flag to set and no env var to configure.

---

## Extending with custom keys

`provideRuntimeOccConfig()` maps only `OCC_BASE_URL`. `MediaModule.forRoot()` maps `MEDIA_BASE_URL`. To map additional keys from config.json to arbitrary Spartacus config, inject `ENVIRONMENT` directly and provide your own `provideConfigFactory`:

```ts
import { inject, Provider } from '@angular/core';
import { provideConfigFactory } from '@spartacus/core';
import { ENVIRONMENT } from '@spartacus/setup';

export function provideMyCustomRuntimeConfig(): Provider[] {
  return [
    provideConfigFactory(() => {
      const env = inject(ENVIRONMENT, { optional: true }) ?? {};
      return env['PAYMENT_API_KEY']
        ? { myPayment: { apiKey: env['PAYMENT_API_KEY'] } }
        : {};
    }),
  ];
}
```

Add this provider alongside `provideRuntimeOccConfig()` in `app.config.ts`. The `ENVIRONMENT` token is already resolved (with SSR→CSR TransferState handoff) by `provideRuntimeOccConfig()` — no duplicate fetch occurs.

---

## Production deployment

When Spartacus is built and deployed via the SAP Hosting Portal, Caddy acts as the reverse proxy in front of the Angular app. Caddy is responsible for **replacing the committed placeholder `config.json`** with the actual environment-specific values at deploy time.

### What the infra team must configure

1. **Serve `/config.json` at the storefront origin** - Caddy must respond to `GET /config.json` with a JSON body in the correct format:

   ```json
   {
     "OCC_BASE_URL": { "value": "https://api-<env>.commerce.sap.com" },
     "MEDIA_BASE_URL": { "value": "https://api-<env>.commerce.sap.com/medias" }
   }
   ```

2. **Set `Cache-Control: no-store`** on `/config.json` responses. This ensures infra changes (URL rotations, key updates) are picked up on the very next page load with no delay. The file is ~200 bytes served from the same origin - caching it provides no meaningful performance benefit and risks serving stale URLs after a reconfiguration.

3. **For SSR deployments** - set the `CONFIG_URL` environment variable on the Node/Express server process to the absolute URL of the config endpoint (e.g. `http://internal-caddy/config.json`). The Node process fetches this once at server startup, not per request.

### Service Worker / PWA - critical

If the storefront runs as a PWA with a Service Worker, the SW cache is **separate from the HTTP cache** and will ignore `Cache-Control: no-store`. Without explicit exclusion, the SW may serve a months-old `config.json` from its cache after an infra reconfiguration.

Add `/config.json` to the `networkOnly` strategy in `ngsw-config.json`:

```json
{
  "dataGroups": [{
    "name": "config-json",
    "urls": ["/config.json"],
    "cacheConfig": {
      "strategy": "freshness",
      "maxAge": "0u",
      "timeout": "5s"
    }
  }]
}
```

Or in Workbox:

```ts
registerRoute('/config.json', new NetworkOnly());
```

---

## Troubleshooting

All log messages from the `/config.json` mechanism are prefixed with `[getRuntimeEnvironment]`, `[getServerRuntimeEnvironment]`, or `[provideRuntimeOccConfig]` for easy filtering.

### CSR: check the browser console and Network tab

**Symptom:** App boots but OCC calls fail or use the wrong base URL.

1. Open DevTools → **Network** tab and reload. Look for `GET /config.json`:
   - **404** - the dev proxy is not running or not reachable. Start `npx spartacus-dev-proxy` and verify that `proxy.conf.json` is present and the `serve` target in `angular.json` has `proxyConfig` set (the schematic wires this automatically).
   - **200 with empty values** - the file is served but values are empty placeholders. Fill in the real URLs in `src/config.json` (local dev) or ensure Caddy has replaced the placeholders (production).
   - **No request at all** - `getRuntimeEnvironment()` was not called in `main.ts`, or TransferState was already available (SSR hydration path - check the `<script id="ng-state">` element in the page source).

2. Open DevTools → **Console** tab. Filter for `provideRuntimeOccConfig`:
   - Enable **Verbose** level to see `debug` logs. `[provideRuntimeOccConfig] resolved backend config:` prints the final `backend` config object after runtime env is applied.
   - A `warn` log means the fetch failed and the app fell back to `{}` - the warning includes the HTTP status or error details.

### SSR: check the Node process stdout

**Symptom:** SSR renders with the wrong backend URL, or `CONFIG_URL` is set but ignored.

1. Check stdout for `[getServerRuntimeEnvironment]` lines:
   - `Successfully loaded runtime environment from <url>` - fetch succeeded. If URLs are still wrong, check the content of the response body at that URL.
   - `CONFIG_URL is not set` - the env var is missing or misspelled. Check the process environment: `echo $CONFIG_URL` in the server shell.
   - `Failed to fetch ... 404` / `Could not fetch` - the URL is wrong or the config server is unreachable. Verify the URL is absolute and reachable from the Node process (not just from the browser).

2. `CONFIG_URL` must be an **absolute URL** - e.g. `http://localhost:4200/config.json` or `http://internal-caddy/config.json`. A relative path like `/config.json` will fail in Node because there is no `window.location` to resolve against.

### Common misconfiguration checklist

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| No `/config.json` request in Network tab | `getRuntimeEnvironment()` not called in `main.ts` | Wire up `main.ts` per setup step 1 |
| `/config.json` 404 in browser | Dev proxy not running, or `proxy.conf.json` not wired | Start `npx spartacus-dev-proxy`; verify `proxy.conf.json` exists and `angular.json` serve target has `proxyConfig` |
| OCC URL is build-time value, not runtime | `provideRuntimeOccConfig()` missing from `app.config.ts` | Add it per setup step 3 |
| SSR uses wrong URL despite `CONFIG_URL` set | `CONFIG_URL` is a relative path | Use an absolute URL |
| PWA serves stale config after infra change | SW caching `/config.json` | Add `networkOnly` SW rule for `/config.json` |

The following primitives from `@spartacus/setup` are framework-agnostic and can be imported directly by the BFF project once it upgrades its `@spartacus/setup` peer dependency:

| Export | Purpose |
|--------|---------|
| `parseConfigJson(raw)` | Parses and validates config.json format, strips secrets |
| `getRuntimeEnvironment(options?)` | CSR fetch with TransferState short-circuit and 404 fallback |
| `getServerRuntimeEnvironment({ url })` | SSR fetch from absolute URL |
| `RUNTIME_ENVIRONMENT` | Generic `InjectionToken<Record<string, string>>` |

The BFF's own `provideEnvironment()` can be rebuilt on top of these primitives by providing `RUNTIME_ENVIRONMENT` with the result of `getRuntimeEnvironment()` and then reading the token in a BFF-specific factory - no need to copy the fetch logic.
