---
pattern-id: 17
name: "Keep the first screen server-rendered, prioritized, stable and light"
regex-checks: []
---

# Performance — Core Web Vitals

## Rule

Apply this to every change a shopper sees when a page first loads, even when the request says nothing about speed. Four things decide Largest Contentful Paint (LCP), layout shift (CLS) and responsiveness in a Spartacus storefront.

## 1. The first screen comes from the server

A storefront with SSR sends finished HTML, so the browser starts the main image before any JavaScript runs. Only content that is in that HTML benefits.

- Render first-screen blocks on the server. Do not skip the whole component with `WindowRef.isBrowser()`, `*ngIf="isBrowser"` or `disableSSR`. A button or heading is plain markup and belongs in the server HTML even when its action only works in the browser; keep the `isBrowser()` check inside the handler. If one value exists only in the browser (local time, `localStorage`), render the block on the server and fill that value in after hydration.
- Put the main image in the template as `<img>`, `<picture>` or `cx-media`. A CSS `background-image` is found late and cannot be prioritized.
- Read data through Spartacus facades, so it is loaded during the server render; product and CMS data are then handed to the browser instead of being fetched twice.
- Switch between phone and desktop layouts with CSS media queries, not with `BreakpointService` driving `*ngIf` or classes. The server does not know the screen size, so markup chosen in code changes after hydration.

## 2. The main image: light, found early, prioritized

One image is usually the largest thing on the first screen: the hero on a content page, the main photo on a product page, the first products on a listing.

Its file size decides most of the loading time. Do not ship image files you add to the project as delivered: resize raster artwork to the largest width it is displayed at, times two for sharp screens (about 800 px for a phone crop, 1600 to 2000 px for desktop), and save it as WebP or AVIF at quality 70 to 80. A hero weighs tens to a few hundred kilobytes, not megabytes; a 2 MB picture alone takes more than ten seconds on a slow phone connection. Use what the machine has (`cwebp`, `magick`, `sips` (AVIF only), `npx sharp-cli`), put the converted files in the folder the build already serves (the `assets` entry in `angular.json`: `public/` in new apps, `src/assets/` in older ones), and reference only those. If no converter is available, keep the file, still set its dimensions, and say so. Images managed in the CMS stay in `cx-media`.

Stock components (`cx-banner`, `cx-product-images`, product list and carousel items) load their image eagerly with high priority when their CMS component UID is listed. The list is empty in a new storefront, so by default every image is `loading="lazy"`. When you add or change the top of a page, list the component that holds its main image (add to the existing list if one is configured, a second `ids` array replaces the first):

```ts
// CMS component UIDs; these two are from the electronics sample data
provideConfig({ lcpCmsComponents: { ids: ['ElectronicsHompageSplashBannerComponent', 'ProductImagesComponent'] } })
```

A custom CMS component reads the same setting. Import `LcpContextDirective` and `MediaModule` from `@spartacus/storefront` into the component; without the import the block renders nothing and the build only warns:

```html
<ng-container *cxLcpContext="let lcp">
  <cx-media [container]="data.media" elementType="picture" [fetchPriority]="lcp.fetchPriority$ | async" />
</ng-container>
```

For artwork that lives in the project, write the markup yourself:

```html
<picture>
  <source media="(max-width: 767px)" srcset="campaign/hero-phone-800.webp" width="800" height="1000" />
  <img src="campaign/hero-desktop-1920.webp" width="1920" height="720" alt="{{ title }}" loading="eager" fetchpriority="high" />
</picture>
```

- Only the first-screen main image gets `fetchpriority="high"`. Other first-screen images stay eager without a priority; images below the first screen are `loading="lazy"`.
- Different phone and desktop crops go into one `<picture>`. Two `<img>` hidden alternately with CSS both download.

## 3. Nothing moves after it is shown

Whatever arrives after the first paint needs its space reserved, or the content below it jumps.

