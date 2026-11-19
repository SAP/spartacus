# Performance

## Rule

Write storefront code that is fast by default, and apply the same points when you review or audit existing code. Five things cause most performance problems in customer storefronts. Sections 1 and part of 2 apply to storefronts with SSR; the rest applies either way.

## 1. The server render has to finish

The server waits until the app is stable. After 3 seconds (`SsrOptimizationOptions.timeout`) it gives up and sends the empty client page, so the shopper and the crawler get no content. One Node process renders every request, so whatever a render leaves running stays in memory.

- Start timers, intervals and polling only in the browser: `if (this.winRef.isBrowser()) { ... }` around the `setInterval`, `interval()` or `timer()`, not around the template. A countdown, carousel autoplay or stock poll that starts on the server keeps the render from finishing in an app with zone.js; in a zoneless app the render finishes, but every request leaves one more timer running in the server process.
- Keep the content itself in the server HTML. Do not wrap a whole block in `*ngIf="isBrowser"` and avoid `disableSSR` ([ssr-safety.md](./ssr-safety.md) has the exceptions). Render the block on the server and fill in the browser-only value afterwards.
- Make calls that are optional, personalised or slow (reviews, recommendations, stock from another system) in the browser. On the server every failed HTTP call turns the page into an error response, and a slow one runs into the timeout. If such a call must run on the server, give it its own limit with `HTTP_TIMEOUT_CONFIG` in the request's `HttpContext`.
- One markup for all screen widths. Switch layouts with CSS media queries, not with `BreakpointService` driving `*ngIf` or classes: the server renders the smallest breakpoint and the browser then changes it.

## 2. Ask the backend once, and only for what you show

- Load product and CMS data through Spartacus services (`ProductService`, `ProductSearchService`, `CmsComponentData`). They share one request between all subscribers, and their state is handed from the server to the browser. Data loaded with `HttpClient`, a Query or your own state is fetched again in the browser after a server render: reserve that block's space (section 3), or keep it in an NgRx feature listed in `state.ssrTransfer.keys`.
- Pass a scope: `productService.get(code, ProductScope.LIST)`, or `PRICE`, `STOCK`, `DETAILS`. Without one the large default payload is loaded. For an extra attribute add a custom scope with exactly those `fields`. Never use `fields=FULL`, and never replace `backend.occ.endpoints.product` with a single string: that removes every scope.
- A list of known product codes is one request: `ProductSearchByCodeService.get({ code, scope })` for each code, as the stock product carousel does. Calls in the same tick are sent as one search. The scope must be a product search scope (`carouselMinimal` or `carousel`), not a `ProductScope`. Do not use `ProductSearchService` for this: it holds the search results of the listing page, and a second search replaces them.

```ts
products$ = combineLatest(CODES.map((code) => this.productSearchByCode.get({ code, scope: 'carouselMinimal' })))
  .pipe(map((products) => products.filter((p): p is Product => !!p)));
```
```html
<a *ngFor="let product of products$ | async; trackBy: trackByCode" [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">
  <cx-media [container]="product.images?.['PRIMARY']" format="product" [alt]="product.name ?? ''"></cx-media>
  {{ product.name }} {{ product.price?.formattedValue }}
</a>
```
- Subscribe once. Two `async` pipes on a stream that is not shared send the request twice: use one `async` with `as`, or `shareReplay({ bufferSize: 1, refCount: true })`. Do not create streams in getters or in methods called from the template.
- Typed input: `debounceTime`, `distinctUntilChanged` and `switchMap` before any request or heavy filtering. Hand the result to the template through the `async` pipe or a signal; in a zoneless app a field set inside `subscribe` does not re-render.
- Do not poll unless the task asks for it. If it does, poll in the browser only and stop when the component is destroyed.

## 3. The main image and the space on the page

Pictures in a storefront come from the backend. The code decides when they load and whether the page jumps.

- Render CMS and product media with `cx-media`, not a hand-built `<img [src]>`.
- The largest picture of the first screen must not be lazy. Stock components (`cx-banner`, product images) load it eagerly with high priority when the storefront knows which CMS component holds it: either the component's UID contains the marker `__cxLCP__` (the default `lcpCmsComponents.idMarker`, set by content managers) or the UID is listed in `lcpCmsComponents.ids`. A custom CMS component asks the same way; import `LcpContextDirective` and `MediaModule` from `@spartacus/storefront`:

```html
<ng-container *cxLcpContext="let lcp">
  <cx-media [container]="data.media" [fetchPriority]="lcp.fetchPriority$ | async" />
</ng-container>
```

- Reserve the space of everything that arrives after the first paint. CMS media carries no dimensions, so give its container a CSS `aspect-ratio` per picture source (the sources switch at the breakpoints in `media.pictureElementFormats`), and give a block that is filled in the browser a `min-height`. A full-width custom component needs `:host { display: block; }`. Do not insert a block above visible content after the page has loaded.
- `lcpCmsComponents` and the styles of stock components are storefront-wide: change them when the task is about that part of the page, otherwise report what you found.
- Do not convert, resize or replace image files. If a picture is far larger than it is displayed, say so in your summary; the fix belongs in the backend media formats or the image CDN.

