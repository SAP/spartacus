# Runtime Config via `/config.json` — `@spartacus/setup`

**Ticket:** [CXSPA-12541](https://jira.tools.sap/browse/CXSPA-12541)

---

## Overview

SAP Commerce Cloud Hosting Portal deploys container images. Without this feature, changing
the OCC backend URL (e.g. staging vs. production) requires a full frontend rebuild and
re-deploy — every environment swap needs a new build artifact.

`/config.json` runtime config lets the hosting platform inject environment-specific values
(backend URLs, etc.) at container startup by serving a small JSON file alongside the app.
The Angular app fetches it **before bootstrap**, so no rebuild is needed to change
environments.

The approach was ported from the Spartacus BFF ([CXSPA-11078](https://jira.tools.sap/browse/CXSPA-11078) / [BFF PR #1181](https://github.tools.sap/cx-commerce-storefronts/spartacus-bff/pull/1181))
with the key deviations described below.

---

## Key Deviations from the BFF Implementation

| BFF | This port |
|-----|-----------|
| Generic `ENVIRONMENT` token (BFF-owned) | Uses `ENVIRONMENT` token from `@spartacus/core` — same token, no duplication |
| `provideEnvironment()` maps to a BFF-specific `Environment` interface | `provideRuntimeOccConfig()` maps directly to Spartacus `OccConfig` |
| `getServerRuntimeEnvironment` throws if `CONFIG_URL` is absent | Logs a warning and returns `{}` — SSR still starts, falls back to build-time config |
| TransferState key `__ENV__` | Uses `cx-runtime-config` to avoid collisions with other Spartacus state |
| Static `config.json` served by Angular DevServer | Full dev proxy (`@spartacus/setup/dev-proxy`) on port 4222 — matches production topology |

---

## File Structure

```
core-libs/setup/
├── config-json/
│   ├── parse-config-json.ts                 # Parses { KEY: { value, secret } } → flat record
│   ├── parse-config-json.spec.ts
│   ├── get-runtime-environment.ts           # CSR: pre-bootstrap fetch of /config.json
│   ├── get-runtime-environment.spec.ts
│   ├── get-server-runtime-environment.ts    # SSR: fetch at server boot (not per-request)
│   ├── get-server-runtime-environment.spec.ts
│   ├── provide-environment.ts               # Wires ENVIRONMENT token + TransferState handoff
│   ├── provide-runtime-occ-config.ts        # Maps OCC_BASE_URL → OccConfig via CONFIG_INITIALIZER
│   ├── provide-runtime-occ-config.spec.ts
│   ├── runtime-environment.token.ts         # RUNTIME_ENVIRONMENT InjectionToken (importable standalone)
│   └── index.ts                             # Barrel
└── dev-proxy/
    ├── config-proxy-server.ts               # Fastify-based reverse proxy (startDevProxy)
    ├── defaults.ts                           # DEFAULT_DEV_PROXY_CONFIG (port 4222)
    ├── types.ts
    ├── run.ts                                # CLI entry point (spartacus-dev-proxy bin)
    └── index.ts
```

Everything is re-exported from `core-libs/setup/public_api.ts` via `export * from './config-json/index'`.

---

## `config.json` Format

The Hosting Portal serves (and the dev proxy reads) this format:

```json
{
  "OCC_BASE_URL": { "value": "https://api.commerce.sap.com" },
  "MEDIA_BASE_URL": { "value": "https://media.commerce.sap.com" },
  "API_KEY": { "value": "sk-abc123...", "secret": "true" }
}
```

- Each key is a flat string name; the value is an object with `value` (string) and optional `secret`.
- `secret: "true"` (string) and `secret: true` (boolean) are both handled — the Hosting Portal uses the string form.
- `parseConfigJson(raw, { excludeSecrets: true })` must always be used in both CSR and SSR paths so secrets never reach the browser.

**Currently mapped keys:**

| `config.json` key | Spartacus config target |
|---|---|
| `OCC_BASE_URL` | `backend.occ.baseUrl` |
| `MEDIA_BASE_URL` | wired automatically via `MediaModule.forRoot()` in `@spartacus/storefront` |

---

## CSR Bootstrap Wiring (`main.ts`)

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

`getRuntimeEnvironment()` behaviour:
- Checks for `<script id="ng-state">` in the DOM first. If TransferState from SSR is present, returns `{}` immediately (config will be read from TransferState by `provideEnvironment()`).
- Otherwise fetches `/config.json` (or a custom URL via `options.url`).
- On 404 or any fetch error: logs a warning and returns `{}` — app bootstraps normally using build-time / meta-tag config as fallback.

---

## SSR Boot Wiring (`server.ts`)

```ts
import { getServerRuntimeEnvironment, RUNTIME_ENVIRONMENT } from '@spartacus/setup';

const runtimeEnvironment = await getServerRuntimeEnvironment({
  url: process.env['CONFIG_URL'],
});

// provide runtimeEnvironment to every Angular render request:
{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }
```

`getServerRuntimeEnvironment()` behaviour:
- Called **once at server boot**, not per-request.
- `CONFIG_URL` must be an absolute URL (`https://...`). Relative URLs are not valid in a Node.js `fetch` call.
- If `CONFIG_URL` is absent: logs a warning and returns `{}` — server starts normally, falls back to build-time config.
- On fetch error: logs a warning and returns `{}`.
- On success: logs an info message with the URL.

---

## Provider (`app.config.ts`)

```ts
import { provideRuntimeOccConfig } from '@spartacus/setup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRuntimeOccConfig(),
    // ...other providers
  ],
};
```

`provideRuntimeOccConfig()` does two things:
1. Calls `provideEnvironment()` which wires the `ENVIRONMENT` token with a `TransferState` read/write — SSR writes to `cx-runtime-config`, CSR reads it back on hydration.
2. Registers a `provideConfigFactory` that maps `ENVIRONMENT['OCC_BASE_URL']` → `{ backend: { occ: { baseUrl } } }` via the `CONFIG_INITIALIZER` mechanism.

---

## Opt-in / Opt-out

- **Opt-in:** add `provideRuntimeOccConfig()` to `app.config.ts` and the `getRuntimeEnvironment()` / `getServerRuntimeEnvironment()` calls to `main.ts` / `server.ts`. The schematics do this automatically.
- **Opt-out:** omit the provider entirely. Existing projects are unaffected — no feature toggle, no env var gate. Not calling the provider is a zero-cost opt-out.
- **Graceful degradation:** if `/config.json` returns 404 or is missing, the app falls back to build-time config (meta-tags, `environment.ts`). The feature never breaks an app that hasn't deployed `/config.json` yet.

---

## Schematics

Two schematics wire up the feature automatically:

| Command | Effect |
|---|---|
| `ng add @spartacus/schematics --runtime-config` | Full install including runtime config wiring |
| `ng generate @spartacus/schematics:add-runtime-config` | Adds runtime config to an existing Spartacus app |
| `ng generate @spartacus/schematics:add-runtime-config --ssr` | Also patches `server.ts` for SSR |

The schematics create:
- `config.json` at the project root (placeholder values)
- `proxy.conf.json` pointing to the dev proxy at `http://localhost:4222`
- `proxyConfig` entry in `angular.json`
- `main.ts` wrapped with `getRuntimeEnvironment()`
- `app.config.ts` with `provideRuntimeOccConfig()`
- `server.ts` patched with `getServerRuntimeEnvironment()` (SSR only)

---

## Local Dev: Dev Proxy

The dev proxy (`@spartacus/setup/dev-proxy`) replicates the production Hosting Portal topology locally:

```
[Browser] → [Spartacus Dev Proxy :4222] → [Angular Dev Server :4200]
```

The proxy serves `config.json` from a local file at `/config.json` and forwards all other
requests upstream to the Angular dev server. This avoids needing to add `config.json` as
a build asset and matches what the Hosting Portal does in production.

**Start the proxy:**
```bash
npx spartacus-dev-proxy
# or via ts-node in development:
npx ts-node core-libs/setup/dev-proxy/run.ts
```

**Environment variables:**

| Variable | Default | Description |
|---|---|---|
| `SPARTACUS_DEV_PROXY_PORT` | `4222` | Port the proxy listens on |
| `SPARTACUS_DEV_PROXY_CONFIG_SOURCE_PATH` | `./config.json` | Local path to the config file |
| `SPARTACUS_DEV_PROXY_UPSTREAM_URL` | `http://localhost:4200` | Angular dev server URL |

The proxy is implemented with Fastify + `@fastify/http-proxy`. These are `optionalDependencies`
in `@spartacus/setup/package.json` and are loaded via `createRequire` at runtime so they
resolve from the consuming app's `node_modules` rather than the published package dist.

---

## Data Flow Summary

### CSR (browser-only, no SSR)

```
main.ts
  └─ getRuntimeEnvironment()         fetch /config.json (or {} on error)
       └─ bootstrapApplication()
            └─ provideRuntimeOccConfig()
                 └─ ENVIRONMENT token ← RUNTIME_ENVIRONMENT
                 └─ OccConfig.backend.occ.baseUrl ← ENVIRONMENT['OCC_BASE_URL']
```

### SSR + CSR Hydration

```
server.ts boot
  └─ getServerRuntimeEnvironment()   fetch CONFIG_URL (or {} if absent/error)
       └─ per-request Angular render
            └─ provideRuntimeOccConfig()
                 └─ ENVIRONMENT token ← RUNTIME_ENVIRONMENT
                 └─ TransferState['cx-runtime-config'] ← ENVIRONMENT  (written by SSR)
                 └─ OccConfig.backend.occ.baseUrl ← ENVIRONMENT['OCC_BASE_URL']

browser hydration (main.ts)
  └─ getRuntimeEnvironment()         detects <script id="ng-state"> → returns {}
       └─ bootstrapApplication()
            └─ provideRuntimeOccConfig()
                 └─ ENVIRONMENT token ← TransferState['cx-runtime-config']  (read from SSR)
                 └─ OccConfig.backend.occ.baseUrl ← ENVIRONMENT['OCC_BASE_URL']
```

---

## End-to-End Scenario Tests

`tools/schematics/runtime-config-json-scenario-tests.ts` is a standalone script that
verifies the schematics work correctly against a real Angular CLI installation. It solves
the problem of manually re-running ~10 steps per scenario after any schematic change —
instead, a single command creates real Angular apps from scratch, runs the schematics, and
asserts both file outputs and `ng build` success.

**Three scenarios covered:**

| Scenario | What it tests |
|---|---|
| A | `ng add --runtime-config` — all wiring added (`config.json`, proxy, `main.ts`, `app.config.ts`, `server.ts` via SSR schematic) |
| B | `ng add` without `--runtime-config` — confirms zero runtime config wiring is injected |
| C | Upgrade from public npm Spartacus to a local/branch version — confirms no runtime config wiring appears as a side-effect of upgrading |

**Usage** (Verdaccio must be running — see `docs/CXSPA-12541-local-testing-guide.md`):

```bash
npx ts-node ./tools/schematics/runtime-config-json-scenario-tests.ts \
  --scenario all \
  --out-dir ~/Desktop/cx-test \
  --app-name myapp
```

Pass `--no-git` to skip per-step git commits in the generated apps (faster, no history).

---

## BFF Reuse

The three pure utility files (`parse-config-json.ts`, `get-runtime-environment.ts`,
`get-server-runtime-environment.ts`) have no BFF-specific dependencies. Once BFF upgrades
its `@spartacus/setup` peer dependency to the version that ships these utilities, it can
remove its own copies and import from `@spartacus/setup` directly.

The `RUNTIME_ENVIRONMENT` token is exported from `runtime-environment.token.ts` as a
standalone file so BFF (or any consumer) can import just the token without pulling in the
OCC mapping logic.