- Give every `<img>` and `<source>` the `width` and `height` of its file, with `max-width: 100%; height: auto` in CSS.
- Give the host of a component that fills the page width (hero, banner, content block) `display: block; width: 100%` (`:host { … }` in component styles, or its element selector in global SCSS); not components that sit beside others, such as header links or buttons. A custom element is inline, and placed through an outlet into the flex layout of `cx-page-layout` it collapses to zero width until its picture has loaded, which throws away the space you reserved.
- CMS media usually carries no dimensions (`cx-media` sets `width` and `height` only when the backend sends them). Reserve the space in global SCSS from the artwork's ratio at each breakpoint. Stock banners have the same gap: when the page you are changing shows them on the first screen, add their ratios too.

```scss
cx-page-slot.Section1 cx-banner cx-media img {
  height: auto;
  aspect-ratio: auto 480 / 320; // phone crop; `auto` lets the loaded image keep its own ratio
  @media (min-width: 768px) {
    aspect-ratio: auto 1400 / 440; // desktop crop
  }
}
```

- A block that is filled in the browser (personalized, time-based, loaded on demand) keeps a `min-height` equal to its final height.
- Do not insert a block above visible content after the page has loaded.

## 4. Code that loads with the page stays small

Everything an eagerly imported component or service imports is downloaded and executed on every page.

- Register a CMS component that is not on every page lazily: `component: () => import('./price-history.component').then((m) => m.PriceHistoryComponent)`. For a whole feature use the [Spartacus lazy-loading pattern](./lazy-loading.md).
- Import a library that is needed only after an action (PDF, spreadsheet, chart, map, zip) inside the function that uses it, and start that import when the shopper reaches for the control, so the first click does not wait:

```ts
private pdf?: Promise<typeof import('jspdf')>;
private load() {
  return (this.pdf ??= import('jspdf').catch((e) => { this.pdf = undefined; throw e; }));
}
warm() { void this.load().catch(() => {}); } // (pointerenter), (focus), (pointerdown) on the button
async download() { const { jsPDF } = await this.load(); /* … */ }
```

- Fetch large data files when they are needed instead of importing them into the bundle.
- Add no render-blocking third-party tags: no `<script src>`, font `<link>` or `@import` from another origin in `index.html` or global styles. Self-host fonts with `font-display: swap`; load chat, review and analytics widgets on first use or after the page is interactive.
- Split work that takes longer than about 50 ms in a handler so the browser can paint (`await new Promise((r) => setTimeout(r))` between chunks), or move it to a worker.

## Check before you finish

Build for production and read the server HTML of the page you changed (`curl` it, or view source). The new first-screen content and its `<img>` are in it; the main image has `fetchpriority="high"` and images below the first screen are lazy; every image has dimensions or a reserved ratio; the initial JavaScript did not gain a library the first screen does not use. If the server returns an empty `<app-root>`, server rendering is falling back to the browser (host missing from `allowedHosts` or `NG_ALLOWED_HOSTS` in recent Angular versions, a render error, or the default 3-second SSR timeout). Report that to the developer instead of changing server settings; section 1 depends on it, the rest applies either way. Skip this check when the app has no SSR.

## Source reference (in `node_modules/@spartacus/*`)

- `LcpCmsComponentsConfig`, `CmsLcpService` and `LcpContextDirective` (`*cxLcpContext`) from `@spartacus/storefront` — which CMS component holds the main image.
- `MediaComponent` (`cx-media`) inputs `fetchPriority`, `loading`, `elementType`; `MediaConfig.imageLoadingStrategy` — how stock images load.
- `SsrOptimizationOptions` (`timeout`) from `@spartacus/setup/ssr` — when a slow server render falls back to the browser.

## Supplemental Information

- [ssr-safety.md](./ssr-safety.md) — browser-only code without giving up the server render.
- [lazy-loading.md](./lazy-loading.md) — lazy feature modules.
- [cms-component-wiring.md](./cms-component-wiring.md) — registering the component that renders the image.
