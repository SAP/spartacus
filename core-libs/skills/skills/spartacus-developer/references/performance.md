# Performance — Core Web Vitals

## Rule

Apply this to every change a shopper sees when a page first loads, even when the request says nothing about speed. Four things decide Largest Contentful Paint (LCP), layout shift (CLS) and responsiveness in a Spartacus storefront. Section 1 applies to storefronts with SSR; the others apply either way.

## 1. The first screen comes from the server

A storefront with SSR sends finished HTML, so the browser starts the main image before any JavaScript runs. Only content that is in that HTML benefits.

- Render first-screen blocks on the server. Do not skip the whole component with `WindowRef.isBrowser()`, `*ngIf="isBrowser"` or `disableSSR`; `disableSSR` stays the last resort for a component with no useful server output (see [ssr-safety.md](./ssr-safety.md)). A button or heading is plain markup and belongs in the server HTML even when its action only works in the browser; keep the `isBrowser()` check inside the handler. If one value exists only in the browser (local time, `localStorage`), render the block on the server and fill that value in after hydration.
- Put the main image in the template as `<img>`, `<picture>` or `cx-media`. A CSS `background-image` is found late; when a design forces one, preload it (`<link rel="preload" as="image" fetchpriority="high">`).
- Read data through Spartacus facades, so it is loaded during the server render; product and CMS data are then handed to the browser instead of being fetched twice.
- Switch between phone and desktop layouts with CSS media queries, not with `BreakpointService` driving `*ngIf` or classes. The server does not know the screen size, so markup chosen in code changes after hydration.

## 2. The main image: light, found early, prioritized

One image is usually the largest thing on the first screen: the hero on a content page, the main photo on a product page, the first products on a listing.

Its file size decides most of the loading time. A hero weighs tens to a few hundred kilobytes, not megabytes; a 2 MB picture alone takes more than ten seconds on a slow phone connection. Check every image file you add to the project against the size it is displayed at. When a photo or illustration is far larger than needed (megabytes, or more than twice the displayed width):

- Leave the delivered file as it is. Never overwrite, move or delete it.
- Make a copy resized to the largest width it is displayed at, times two for sharp screens (about 800 px for a phone crop, 1600 to 2000 px for desktop), saved as WebP at quality 70 to 80; AVIF only as an additional `<source>` beside it. Use a converter that is already installed (`cwebp`, `magick`, or `sharp` if the project depends on it; `sips` resizes and writes AVIF but not WebP). Do not download one.
- Put the copies in the folder the build already serves (the `assets` entry in `angular.json`: `public/` in new apps, `src/assets/` in older ones) and reference the copies.
- Tell the developer in your summary which files you converted, their pixel and file sizes before and after, and that pointing the template back at the delivered file undoes it.
- If no converter is installed, or the developer asked for the files to be used unchanged, use the delivered file, still set its dimensions, and report its size and what a conversion would save.
- Leave logos, icons and images with text or transparency as they are; lossy re-encoding blurs their edges. Leave files that are already small as well.

Images managed in the CMS stay in `cx-media`. They are sized in the backend or by an image CDN, so report an oversized one instead of replacing it.

Stock components (`cx-banner`, `cx-product-images`, product list and carousel items) load their image eagerly with high priority when the storefront knows they hold a page's main image. `lcpCmsComponents` says so in two ways: a CMS component whose UID contains the marker `__cxLCP__` (the default `idMarker`) is recognised without a deployment, and the app can list UIDs in `ids`. Nothing is marked or listed in a new storefront, so by default every stock image is `loading="lazy"`. This is storefront-wide configuration tied to CMS content: set it when the task is about that part of the page and say so; otherwise report which component should be marked and leave the configuration alone. To find a UID, log the page structure ("Debugging CMS page structure" in [cms-component-wiring.md](./cms-component-wiring.md)). When you add to `ids`, extend the existing list; a second `ids` array replaces the first:

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
- CMS media usually carries no dimensions (`cx-media` sets `width` and `height` only when the backend sends them). For a component the task covers, reserve the space in global SCSS with one ratio per picture source; the sources switch at the breakpoints in `media.pictureElementFormats` (by default up to 480 px, up to 770 px, up to 960 px, and wider). The ratios follow the artwork in the CMS, so say in your summary that they must change with it. Stock banners have the same gap: when one shifts the layout and the task does not cover it, report it instead of restyling it.

```scss
// Splash banner of the electronics sample data: its four files are 480x320, 770x350, 960x330 and 1400x440
cx-page-slot.Section1 cx-banner cx-media img {
  height: auto;
  aspect-ratio: auto 480 / 320; // `auto` lets the loaded image keep its own ratio
  @media (min-width: 481px) { aspect-ratio: auto 770 / 350; }
  @media (min-width: 771px) { aspect-ratio: auto 960 / 330; }
  @media (min-width: 961px) { aspect-ratio: auto 1400 / 440; }
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

## Reviewing existing code

When asked to review or audit page speed, check the whole storefront against sections 1 to 4, not only recently changed files. Look in:

- `src/index.html` and the global styles: third-party tags and fonts.
- The `assets` entries in `angular.json` and the image files they serve: file size against the size they are displayed at.
- Every template with an `<img>`, `<picture>`, `cx-media` or a CSS `background-image`: dimensions, loading and priority.
- Imports of libraries and data files in components and modules that load with the app.
- `cmsComponents` mappings: `disableSSR`, and components that are not on every page but are not registered lazily.
- `WindowRef.isBrowser()`, `isPlatformBrowser` and `BreakpointService` used to show or hide template blocks.
- Whether `lcpCmsComponents` marks the main image of each page type.
- Blocks added to the page after it has loaded (timers, browser-only requests): is their space reserved?
- Event handlers that do heavy synchronous work, such as filtering or sorting a long list on every keystroke.

Report each finding with file and line, the section it breaks, its effect on LCP, CLS or responsiveness, and the fix; order them by expected effect. Say what you measured and what you only read. Change code only when asked.

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
