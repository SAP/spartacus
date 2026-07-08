# Spartacus Classic — BFF Reference Implementation

This document describes the complete reference implementation for integrating a Vivaldi
BFF (Backend for Frontend) with Spartacus Classic. It covers all files you need to
create or modify on both the **Spartacus Classic storefront** and the **Vivaldi BFF**
sides, and how they work together.

## Table of Contents

- [Getting started from scratch](#getting-started-from-scratch)
  - [Step 1: Create the Vivaldi BFF workspace](#step-1-create-the-vivaldi-bff-workspace)
  - [Step 2: Create the Spartacus Classic storefront](#step-2-create-the-spartacus-classic-storefront)
  - [Step 3: Convert to Nx monorepo (optional)](#step-3-convert-to-nx-monorepo-optional)
  - [Step 4: Import the storefront into the Vivaldi workspace](#step-4-import-the-storefront-into-the-vivaldi-workspace)
  - [Step 5: Configure storefrontapp as an Nx project](#step-5-configure-storefrontapp-as-an-nx-project)
  - [Step 6: Base Spartacus configuration](#step-6-base-spartacus-configuration)
- [Architecture and URL injection](#architecture-and-url-injection)
- [File overview](#file-overview)
- [Spartacus Classic changes](#spartacus-classic-changes)
  - [CRITICAL: Remove hardcoded baseUrl](#critical-remove-hardcoded-baseurl-from-spartacus-configuration)
  - [CRITICAL: OCC URL must have a CA-signed certificate](#critical-occ-url-must-have-a-valid-ca-signed-certificate-for-bff-use)
  - [1. index.html](#1-srcindexhtml)
  - [2. bff-base-url.token.ts](#2-srcappbffbff-base-urltokents-new-file)
  - [3. bff-error-handling.link.ts](#3-srcappbffbff-error-handlinglinkts-new-file)
  - [4. bff-auth.link.ts](#4-srcappbffbff-authlinkts-new-file)
  - [5. bff-timeout.link.ts](#5-srcappbffbff-timeoutlinkts-new-file)
  - [6. bff-client.service.ts](#6-srcappbffbff-clientservicets-new-file)
  - [7. app.module.server.ts](#7-srcappappmoduleserverts-modify)
  - [8. proxy.conf.js](#8-proxyconfjs-new-file-project-root)
  - [9. project.json](#9-projectjson-modify)
  - [10. .env-cmdrc](#10-env-cmdrc-modify)
  - [11. Environment files](#11-environment-files-modify)
  - [12. Example: custom BFF procedure](#12-example-custom-bff-procedure-say-hellocomponentts)
  - [13. Example: OCC call via BFF](#13-example-occ-call-via-bff-occ-base-sitescomponentts)
  - [14. bff-example.providers.ts](#14-bff-exampleprovidersts-new-file)
- [Vivaldi BFF changes](#vivaldi-bff-changes)
  - [15. env.d.ts](#15-appsbffenvdts-modify)
  - [16. vivaldi.apis.ts](#16-appsbffvivaldiapists-modify)
  - [17. destinations.ts](#17-packagescontractsbffdestinationsts-modify)
  - [18. context.ts](#18-appsbffsrcapicontextts-modify)
  - [19. occ.ts router](#19-appsbffsrcapiroutersoccts-new-file)
  - [20. root.ts](#20-appsbffsrcapiroutersrootts-modify)
  - [21. .env](#21-appsbffenv-local-dev-only)
- [Testing locally](#testing-locally)
- [Testing meta tag substitution locally](#testing-meta-tag-substitution-locally)
- [@vivaldi package upgrade — 0.25.0](#vivaldi-package-upgrade--0250)

---

## Getting started from scratch

These steps describe how to create a fresh Nx monorepo that contains both a Vivaldi BFF
and a Spartacus Classic Angular storefront, starting from nothing. Follow them in order
before applying the BFF integration changes described in the rest of this document.

---

### Step 1: Create the Vivaldi BFF workspace

Use the Vivaldi Nx generator to scaffold a workspace that already has the BFF
infrastructure in place.

```bash
npx @vivaldi/nx@0.24.9 --no-interactive --workspace=my-vivaldi-workspace --nxCloud=skip
cd my-vivaldi-workspace
```

This creates an Nx monorepo with a `apps/bff` application pre-configured for Vivaldi.

---

### Step 2: Create the Spartacus Classic storefront

**Prerequisite:** install the Angular CLI globally.

```bash
npm install -g @angular/cli@21.1.0
```

Scaffold a new Angular application and add the Spartacus schematics (optional):

```bash
ng new my-storefront-app --style=scss --ssr=false --zoneless=false \
  --file-name-style-guide=2016
cd my-storefront-app
ng add @spartacus/schematics@221121.13.1 --ssr
```

When prompted, select **Assisted services** from the feature list. Skip this step if you already have an Angular application.

---

### Step 3: Convert to Nx monorepo (optional)

If the storefront was created as a plain Angular CLI app, convert it to an Nx
integrated monorepo before importing it into the Vivaldi workspace:

```bash
# Inside my-storefront-app
npx nx@latest init --integrated
```

> **Prerequisite for the next step:** both the source (`my-storefront-app`) and the
> destination (`my-vivaldi-workspace`) must be **git repositories**. The `nx import`
> command uses git history to import the source. Run `git init && git add . && git commit -m "init"`
> in `my-storefront-app` if it is not already a git repo.

---

### Step 4: Import the storefront into the Vivaldi workspace

Run the following from the root of `my-vivaldi-workspace`:

```bash
nx import <absolute-path-to-my-storefront-app> \
  --destination-directory=apps/storefrontapp
```

When prompted:
- **Branch to import from** — choose your main branch
- **Directory to import into** — enter `apps/storefrontapp`

---

### Step 5: Configure storefrontapp as an Nx project

After importing, manual wiring is needed to make Nx aware of the Angular targets.

**5a. Install `@nx/angular` and register the plugin in `nx.json`:**

```bash
npm install --save-dev @nx/angular
```

Add to `nx.json` → `plugins` array:

```json
{
  "plugin": "@nx/angular/plugin",
  "options": {
    "buildTargetName": "build",
    "serveTargetName": "serve",
    "testTargetName": "test",
    "extractI18nTargetName": "extract-i18n",
    "serveStaticTargetName": "serve-static"
  }
}
```

**5b. Create `apps/storefrontapp/project.json`:**

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "storefrontapp",
  "projectType": "application",
  "sourceRoot": "apps/storefrontapp/src",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@angular/build:application",
      "options": {
        "outputPath": "dist/apps/storefrontapp",
        "browser": "apps/storefrontapp/src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "apps/storefrontapp/tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
          { "glob": "**/*", "input": "apps/storefrontapp/public" },
          {
            "glob": "**/*",
            "input": "node_modules/@spartacus/smartedit/assets",
            "output": "assets/"
          }
        ],
        "styles": [
          "apps/storefrontapp/src/styles.scss",
          "apps/storefrontapp/src/styles/spartacus/user.scss",
          "apps/storefrontapp/src/styles/spartacus/cart.scss",
          "apps/storefrontapp/src/styles/spartacus/order.scss",
          "apps/storefrontapp/src/styles/spartacus/checkout.scss",
          "apps/storefrontapp/src/styles/spartacus/storefinder.scss",
          "apps/storefrontapp/src/styles/spartacus/asm.scss",
          "apps/storefrontapp/src/styles/spartacus/product.scss"
        ],
        "stylePreprocessorOptions": {
          "includePaths": ["node_modules/"],
          "sass": { "silenceDeprecations": ["import"] }
        },
        "server": "apps/storefrontapp/src/main.server.ts",
        "ssr": { "entry": "apps/storefrontapp/src/server.ts" },
        "prerender": false
      },
      "configurations": {
        "production": {
          "budgets": [
            { "type": "initial", "maximumWarning": "500kB", "maximumError": "3.5mb" },
            { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }
          ],
          "outputHashing": "all"
        },
        "development": {
          "optimization": false,
          "extractLicenses": false,
          "sourceMap": true
        },
        "noSsr": { "ssr": false, "prerender": false }
      },
      "defaultConfiguration": "production"
    },
    "serve": {
      "continuous": true,
      "executor": "@angular/build:dev-server",
      "options": { "buildTarget": "storefrontapp:build" },
      "configurations": {
        "production": { "buildTarget": "storefrontapp:build:production,noSsr" },
        "development": { "buildTarget": "storefrontapp:build:development,noSsr" }
      },
      "defaultConfiguration": "development"
    },
    "test": {
      "executor": "@angular/build:unit-test",
      "options": {
        "tsConfig": "apps/storefrontapp/tsconfig.spec.json",
        "stylePreprocessorOptions": { "includePaths": ["node_modules/"] },
        "styles": [
          "apps/storefrontapp/src/styles/spartacus/user.scss",
          "apps/storefrontapp/src/styles/spartacus/cart.scss",
          "apps/storefrontapp/src/styles/spartacus/order.scss",
          "apps/storefrontapp/src/styles/spartacus/checkout.scss",
          "apps/storefrontapp/src/styles/spartacus/storefinder.scss",
          "apps/storefrontapp/src/styles/spartacus/asm.scss",
          "apps/storefrontapp/src/styles/spartacus/product.scss"
        ],
        "assets": [
          {
            "glob": "**/*",
            "input": "node_modules/@spartacus/smartedit/assets",
            "output": "assets/"
          }
        ]
      }
    }
  }
}
```

> **Important:** make sure `outputPath` is `dist/apps/storefrontapp` (not
> `dist/apps/my-storefront-app` or whatever the Angular CLI defaulted to).

**5c. Merge dependencies and clean up:**

1. Move all `dependencies` and `devDependencies` from `apps/storefrontapp/package.json`
   into the root `package.json`, resolving any version conflicts.
2. Delete `apps/storefrontapp/package.json` and `apps/storefrontapp/package-lock.json`.
3. Run `npm install` at the workspace root.
4. Verify: `nx run storefrontapp:serve` starts the app successfully.

**Known issue — `npm error code E401` during `npm ci`:**

The `package-lock.json` generated by the Angular CLI may contain resolved URLs pointing
at the SAP Artifactory mirror (`common.repositories.cloud.sap/artifactory/...`). Build
agents that only have `SAP_RBSCTOKEN` cannot authenticate against Artifactory and every
tarball fetch fails with 401 (invisible at default log level).

Fix — regenerate the lockfile against the public registry:

```bash
rm -rf node_modules package-lock.json
NPM_CONFIG_REGISTRY=https://registry.npmjs.org/ npm install
git add package-lock.json
git commit -m "chore: regenerate lockfile against public registry"
```

---

### Step 6: Base Spartacus configuration

After the import, add the minimum site-context configuration so Spartacus can
initialise. Without this the app fails to bootstrap because no `baseSite` is defined.

In `apps/storefrontapp/src/app/spartacus/spartacus-configuration.module.ts`, add:

```ts
provideConfig(<SiteContextConfig>{
  context: {
    urlParameters: ['baseSite', 'language', 'currency'],
    baseSite: ['electronics-spa', 'apparel-uk-spa'],
    currency: ['USD', 'GBP'],
  },
}),
```

This must come **before** the BFF integration changes below — the app will not serve
any page without a valid `baseSite` configuration.

---

## Architecture and URL injection

CCv2 injects backend URLs into `index.html` at deploy time by replacing placeholder
strings with real values configured on the environment variable page. This avoids
rebuilding the app per environment and prevents two known issues:

- Mutating built JS files breaks PWA Service Worker integrity checks (hash mismatch)
- Replacing values in HTML/JS files invalidates CDN cache entries

The `BFF_BASE_URL` injection token reads the substituted value from the meta tag at
Angular bootstrap time — before any component renders. `BffClientService` then uses
this URL to construct a fully typed tRPC client backed by `RootRouter`, so every call
to a BFF procedure is type-checked at compile time against the actual procedure
signatures. Auth is forwarded via a tRPC link that reads the Spartacus Bearer token
from `AuthStorageService` and injects it as an `Authorization` header before each call.

In local development, the Angular dev-server proxy forwards `/bff/*` to the real BFF
so the browser never makes a cross-origin call.

---

## File overview

### Spartacus Classic storefront

```
src/
  index.html                                  ← add bff-base-url meta tag
  app/
    app.module.ts                             ← spread bffExampleProviders
    app.module.server.ts                      ← SSR: override BFF_BASE_URL with absolute URL
    bff/
      bff-base-url.token.ts                   ← InjectionToken reading meta tag
      bff-error-handling.link.ts              ← tRPC link: SSR error propagation
      bff-auth.link.ts                        ← tRPC link: Bearer token injection
      bff-timeout.link.ts                     ← tRPC link: SSR timeout + abort
      bff-client.service.ts                   ← typed TRPCClient<RootRouter>
      examples/
        bff-example.providers.ts              ← lazy route registration
        say-hello.component.ts                ← demo: custom BFF procedure (typed)
        occ-base-sites.component.ts           ← demo: OCC call via BFF (typed)
  environments/
    models/environment.model.ts               ← add bffBaseUrl field
    environment.ts                            ← read CX_BFF_BASE_URL
    environment.prod.ts                       ← read CX_BFF_BASE_URL
proxy.conf.js                                 ← dev-server proxy (reads CX_BFF_BASE_URL)
.env-cmdrc                                    ← add CX_BFF_BASE_URL to dev profiles
project.json                                  ← point serve to proxy.conf.js
```

### Vivaldi BFF

```
apps/bff/
  env.d.ts                                    ← add OCC_BASE_URL env var type
  vivaldi.apis.ts                             ← register OCC host + occ_v2 destination
  src/api/
    context.ts                                ← keep free of vivaldi.* ambient globals
    routers/
      occ.ts                                  ← new router: OCC procedures
      root.ts                                 ← register occ router
packages/contracts/bff/
  destinations.ts                             ← add occ_v2 to createDestinations
```

---

## Spartacus Classic changes

### 1. `src/index.html`

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

### CRITICAL: Remove hardcoded `baseUrl` from Spartacus configuration

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

### CRITICAL: OCC URL must have a valid CA-signed certificate for BFF use

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

### 2. `src/app/bff/bff-base-url.token.ts` *(new file)*

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

### 3. `src/app/bff/bff-error-handling.link.ts` *(new file)*

Forwards BFF procedure errors to Angular's global `ErrorHandler`. In SSR this
causes the server to respond with an error status code rather than silently serving
a broken page. In the browser it only fires in dev mode to avoid leaking potentially
confidential information to the console.

Place this as the **first** link in the array so it can observe errors from all
subsequent links.

```ts
import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import type { Operation, TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { tap } from '@trpc/server/observable';

export class OutboundHttpError extends Error {
  constructor(cause: unknown) {
    super('Outbound HTTP Error', { cause });
  }
}

export const bffErrorHandlingLink: TRPCLink<AnyTRPCRouter> = () => {
  const errorHandler = inject(ErrorHandler);
  const platformId = inject(PLATFORM_ID);
  const logger = inject(LoggerService);

  return ({ next, op }) => {
    try {
      return next(op).pipe(
        tap({
          error: (error: unknown) => {
            if (!isPlatformBrowser(platformId) || isDevMode()) {
              errorHandler.handleError(new OutboundHttpError(error));
            }
          },
        }),
      );
    } catch (error) {
      logger.error(op.path, error);
      if (!isPlatformBrowser(platformId) || isDevMode()) {
        errorHandler.handleError(new OutboundHttpError(error));
      }
      throw error;
    }
  };
};
```

---

### 4. `src/app/bff/bff-auth.link.ts` *(new file)*

Injects the Spartacus user's Bearer token into every BFF call using the Observable-
based Spartacus auth APIs:

- `AuthService.isUserLoggedIn()` — skips token injection for anonymous sessions
  entirely, so the BFF calls OCC anonymously without an `Authorization` header.
- `AuthHttpHeaderService.getStableToken()` — waits for any in-progress token refresh
  to complete before reading the token, preventing 401s caused by attaching a
  mid-refresh expired token.
- `Injector` lazy injection — breaks the circular dependency that `AuthService`
  creates with Angular's DI graph at module initialisation time.

This link must be placed **before** `createTerminationLink`. Vivaldi's termination
link intentionally omits `headers` and `fetch` from its options, so auth must be
injected at the link layer via `OperationHeaders`.

Requires `@vivaldi/angular` (`npm install @vivaldi/angular`).

```ts
import { inject, Injector } from '@angular/core';
import { AuthHttpHeaderService, AuthService, AuthToken } from '@spartacus/core';
import type { Operation, TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { fromRxObservable, toRxObservable } from '@vivaldi/angular/utils';
import { OperationHeaders } from '@vivaldi/trpc/universal';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

export const bffAuthLink: TRPCLink<AnyTRPCRouter> = () => {
  const injector = inject(Injector);

  return ({ next, op }) => {
    const authService = injector.get(AuthService);
    const authHeaderService = injector.get(AuthHttpHeaderService);

    return fromRxObservable(
      authService.isUserLoggedIn().pipe(
        switchMap((isLoggedIn) =>
          isLoggedIn ? authHeaderService.getStableToken() : of(undefined),
        ),
        switchMap((token) =>
          toRxObservable(
            token ? next(createAuthHeader(op, token)) : next(op),
          ),
        ),
        first(),
      ),
    );
  };
};

function createAuthHeader(op: Operation, token: AuthToken) {
  const headers = new OperationHeaders(op);
  const tokenType = token.token_type || 'Bearer';
  const accessToken = token.access_token;

  if (!accessToken || typeof accessToken !== 'string') {
    return op;
  }

  // Strip newlines — Node.js rejects header values containing \r or \n with
  // "Invalid character in header content". OAuth tokens can contain newline
  // characters from base64 padding or copy-paste artefacts.
  const sanitizedToken = accessToken.replace(/[\r\n]/g, '');

  return headers.append('Authorization', `${tokenType} ${sanitizedToken}`);
}
```

---

### 5. `src/app/bff/bff-timeout.link.ts` *(new file)*

Aborts BFF calls that exceed a platform-specific timeout:

- **SSR**: 20-second default. A hung BFF call stalls the Node render indefinitely —
  the timeout aborts the fetch via `AbortController` and throws, allowing the SSR
  error handler to respond with 500.
- **Browser**: no timeout by default. The browser's own network stack handles
  stalled requests.
- **Dev mode**: the SSR timeout also applies in the browser so issues surface during
  development.

Place this as the **last** link before `createTerminationLink` so the `AbortController`
signal reaches the fetch.

Requires `@vivaldi/angular` (`npm install @vivaldi/angular`).

```ts
import { isPlatformBrowser } from '@angular/common';
import { inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import type { TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { fromRxObservable, toRxObservable } from '@vivaldi/angular/utils';
import { timeout, catchError, TimeoutError } from 'rxjs';

const DEFAULT_SSR_TIMEOUT_MS = 20_000;

export const bffTimeoutLink: TRPCLink<AnyTRPCRouter> = () => {
  const platformId = inject(PLATFORM_ID);
  const logger = inject(LoggerService);

  return ({ next, op }) => {
    const isBrowser = isPlatformBrowser(platformId);
    const timeoutMs = isBrowser ? undefined : DEFAULT_SSR_TIMEOUT_MS;

    if (!timeoutMs && !isDevMode()) {
      return next(op);
    }

    const effectiveTimeout = timeoutMs ?? DEFAULT_SSR_TIMEOUT_MS;
    const abortController = new AbortController();
    op.signal = abortController.signal;

    return fromRxObservable(
      toRxObservable(next(op)).pipe(
        timeout(effectiveTimeout),
        catchError((error) => {
          if (error instanceof TimeoutError) {
            abortController.abort();
            const message = `BFF procedure "${op.path}" timed out after ${effectiveTimeout}ms.`;
            logger.warn(message);
            throw new Error(message, { cause: error });
          }
          throw error;
        }),
      ),
    );
  };
};
```

---

### 6. `src/app/bff/bff-client.service.ts` *(new file)*

Typed tRPC client for the BFF. Wires all four links in the correct order and binds
the client to `RootRouter` from `@repo/bff/clients` (type-only import — never
included in the browser bundle).

Every procedure call is fully type-checked at compile time. TypeScript infers input
and return types directly from the BFF router definition — no manual generic
annotations needed.

**Link order matters:**

| Position | Link | Purpose |
|---|---|---|
| 1st | `bffErrorHandlingLink` | Observes all errors; forwards to `ErrorHandler` in SSR |
| 2nd | `bffAuthLink` | Injects `Authorization` header when user is logged in |
| 3rd | `bffTimeoutLink` | Aborts calls that exceed the SSR timeout |
| 4th | `createTerminationLink` | Vivaldi's HTTP link (superjson, OTEL, error envelope) |

```ts
import { Injectable, inject } from '@angular/core';
import { createTRPCClient, createTerminationLink } from '@vivaldi/trpc/client';
import type { RootRouter } from '@repo/bff/clients';
import { BFF_BASE_URL } from './bff-base-url.token';
import { bffErrorHandlingLink } from './bff-error-handling.link';
import { bffAuthLink } from './bff-auth.link';
import { bffTimeoutLink } from './bff-timeout.link';

@Injectable({ providedIn: 'root' })
export class BffClientService {
  readonly client;

  constructor() {
    const bffBaseUrl = inject(BFF_BASE_URL);

    this.client = createTRPCClient<RootRouter>({
      links: [
        bffErrorHandlingLink,
        bffAuthLink,
        bffTimeoutLink,
        createTerminationLink<RootRouter>({ url: bffBaseUrl }),
      ],
    });
  }
}
```

**Usage:**
```ts
// Return type inferred from RootRouter — no generic needed
const res = await this.bff.client.sample.sayHello.query({ name: 'Spartacus' });
console.log(res.message); // string

// TypeScript errors if input or property is wrong:
const bad = await this.bff.client.sample.sayHello.query({ name: 123 }); // ← compile error
```

---

### 7. `src/app/app.module.server.ts` *(modify)*

In SSR, Node.js has no document origin so the relative `/bff/api` fallback from the
meta tag cannot be resolved. Override `BFF_BASE_URL` with an absolute URL from the
environment:

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
      useValue: process.env['BFF_BASE_URL'] ?? 'http://localhost:8482/api',
    },
  ],
})
export class AppServerModule {}
```

---

### 8. `proxy.conf.js` *(new file, project root)*

Reads `CX_BFF_BASE_URL` at dev-server startup and sets the proxy target dynamically.
The browser always calls `/bff/api` (same origin — no CORS).

In `@vivaldi` 0.25.0 the BFF runs as a plain HTTP server (no self-signed cert) and
mounts tRPC at `/api` directly (no `/bff` prefix). The `pathRewrite` strips the `/bff`
prefix added by the storefront before forwarding to the BFF.

```js
const bffBaseUrl =
  process.env['CX_BFF_BASE_URL'] || 'http://localhost:8482/api';
const bffTarget = new URL(bffBaseUrl).origin;

module.exports = {
  '/bff': {
    target: bffTarget,
    secure: false,
    changeOrigin: true,
    ws: false,
    logLevel: 'info',
    // Strip the /bff prefix: storefront calls /bff/api/... → BFF receives /api/...
    pathRewrite: { '^/bff': '' },
  },
};
```

---

### 9. `project.json` *(modify)*

Point the `serve` target at `proxy.conf.js`:

```json
"serve": {
  "executor": "@angular-builders/custom-esbuild:dev-server",
  "options": {
    "proxyConfig": "projects/storefrontapp/proxy.conf.js"
  }
}
```

---

### 10. `.env-cmdrc` *(modify)*

Add `CX_BFF_BASE_URL` to each dev profile. Used **only** by `proxy.conf.js` at
dev-server startup — never read by the Angular app itself:

```jsonc
{
  "dev": {
    "CX_BASE_URL": "https://your-commerce-host",
    "CX_BFF_BASE_URL": "http://localhost:8482/api"
  }
}
```

> **Note:** In `@vivaldi` 0.25.0 the BFF runs as a plain HTTP server on port 8482
> with tRPC at `/api` (no `/bff` prefix). The proxy's `pathRewrite` handles the
> prefix mismatch between storefront (`/bff/api`) and BFF (`/api`).

---

### 11. Environment files *(modify)*

```ts
// environment.model.ts — add field
export interface Environment {
  bffBaseUrl?: string;
  // ... existing fields
}

// environment.ts
bffBaseUrl: buildProcess.env.CX_BFF_BASE_URL ?? '/bff/api',

// environment.prod.ts
bffBaseUrl: buildProcess.env.CX_BFF_BASE_URL,
```

> **Note:** `environment.bffBaseUrl` is not used by the Angular app at runtime.
> It exists only to make `CX_BFF_BASE_URL` available to `proxy.conf.js` via the
> build-time esbuild plugin. The app reads the BFF URL from the meta tag via
> `BFF_BASE_URL` token, not from the environment object.

---

### 12. Example: custom BFF procedure (`say-hello.component.ts`)

Route: `/bff-say-hello`

Calls `sample.sayHello` via `BffClientService`. The input type `{ name?: string }` and
return type `{ message: string }` are both inferred from `RootRouter` — no manual
annotations. TypeScript will error if either is wrong.

```ts
export class SayHelloComponent {
  private readonly bff = inject(BffClientService);

  async sayHello(): Promise<void> {
    const res = await this.bff.client.sample.sayHello.query({ name: this.name });
    this.message.set(res.message); // res.message: string — inferred
  }
}
```

---

### 13. Example: OCC call via BFF (`occ-base-sites.component.ts`)

Route: `/occ-base-sites`

Calls `occ.getBaseSites` via `BffClientService`. The BFF procedure proxies to
`GET /occ/v2/basesites` on the OCC backend. The return type is inferred from
`RootRouter`.

```ts
export class OccBaseSitesComponent {
  private readonly bff = inject(BffClientService);

  async load(): Promise<void> {
    const res = await this.bff.client.occ.getBaseSites.query();
    this.result.set(res); // fully typed response from OCC
  }
}
```

---

### 14. `bff-example.providers.ts` *(new file)*

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

Spread into `app.module.ts` providers: `providers: [privateProviders, ...bffExampleProviders]`

> **Important:** Register `bffExampleProviders` directly in `NgModule.providers`, not
> inside `makeEnvironmentProviders()`. Lazy routes registered via the `ROUTES` token
> inside `makeEnvironmentProviders()` cause Angular pending task leaks.

---

## Vivaldi BFF changes

### 15. `apps/bff/env.d.ts` *(modify)*

Declare `OCC_BASE_URL` so Vivaldi's typed env system recognises it:

```ts
declare global {
  interface VivaldiCustomEnv {
    FRONTEND_BASE_URL: string;
    OCC_BASE_URL: string;
  }
}
export {};
```

---

### 16. `apps/bff/vivaldi.apis.ts` *(modify)*

Register the OCC backend as a host and expose it as the `occ_v2` destination.
Vivaldi auto-discovers this file — no change to `vivaldi.ts` needed.

```ts
import { $, type VivaldiApi } from '@vivaldi/config';

const hosts = [
  {
    name: 'occ',
    origin: $.OCC_BASE_URL,
  },
] satisfies VivaldiApi['hosts'];

export default {
  hosts,
  apis: [
    {
      name: 'occ_v2',
      destination: {
        host: 'occ',
        path: '/occ/v2',
      },
    },
  ],
} satisfies VivaldiApi<typeof hosts>;
```

---

### 17. `packages/contracts/bff/destinations.ts` *(modify)*

Expose `occ_v2` to the tRPC context so procedures can call `ctx.destinations.occ.v2()`:

```ts
import { createDestinations } from '@vivaldi/config';

export default createDestinations(['occ_v2']);
```

---

### 18. `apps/bff/src/api/context.ts` *(modify)*

Rewrite using a typed interface that extends `RequiredContext`. This is required so
the storefrontapp's typecheck can walk into BFF source files via the `@repo/bff/clients`
path alias without encountering `vivaldi.*` ambient globals, which are only declared in
`apps/bff/tsconfig.app.json` and not in the storefront tsconfig.

```ts
import type { RequiredContext } from '@vivaldi/config';
import { destinations } from '@repo/bff/contracts';

export interface Context extends RequiredContext {
  greeting: string;
}

export const createContext: () => Promise<Context> = async () => ({
  destinations,
  greeting: 'Hello',
});
```

> **Why this matters for type safety:** `@repo/bff/clients` re-exports `RootRouter`
> from the BFF router, which transitively imports `context.ts`. If `context.ts`
> references `vivaldi.env.isDev`, the storefront typecheck fails with
> `Cannot find name 'vivaldi'`. Keeping `context.ts` free of ambient globals ensures
> both the BFF and the storefront can type-check cleanly from the same source.

---

### 19. `apps/bff/src/api/routers/occ.ts` *(new file)*

tRPC router for OCC proxy procedures. Each procedure forwards to OCC via
`ctx.execute.http` and the `occ_v2` destination. The `Authorization` header from the
storefront is forwarded to OCC via `ctx.forwardHeaders`.

The `occV2` helper casts `ctx.destinations` to the concrete type from
`@repo/bff/contracts` — necessary because the Vivaldi context types the destinations
map generically, but `createDestinations(['occ_v2'])` produces a strongly typed accessor.

```ts
import { HttpRequestBuilder } from '@vivaldi/connectivity';
import { destinations } from '@repo/bff/contracts';
import { ProcedureParams } from '@vivaldi/trpc';
import { z } from 'zod';
import { Context } from '../context';
import { publicProcedure, router } from '../trpc';

type TypedDestinations = typeof destinations;
const occV2 = (ctx: { destinations: Context['destinations'] }) =>
  (ctx.destinations as unknown as TypedDestinations).occ.v2();

const getBaseSitesHeaders = {
  authorization: z.string().optional(),
};

export type getBaseSitesOptions = ProcedureParams<
  Context,
  z.ZodUndefined,
  typeof getBaseSitesHeaders
>;

export const getBaseSitesFn = async ({ ctx }: getBaseSitesOptions) => {
  return ctx.execute.http(
    HttpRequestBuilder.get<unknown>('/basesites').addCustomHeaders({
      authorization: ctx.forwardHeaders['authorization'],
    }),
    occV2(ctx),
  );
};

export const occ = router({
  getBaseSites: publicProcedure
    .meta({ headers: getBaseSitesHeaders })
    .query(getBaseSitesFn),
});
```

To add more OCC procedures, follow the same pattern — `HttpRequestBuilder.get/post`
with the desired path (relative to `/occ/v2`), forwarded headers, and `occV2(ctx)`.

---

### 20. `apps/bff/src/api/routers/root.ts` *(modify)*

Register the new `occ` router alongside `sample`:

```ts
import { createCallerFactory, router } from '../trpc';
import { occ } from './occ';
import { sample } from './sample';

export const rootRouter = router({
  occ,
  sample,
});

export type RootRouter = typeof rootRouter;
export const createCaller = createCallerFactory(rootRouter);
```

---

### 21. `apps/bff/.env` *(local dev only)*

Set `OCC_BASE_URL` for local BFF development. Must be a hostname with a **CA-signed
certificate** — the BFF container on CCv2 runs Node.js in production mode which rejects
self-signed certs. For deployed environments, set this in the CCv2 BFF VariableSet.

```bash
OCC_BASE_URL=https://api.your-commerce-host.model-t.myhybris.cloud
```

---

## Testing locally

```bash
# Terminal 1 — start the BFF (builds and runs dist/apps/bff/vivaldi.mjs)
OCC_BASE_URL=https://your-occ-host npm run dev:bff

# Terminal 2 — start Spartacus
npm run start

# Navigate to:
# http://localhost:4200/electronics-spa/en/USD/bff-say-hello
# http://localhost:4200/electronics-spa/en/USD/occ-base-sites
```

**Verify the Cloudflare cookie fix (should return a result, not "Invalid character"):**
```bash
curl -H "cookie: __cf_bm=any-test-value" \
  'http://localhost:8482/api/sample.sayHello?input=%7B%22json%22%3A%7B%7D%7D'
# Expected: {"result":{"data":{"json":{"message":"Hello world!"}}}}
```

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

---

## @vivaldi package upgrade — 0.25.0

### Cloudflare `__cf_bm` cookie bug (fixed in 0.25.0)

**Symptom:** Every BFF request on CCv2 returns `{"message":"Invalid character","code":-32603}`
even for procedures that do nothing (like `sample.sayHello`). The error fires before any
procedure logic runs, responds in ~4ms, and affects all routes uniformly.

**Root cause:** `@vivaldi/connectivity@0.24.x` uses `__` as an internal separator to encode
cookies it forwards between the BFF and upstream APIs (format:
`<hostName>__<base64Path>__<base36Timestamp>__<cookieName>`). The `parseClientCookie`
function checks `cookie.includes('__')` — if true, it tries to split and parse the key as
a Vivaldi-encoded cookie. Cloudflare's `__cf_bm` bot-management cookie also contains `__`,
so `parseClientCookie('__cf_bm')` enters the parse path. Splitting `'__cf_bm'` on `'__'`
produces only 2 parts instead of the expected 4, so the code calls
`decodePathAttribute('cf_bm')` which tries `atob('cf_bm')` → **invalid base64 →
throws "Invalid character"**. This runs in the `CookieManager` constructor on every
single request on CCv2 (which is behind Cloudflare and always sends `__cf_bm`).

**Fix:** `@vivaldi/connectivity@0.25.0` adds a guard:
`if (!host || cookieName.length === 0) return undefined` — any cookie that splits into
fewer than 4 parts is silently skipped as a non-Vivaldi cookie.

**Source:** `/Users/I760319/code/vivaldi/libs/connectivity/src/cookies/cookie-manager.ts`,
function `parseClientCookie`.

### Upgrading to 0.25.0

**New packages required:**

```bash
npm install @vivaldi/auth@0.25.0 @dapr/dapr@^3.17.0
npm install @vivaldi/cli@0.25.0 @vivaldi/common@0.25.0 @vivaldi/config@0.25.0 \
  @vivaldi/connectivity@0.25.0 @vivaldi/errors@0.25.0 @vivaldi/fastify@0.25.0 \
  @vivaldi/nx@0.25.0 @vivaldi/testing@0.25.0 @vivaldi/trpc@0.25.0 \
  @vivaldi/vitest@0.25.0 @vivaldi/angular@0.25.0
```

- `@vivaldi/auth` — new peer dep of `@vivaldi/fastify`. The `auth` field in `vivaldi.ts`
  is optional — no code change needed, just install it.
- `@dapr/dapr` — new dep of `@vivaldi/fastify@0.25.0`.

**`vivaldi dev bff` CLI command removed.** The `dev` subcommand is gone from the 0.25.0
CLI. Replace `apps/bff/project.json` `serve` target:

```json
"serve": {
  "continuous": true,
  "executor": "nx:run-commands",
  "options": {
    "commands": [
      "vivaldi build bff && node --experimental-vm-modules dist/apps/bff/vivaldi.mjs"
    ],
    "parallel": false
  }
}
```

And `package.json`:
```json
"dev:bff": "nx serve bff"
```

**URL changes in 0.25.0.** The BFF now runs as a plain HTTP server (no self-signed cert)
and mounts tRPC at `/api` directly — the `/bff` dev prefix only existed in the old
`vivaldi dev` wrapper:

| | 0.24.x (`vivaldi dev bff`) | 0.25.0 (`node vivaldi.mjs`) |
|---|---|---|
| Protocol | HTTPS (self-signed) | HTTP |
| tRPC prefix | `/bff/api` | `/api` |
| SSR default URL | `https://localhost:8482/bff/api` | `http://localhost:8482/api` |
| `.env-cmdrc` value | `https://localhost:8482/bff/api` | `http://localhost:8482/api` |

Update `proxy.conf.js` to add a `pathRewrite` that strips the storefront's `/bff` prefix
before forwarding to the BFF:

```js
module.exports = {
  '/bff': {
    target: 'http://localhost:8482',
    secure: false,
    changeOrigin: true,
    ws: false,
    logLevel: 'info',
    pathRewrite: { '^/bff': '' },  // /bff/api/... → /api/...
  },
};
```

Update `app.module.server.ts` SSR fallback:
```ts
process.env['BFF_BASE_URL'] ?? 'http://localhost:8482/api'
```