## 4. Load code when it is needed

- A feature that is used on some pages only goes into a lazy feature module (`featureModules` with `module: () => import(...)` and its `cmsComponents`, see [lazy-loading.md](./lazy-loading.md)). Do not add page-specific components to a module that loads with the app.
- Do not statically import from a lazy feature's entry point (for example `@spartacus/checkout/base/components`) in code that loads with the app, and do not turn a lazy feature of the generated app into a static import: the whole feature then lands in the main bundle.
- Import a heavy library (PDF, spreadsheet, chart, map) inside the function that uses it: `const { jsPDF } = await import('jspdf')`. Fetch large data files when they are needed: put the file in `public/` (or the `assets` folder the build serves) and load it with `HttpClient` on first use. Never `import` a data file into code that loads with the app. The result arrives later, so hand it to the template as a signal:

```ts
results = signal<Dealer[]>([]);
private dealers$?: Observable<Dealer[]>;
search(term: string) {
  this.dealers$ ??= this.http.get<Dealer[]>('dealers.json').pipe(shareReplay(1)); // fetched on the first search only
  this.dealers$.subscribe((dealers) => this.results.set(firstMatches(dealers, term, 5)));
}
```
- Third-party scripts get `async` or `defer`; fonts are self-hosted (the theme's `$font-url` can be overridden) or loaded with `font-display: swap`. Nothing render-blocking from another origin in `index.html` or the global styles.

## 5. Clean up, and stay responsive

- Every subscription ends: `async` pipe or `takeUntilDestroyed()` ([subscriptions.md](./subscriptions.md)). A root service that subscribes and never unsubscribes leaks once per request on the server.
- Remove what you add: `removeEventListener` and `clearInterval` in `ngOnDestroy` (or `DestroyRef.onDestroy`). A component that is created on every page visit otherwise adds one more listener or timer each time.
- Scroll and resize handlers do little: no layout read followed by a style write on every event; use `IntersectionObserver`, CSS, or throttle with `requestAnimationFrame`.
- Lists: `track` by a stable id, `ChangeDetectionStrategy.OnPush`, no method calls in the template for values that can be computed once.
- Work that takes more than about 50 ms in a handler is debounced, split into chunks or moved to a worker. Filtering a long list on every keystroke is the usual case.

## Reviewing existing code

When asked to review or audit performance, check the whole storefront against sections 1 to 5, not only recently changed files. Look in:

- components and root services for `setInterval`, `interval`, `timer`, polling and `.subscribe()` without an end, and whether they run on the server;
- templates for blocks behind `isBrowser`, `BreakpointService`, two `async` pipes on one stream, method calls, and lists without `track`;
- `cmsComponents` mappings for `disableSSR`, and modules for page-specific components that load with the app;
- every `HttpClient` call: does a Spartacus service already provide the data, is it one request or one per item, which `fields`;
- `src/index.html`, global styles and the feature modules in `src/app/spartacus/features/`: blocking third-party tags, fonts, static imports of lazy features, heavy libraries and data files;
- how media is rendered, whether the main image is marked, and whether late content has reserved space;
- event listeners and handlers that do heavy synchronous work.

Report each finding with file and line, the section it breaks, the effect (server render, requests, bundle size, LCP, CLS, responsiveness, memory) and the fix; order them by expected effect. Say what you measured and what you only read. Change code only when asked.

## Check before you finish

Build for production. If you can run the SSR server, read the server HTML of the page you changed (`curl` it): the first-screen content is in it. An empty `<app-root>` means the render timed out or failed: look for a timer, a pending stream or a failed call from section 1, and report it instead of changing server settings.

## Source reference (in `node_modules/@spartacus/*`)

- `SsrOptimizationOptions` (`timeout`) from `@spartacus/setup/ssr`; `HTTP_TIMEOUT_CONFIG` from `@spartacus/core`.
- `ProductScope`, `ProductService.get(code, scope)`, `ProductSearchService`; `backend.occ.endpoints.product` and `backend.loadingScopes` in the OCC config; `StateConfig.state.ssrTransfer.keys`.
- `LcpCmsComponentsConfig`, `CmsLcpService`, `LcpContextDirective`, `MediaComponent` (`cx-media`) from `@spartacus/storefront`.
- `CmsConfig.featureModules` for lazy features.

## Supplemental Information

- [ssr-safety.md](./ssr-safety.md) — browser-only code without giving up the server render.
- [lazy-loading.md](./lazy-loading.md) — lazy feature modules.
- [subscriptions.md](./subscriptions.md) — ending subscriptions, singleton services under SSR.
- [backend-communication.md](./backend-communication.md) — adapters and OCC endpoints.
