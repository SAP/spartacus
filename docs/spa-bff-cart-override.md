# Spartacus + BFF — Replacing Direct OCC Integration

> **The story this document tells:**
> A Spartacus storefront that talks directly to OCC works — but the browser
> makes multiple sequential round trips to assemble a single page, credentials
> are visible in DevTools, error messages are meaningless, and every OCC API
> change requires a coordinated storefront release. This document shows each of
> those problems with working code and demonstrates how a BFF fixes them. It is
> honest about what the current implementation does and does not yet improve.

> **Prerequisite:** This document assumes the base BFF integration from
> [spa-bff-reference-implementation.md](./spa-bff-reference-implementation.md)
> is already in place. That guide covers setting up the Vivaldi BFF workspace,
> wiring `BffClientService`, configuring the Angular dev-server proxy, and the
> CCv2 deployment model. The overrides described here build directly on that
> baseline.

---

## Two approaches to BFF integration

There are two distinct ways to integrate a BFF with a Spartacus storefront.
Understanding the difference matters before reading the rest of this document.

### Approach A — Connector override (this document)

The starting point is a **standard Spartacus Classic storefront**. The BFF is
introduced as a drop-in replacement at the connector layer, without touching
UI components, NgRx state, effects, or facades. Everything above the connector
continues to work exactly as before.

```
Standard Spartacus stack:
  AddToCartComponent → ActiveCartService → NgRx effects → CartConnector
                                                                ↓
                                              [replaced: BffCartConnector]
                                                                ↓
                                         BffClientService → tRPC → BFF → OCC
```

The rest of the OCC layer (`OccCartAdapter`, normalizers, endpoint config) is
still in the bundle — it is simply no longer called. The BFF is bolted on.

**What this gives you:**
- Incremental migration — one feature at a time, no rewrite required
- All existing Spartacus components, customisations, and upgrade paths stay intact
- A BFF can be introduced into a running production storefront

**What it does not give you:**
- Fully clean architecture — unused OCC code remains in the browser bundle
- Complete ownership separation — the storefront still carries OCC concepts
  (normalizers, adapter interfaces, endpoint keys) even if it no longer calls them

**This is what this document describes.**

---

### Approach B — Purpose-built BFF storefront (spartacus-bff)

The starting point is **not a standard Spartacus storefront**. The entire OCC
layer is replaced by purpose-built Angular libraries (`@spartacus-bff/cart`,
`@spartacus-bff/checkout`, etc.) designed from scratch to talk to BFF via tRPC.
There are no `OccCartAdapter`, no `CartConnector`, no normalizer chains.

```
spartacus-bff stack:
  AddToCartComponent → CartFacade (CartService)
                            ↓
                       injectTRPCClient()   ← typed tRPC client, Angular DI
                            ↓
                       client.spartacus.mcs.auth.cart.addToCart.v1.mutateState$()
                            ↓
                       BFF → OCC
```

`CartRootModule.forRoot(injectTRPCClient)` wires the typed client directly into
Angular DI. The facade calls BFF procedures directly — no adapter, no connector,
no NgRx effects between the facade and the network call.

**What this gives you:**
- Clean architecture — the storefront has no knowledge of OCC at all
- Type safety from UI component to OCC response, end-to-end
- BFF procedures are proper server-side business logic with converters, error
  handling, and retries — not proxies
- No OCC dead code in the browser bundle

**What it requires:**
- A full adoption of the `@spartacus-bff/*` library suite — no incremental path
- The BFF procedures become the published API surface; changes are versioned

A reference implementation of this approach is available in the
`spartacus-bff` workspace.

---

### The relationship between them

**Approach A** is the migration path — it is how an existing customer on
Spartacus Classic gains BFF benefits without rebuilding their storefront. The
Angular DI gymnastics documented below (lazy chunk overrides, inline class
definitions) exist precisely because BFF is being bolted onto an architecture
designed for direct OCC.

