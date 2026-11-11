---
pattern-id: 17
name: "Render and load storefront content according to its actual visibility"
regex-checks: []
---

# Performance in storefront development

Use this workflow for media, CMS placement, responsive layouts and slow pages. For event handlers, filtering, calculations or rendering large results, also read [performance-interactions.md](performance-interactions.md). Apply the relevant safeguards while completing ordinary feature requests; preserve content, accessibility and exact business results. Do not expand a small feature into a site-wide refactor.

## Establish the cause and the supported API

Inspect the installed `@spartacus/storefront` declarations and implementation, not just a remembered version number. Locate `MediaComponent`, `MediaConfig`, `LcpCmsComponentsConfig` and the actual CMS payload. Recent packages put declarations in `types/spartacus-storefront.d.ts`; others use `src/**`. Confirm exported bindings before writing templates. The examples below use these public APIs; adapt only when the installed version differs.

For a performance investigation, record the affected route, viewport, state and representative trace before changing code. Identify the actual LCP element, layout-shift sources or slow interaction. Start with the expensive phase:

- **LCP:** separate server/TTFB time, image discovery delay, transfer time and render delay. A high-priority hint cannot fix a slow CMS response, oversized asset, late CSS/JS discovery or blocked rendering. Inspect SSR HTML and the request initiator/waterfall; improve the responsible API/cache, selected image size, discovery or render work. Preload only a proven late-discovered critical resource, matching its responsive selection so it does not add a duplicate fetch. See [LCP breakdown](https://web.dev/articles/optimize-lcp).
- **CLS:** reserve image and asynchronous content space, then inspect shift attribution. For non-image causes, target the responsible [fonts, inserted content, embeds or animations](https://web.dev/articles/optimize-cls); do not add arbitrary fixed heights to the whole page.
- **JS and rendering:** inspect bundle/network and main-thread traces. Keep unrelated feature code out of the eager bundle using [Spartacus lazy loading](lazy-loading.md); do not lazily defer the first-view hero merely to reduce initial JS. OnPush does not make a long event handler cheap. See [interaction work](performance-interactions.md).

## Selective CMS LCP configuration

If the initial image waits for JavaScript or CMS data before Chrome can request it, follow [initial image discovery](initial-image-discovery.md). A component UID and high priority control the image once it exists. The navigation response or early shell can often make the selected URL available sooner.

Keep the global media default lazy. Mark the specific CMS **component UID** that owns the initial LCP image, not a component type/mapping key, slot name, media UID or DOM ID. Register this config eagerly, before CMS rendering:

```typescript
import { provideConfig } from '@spartacus/core';
import {
  ImageLoadingStrategy, LcpCmsComponentsConfig, MediaConfig,
} from '@spartacus/storefront';

export const criticalMediaConfig = provideConfig({
  imageLoadingStrategy: ImageLoadingStrategy.LAZY,
  lcpCmsComponents: { ids: ['SpringLandingHero'] },
} satisfies MediaConfig & LcpCmsComponentsConfig);
```

Replace the example UID with the actual payload's `uid`. Arrays replace previous configuration, so retain any existing deliberately selected IDs. Do not change every banner or the global strategy to eager. The optional `lcpCmsComponents.idMarker` matches a substring of CMS UIDs; use it only with an agreed CMS naming convention. A component shared across routes may need a page-aware `CmsLcpService.getLcpPresence` override instead of an unconditional ID entry.

Supported OOTB templates consume this context. A custom CMS component must connect it to its **main image**; config alone does not change an arbitrary image:

```html
<!-- Import AsyncPipe, MediaModule and LcpContextDirectiveModule. -->
<ng-container *cxLcpContext="let lcp">
  <cx-media class="artwork" [container]="media" format="desktop"
    [fetchPriority]="lcp.fetchPriority$ | async" [alt]="alt" />
</ng-container>
```

Do not pass the same high priority to every thumbnail or carousel slide. Verify the emitted native `<img>` in the real CMS context. A standalone preview needs an appropriate test context; it does not prove CMS wiring.

## Loading follows visibility and lifecycle

| State | Media behavior |
| --- | --- |
| Initial, likely LCP image | Discoverable on first render, eager, high priority on this image only |
| Other media outside the first viewport | Keep lazy/default loading and normal priority |
| Initially closed panel or inactive slide | If it must not request media yet, omit its image subtree until opened/selected; lazy loading alone is not a zero-request guarantee |
| User opens a panel or selects another slide | Render/load the newly needed image promptly (eager if necessary), with normal priority; it is not the initial page-load LCP |

Keep the initial SSR and browser state consistent. Keep focus, controls, text and CMS order intact when deferring media. Closing/reopening may retain already loaded data if the UX requires it; avoid repeatedly destroying useful state. Bind loading/priority to the current lifecycle rather than stamping `high` on a reusable image component. A CMS-data update or navigation must not leave the next inactive item promoted.

For a raw initial hero image, `fetchpriority="high"` and `loading="eager"` are independent attributes. For the verified `cx-media` API, `[fetchPriority]="ImageFetchPriority.HIGH"` forces eager loading even if `loading` is lazy. Use the enum as a component property for Angular template access. Native `fetchpriority` on the **cx-media host** does not set its generated image's priority. Preserve the media pipeline when it supports the task.

## Responsive selection, reservation and fitting

CSS-hiding separate mobile/desktop images can download both. For distinct crops use one native `<picture>`, or one supported `<cx-media elementType="picture">`. For resolution variants of the same crop use `srcset`/`sizes` (the installed `cx-media` image mode exposes `sizesForImgElement`). Keep CSS media queries for layout, rather than breakpoint-driven template swaps that disagree with SSR.

For the framework picture API, format keys must match the CMS media container. Configuration is app-wide, so use deliberate keys and preserve existing formats/order:

```typescript
provideConfig({
  media: {
    pictureElementFormats: {
      portrait: { mediaQueries: '(width < 768px)' },
      landscape: { mediaQueries: '(width >= 768px)' },
    },
    pictureFormatsOrder: ['portrait', 'landscape'],
  },
} satisfies MediaConfig);
```

Render `elementType="picture"` with `format="landscape"` as the fallback. Inspect generated `<source>` order: the first matching source wins. Native picture is a valid alternative if the installed API cannot express the selection; preserve resolved URLs, CMS data, alt text, links and required media behavior.

Reserve the actual displayed ratio **before** data/image loading, including the empty initial state. Accurate intrinsic image/source dimensions or a stable CSS slot can do this. Reservation alone does not fit the generated image: check the `cx-media` host, its `picture`, and its `img`.

```scss
// In the custom component's own styles: these elements belong to its view.
.artwork-frame { aspect-ratio: 16 / 9; overflow: hidden; }
.artwork-frame > cx-media { display: block; width: 100%; height: 100%; }
@media (width < 768px) {
  .artwork-frame { aspect-ratio: 4 / 5; }
}
```

```scss
// Global stylesheet, scoped to this one custom selector/class.
// Angular Emulated parent styles do not reach the child's generated picture/img.
app-seasonal-banner .artwork-frame > cx-media > picture {
  display: block;
  width: 100%;
  height: 100%;
}
app-seasonal-banner .artwork-frame > cx-media > img,
app-seasonal-banner .artwork-frame > cx-media > picture > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Choose `cover` for intentional cropping or `contain` when the whole artwork must remain visible. Do not globally change every `cx-media img`. If the custom component uses `ViewEncapsulation.None`, these descendant rules can live with its styles but remain global: prefix every selector. With native picture/img owned by the custom view, component-scoped descendant styles work normally. Avoid `::ng-deep`; prefer the explicit scoped global override. See [styling.md](styling.md) and [Angular encapsulation](https://angular.dev/guide/components/styling).

## Verify behavior before claiming improvement

Compile with the application's real strict Angular configuration, then follow [browser acceptance](browser-verification.md) when a preview/browser is available. At representative mobile and desktop widths, inspect native image attributes, `currentSrc`, reserved and loaded geometry, text/link order and network requests. Compare before data, before image completion and after hydration. Count actual attempts during initial loading/hydration: both an unintended crop and repeat transfers of the same selected URL need investigation. Open/close panels and navigate slides: verify inactive media is not promoted or requested prematurely, selected media appears, and revisits preserve intended state. Count those later phases separately; a viewport change or revisit may legitimately fetch a crop again.

For an optimization claim, rerun the same trace/measurement conditions and report the observed change and limits. A passing build, CSS rule, priority attribute or synthetic fixture is not a measured LCP/CLS/INP gain. If browser measurement is unavailable, state what was statically verified and what remains unmeasured.

Sources: installed `MediaComponent`, `MediaService`, `CmsLcpService`, `LcpContextDirective` and config declarations; [SAP CMS LCP configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/ef4bd8f9daf5479d82312ca96107f0e5.html); [responsive image selection](https://html.spec.whatwg.org/multipage/images.html#art-direction); [Angular hydration](https://angular.dev/guide/hydration#constraints).