**Approach B** is the target architecture — what a new storefront would be
built on, or what an existing storefront would move to over time by replacing
feature modules one by one with their `@spartacus-bff/*` equivalents.

This document is about **Approach A** — demonstrating that the migration is
viable, documenting the DI problems you encounter, and showing the concrete
benefits even in the connector-override form.

---

## Table of Contents

- [The performance problem — PDP sequential calls](#the-performance-problem)
- [The security problem — credentials reach the browser](#the-security-problem)
- [The correctness problems — errors and localisation](#the-correctness-problems)
- [What BFF fixes](#what-bff-fixes)
- [How the overrides work](#how-the-overrides-work)
- [The Angular DI problem](#the-angular-di-problem)
- [Running and testing](#running-and-testing)
- [Improvements borrowed from the spartacus-bff reference](#improvements-borrowed-from-the-spartacus-bff-reference)
- [File layout](#file-layout)
- [Approach 2 — Facade-level override](#approach-2--facade-level-override)

---

## The performance problem

### Product Detail Page — three sequential calls

When a user opens a product detail page, Spartacus dispatches three independent
NgRx actions. Each triggers its own HTTP call to OCC, and each waits for the
previous to complete:

```
Browser → OCC:  GET /occ/v2/{baseSite}/products/{code}?fields=...     (600 ms)
                                                                        ↓ waits
Browser → OCC:  GET /occ/v2/{baseSite}/products/{code}/references      (500 ms)
                                                                        ↓ waits
Browser → OCC:  GET /occ/v2/{baseSite}/products/{code}/reviews         (400 ms)
                                                                        ↓
Total time visible to user: ~1500 ms
```

This is a fundamental constraint of the browser-side architecture. The browser
cannot fan out calls in parallel to the same origin without facing HTTP/1.1
connection limits, and each effect dispatches independently so there is no
opportunity to batch them.

### BFF aggregation — one call, parallel execution

With `BffProductModule` active, the same page load becomes:

```
Browser → BFF:  POST /bff/api/product.getPageData             (one call)
  BFF (parallel, Node.js):
    ├── GET /occ/v2/.../products/{code}?fields=...
    ├── GET /occ/v2/.../products/{code}/references
    └── GET /occ/v2/.../products/{code}/reviews
  BFF: merge → { product, references, reviews }
Browser receives: one response

Total time visible to user: max(600, 500, 400) ms ≈ 600 ms
```

The browser makes one call and waits for the slowest OCC call, not the sum.
Node.js handles the three outgoing OCC requests concurrently.

### How to measure it

1. Open DevTools → Network → set throttling to **Slow 3G**
2. Navigate to a product page (e.g. `/electronics-spa/en/USD/Open-Catalogue/Cameras/Digital-Cameras/c/578?productCode=3325048`)

**With `USE_AGGREGATION = false`** in `bff-product.module.ts`:
Filter Network by `/bff/api` — observe three sequential requests:
`product.getProduct`, `product.getReferences`, `product.getReviews`.
Each starts only after the previous completes.

**With `USE_AGGREGATION = true`** (default):
Filter Network by `/bff/api` — observe one request: `product.getPageData`.
It returns all three datasets in a single response.

The BFF console logs both modes:

```
// USE_AGGREGATION = false — three calls
BFF Product  getProduct  → OCC GET /electronics-spa/products/3325048
BFF Product  getReferences  → OCC GET /electronics-spa/products/3325048/references
BFF Product  getReviews  → OCC GET /electronics-spa/products/3325048/reviews

// USE_AGGREGATION = true — one call, parallel fan-out
BFF Product  getPageData  → 3 parallel OCC calls
BFF Product  getPageData  ✓ {product: {...}, references: [...], reviews: [...]}
```

---

## The security problem

### Credentials reach the browser

With direct OCC, Spartacus fetches a client credentials token and stores it in
browser memory to authenticate anonymous cart and product requests. Open
DevTools → Network on any anonymous OCC request:

```
Authorization: Bearer eyJraWQiOiI0YTA4...   ← token visible in browser
GET https://api.your-tenant.myhybris.cloud/occ/v2/...  ← OCC URL visible
```

The OCC base URL is also embedded in `index.html`:

```html
<meta name="occ-backend-base-url" content="https://api.your-tenant..." />
```

**With BFF:** the storefront sends no token for anonymous sessions. The BFF
holds `OCC_CLIENT_ID` and `OCC_CLIENT_SECRET` in `apps/bff/.env`. The
`index.html` entry is a relative path that reveals nothing:

```html
<meta name="bff-base-url" content="/bff/api" />
```

The storefront's OCC URL and the BFF's OCC URL are fully independent — they
can point at different OCC instances.

---

## The correctness problems

### OCC errors become generic 502s

With a naive BFF proxy, every OCC error surfaces as a generic 502:

```
POST /bff/api/cart.load
← 502  TRPCClientError: "Unhandled upstream request error"
  upstream.status: 404,  upstream.body: null   ← OCC error body lost
```

A 404 (stale cart — create a new one), 401 (token expired — re-auth), and 400
(bad input — show error) all look identical to Spartacus. All routes to the
same generic error path.

**With `normalizeUpstreamError`** (see [Improvements](#improvements-borrowed-from-spartacus-bff)):

```
POST /bff/api/cart.load  ← stale cart GUID
← tRPCError { code: "NOT_FOUND" }
→ HttpErrorResponse { status: 404 }
→ Spartacus effect creates a fresh cart ✓
```

### Localisation is silently broken

Spartacus's `SiteContextInterceptor` adds `lang` and `curr` query parameters
but does not forward the browser's `Accept-Language` header, which OCC uses
for response text localisation. The original BFF implementation only forwarded
`authorization` — `Accept-Language` was silently dropped.

**With `commonHeaders` wrapper**, every BFF procedure forwards both headers so
OCC responds in the user's browser locale.

---

## What BFF fixes

| Concern | Direct OCC | BFF (this implementation) |
|---------|--------------------------|---------------------------|
| PDP sequential calls (3× latency) | ✗ unavoidable in browser | ✓ parallel server-side, 1× latency |
| Client credentials in browser | ✗ visible in DevTools | ✓ server-side only |
| OCC URL in `index.html` | ✗ exposes backend | ✓ relative `/bff/api` |
| OCC error semantics | ✓ HttpErrorResponse | ✓ preserved via normalizeUpstreamError |
| Generic 502 on upstream errors | ✗ yes (naive proxy) | ✓ fixed |
| `Accept-Language` forwarded | ✗ silently dropped | ✓ commonHeaders wrapper |
| Stale cart GUID recovery | ✗ partial (anon only) | ✓ any 404 → new cart |
| Type-safe procedure contract | ✗ manual HTTP | ✓ tRPC end-to-end |
| Storefront OCC ≠ BFF OCC | ✗ same instance | ✓ fully independent |

---

## How the overrides work

### Product (PDP aggregation)

`BffProductModule` overrides all three product connectors in the **root
injector**. Unlike the cart (which required a lazy chunk workaround — see
[Angular DI problem](#the-angular-di-problem)), product connectors are all
`providedIn: 'root'` with no lazy re-provision in `ProductOccModule`. A simple
root-level override works:

```
ProductConnector          → BffProductConnectorImpl
ProductReferencesConnector → BffReferencesConnectorImpl
ProductReviewsConnector    → BffReviewsConnectorImpl
```

The toggle in `bff-product.module.ts`:

```ts
// false = 3 individual BFF calls (same count as direct OCC)
// true  = 1 aggregated BFF call  (the performance win)
const USE_AGGREGATION = true;
```

### Cart (connector-level override)

`BffCartBaseModule` overrides `CartConnector` and `CartEntryConnector` inside
the lazy cart feature injector. All standard cart UI — add-to-cart button,
mini-cart, cart page, quantity update, remove — routes through BFF unchanged.

```
User clicks "Add to Cart"
  └── AddToCartComponent
       └── ActiveCartService.addEntry()         [NgRx dispatch]
            └── CartEntryEffects                [lazy chunk]
                 └── CartEntryConnector.add()   [overridden]
                      └── POST /bff/api/cart.addEntry
                           └── BFF Node → OCC
```

---

## The Angular DI problem

The cart override is more complex than the product override because of how
Spartacus lazy-loads `CartBaseModule`. This section documents three failed
approaches so anyone extending the pattern does not repeat them.

### Three approaches that failed

**1. Root injector, adapter level.**
`{ provide: CartAdapter, useClass: BffCartAdapter }` in `AppModule`.
The Angular bundler places `CartAdapter` as two different JS class objects —
one in the main bundle, one in the lazy `CartBaseModule` chunk. The root-level
binding targets the main bundle copy. The effects inject from their own copy.
The override is invisible.

**2. Lazy wrapper module, separate file.**
`BffCartBaseModule` wrapping `CartBaseModule`, registered as the
`CART_BASE_FEATURE` lazy module, with `BffCartAdapter` in a separate file.
The bundler splits `BffCartAdapter` into its own chunk because it imports
`BffClientService` from the main bundle. Same token identity problem.

**3. Root injector, connector level.**
`{ provide: CartConnector, useExisting: BffCartConnector }` in `AppModule`.
`CartBaseCoreModule` explicitly lists `CartConnector` in its lazy injector
providers. The lazy injector always shadows the root injector.

### What works

Override `CartConnector` and `CartEntryConnector` inside the same lazy
injector, with the subclasses **defined inline in the same file** as the
wrapping module — the bundler cannot split them into separate chunks.

```
BffCartBaseModule  (lazy, registered as CART_BASE_FEATURE)
  imports: [CartBaseModule]          ← CartBaseCoreModule registers CartConnector
  providers: [
    BffCartConnectorImpl,            ← same file, same chunk
    { provide: CartConnector, useExisting: BffCartConnectorImpl },
    BffCartEntryConnectorImpl,
    { provide: CartEntryConnector, useExisting: BffCartEntryConnectorImpl },
  ]
```

Angular processes `imports` before `providers`, so `CartBaseCoreModule`
registers first, then `BffCartBaseModule` overrides — last provider wins.

**Product does not have this problem** because `ProductOccModule` is imported
eagerly in `SpartacusFeaturesModule`, so all product adapter bindings live in
the root injector. A simple root-level `BffProductModule` wins without any
lazy chunk gymnastics.

---

## Running and testing

### Start

```bash
# Terminal 1 — BFF (must restart after any change to apps/bff/src/)
OCC_BASE_URL=https://api.cc3ihxtp03-mcpacppoc1-p3-public.model-t.myhybris.cloud \
  npm run dev:bff

# Terminal 2 — Storefront
npm run start:storefrontapp
```

### Demonstrate the PDP performance difference

1. Open DevTools → Network → throttle to **Slow 3G**
2. In `bff-product.module.ts`, set `USE_AGGREGATION = false`, save
3. Navigate to a product detail page on the `electronics-spa` base site
   — observe **3 sequential** `/bff/api/product.*` calls
4. Set `USE_AGGREGATION = true`, save (dev server hot-reloads)
5. Hard-reload the product page — observe **1** `/bff/api/product.getPageData`
   call returning in roughly the time of the slowest individual call

### Confirm cart calls go through BFF

Filter Network by `/bff/api`. Add product `429430` (Rechargeable Battery Pack)
or `23355` (Tripod) to cart. Observe `cart.create` then `cart.addEntry` — no
direct OCC calls in the Network tab.

### Reset stale cart state

```js
Object.keys(localStorage)
  .filter(k => k.startsWith('spartacus'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

### Standalone BFF demo page

Navigate to the `/bff-cart` route on the `electronics-spa` base site — this
tests BFF cart procedures directly outside Spartacus's NgRx state.

---

## Improvements borrowed from the spartacus-bff reference

The `spartacus-bff` workspace contains a production-grade
library implementation of this pattern. Four improvements were back-ported.

### 1. `normalizeUpstreamError` — proper error semantics

Maps upstream HTTP status to typed tRPC error codes (`NOT_FOUND`,
`UNAUTHORIZED`, `BAD_REQUEST`) so the storefront can distinguish and handle
them correctly rather than treating every failure as a generic 502.

**Files:** `apps/bff/src/api/utils/normalize-upstream-error.ts`

### 2. `isResourceNotFoundError` — graceful 404 handling

Any 404 from OCC on `cart.load` (not just `anonymous + current`) returns
`undefined`, triggering fresh cart creation. Previously stale GUIDs from
expired sessions caused unrecoverable errors.

**File:** `apps/bff/src/api/utils/normalize-upstream-error.ts`

### 3. `commonHeaders` / `defineCartProcedure` — consistent header forwarding

A wrapper that merges `accept-language` and `authorization` into every
procedure's `meta.headers`. Previously `Accept-Language` was silently dropped
and OCC always responded in its default language.

**File:** `apps/bff/src/api/routers/cart.ts`, `apps/bff/src/api/routers/product.ts`

### 4. `CartConverter` / `enrichCart` — server-side data shaping

`cart.load` and `cart.loadAll` return price-enriched responses with formatted
price strings and server-computed `totalUnitCount`. Price formatting
(`Intl.NumberFormat`) runs once on the server instead of per-browser
per-render.

**File:** `apps/bff/src/api/utils/cart-converter.ts`

---

## File layout

```
apps/bff/
  src/api/routers/
    product.ts            — getProduct, getReferences, getReviews, getPageData
    cart.ts               — 7 cart procedures with error handling + enrichCart
    root.ts               — registers product + cart routers
  src/api/utils/
    normalize-upstream-error.ts  — normalizeUpstreamError + isResourceNotFoundError
    cart-converter.ts            — enrichCart (server-side price formatting)
  vivaldi.apis.ts         — occ_v2 destination with OAuth2 client credentials
  .env                    — OCC_BASE_URL, OCC_CLIENT_ID, OCC_CLIENT_SECRET

apps/storefrontapp/src/app/
  bff/
    product/
      bff-product.module.ts      — BffProductModule (root-level, no lazy issues)
                                   USE_AGGREGATION toggle for demo
    cart/
      bff-cart-base.module.ts    — BffCartBaseModule (lazy chunk, inline classes)
    bff-auth.link.ts             — authorizedOps: token only for logged-in users
    bff-mini-cart.component.ts   — BFF 🛒 badge in top-right corner
  spartacus/features/cart/
    cart-base-feature.module.ts  — points CART_BASE_FEATURE at BffCartBaseModule
  app.module.ts                  — imports BffProductModule
  app.component.ts/.html/.scss   — renders BffMiniCartComponent
```

---

## Approach 2 — Facade-level override

An alternative for cart in `bff-active-cart.service.ts` replaces
`ActiveCartFacade` entirely using Angular Signals — no NgRx for cart.

To activate: import `BffActiveCartModule` in `app.module.ts` and revert
`cart-base-feature.module.ts` to use `CartBaseModule` directly.

| Aspect | Approach 1 (active) | Approach 2 |
|--------|---------------------|------------|
| Override point | `CartConnector` in lazy injector | `ActiveCartFacade` in root injector |
| NgRx | Kept intact | Eliminated for cart |
| Upgrade safety | High — connector contract stable | Medium — facade contract must hold |
| Recommended for | Migrating existing storefront | Greenfield / performance-critical |
