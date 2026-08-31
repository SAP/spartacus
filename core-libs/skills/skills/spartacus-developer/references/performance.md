---
pattern-id: 17
name: "Prioritize LCP images, reserve media space, lazy-load below the fold, no JS-driven layout"
regex-checks: []
---

# Performance — Core Web Vitals

## Rule

Every image-bearing component affects three Core Web Vitals: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and INP (Interaction to Next Paint). Apply the rules in this file whenever a component renders images or has a responsive layout.

## LCP — Hero / Above-the-Fold Images

For a **custom hero `<img>` element** that is likely the page's Largest Contentful Paint target (full-width banner, above-the-fold splash), set `fetchpriority="high"` so the browser starts fetching it immediately rather than queuing it with other resources.

```html
<!-- ✅ custom hero <img>: signal the browser to prioritise this fetch -->
<img
  src="{{ heroImageUrl }}"
  alt="{{ title }}"
  width="1200"
  height="600"
  fetchpriority="high"
/>
```

**Scope:** this applies only when your component owns a raw `<img>` element. If the component renders images via `<cx-media>`, keep using `<cx-media>` — do NOT switch to raw `<img>` just to gain `fetchpriority`. Spartacus 2211.43+ exposes a `[fetchPriority]` binding on `<cx-media>` for CMS-driven prioritisation; see the Spartacus docs on `lcpCmsComponents` for that path.

## CLS — Reserve Space for Every Media Element

Set `width` and `height` on every `<img>` so the browser can reserve the correct aspect ratio before the image loads. Without them, the page content shifts downward when the image arrives — a direct CLS failure.

```html
<!-- ✅ intrinsic dimensions let the browser reserve layout space -->
<img src="{{ src }}" alt="{{ alt }}" width="800" height="450" />
```

The displayed image may be CSS-resized (e.g. `img { width: 100%; height: auto; }` in a responsive design). That is fine — the browser uses the `width`/`height` attributes only to calculate the aspect ratio. Keep them regardless.

For `<cx-media>` containers that you control, apply `aspect-ratio` via CSS on the wrapping element so the slot never collapses before the image loads:

```scss
// ✅ reserve space for a 16:9 cx-media container — no layout shift
.my-banner cx-media {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

## Lazy-Loading — Below-the-Fold Only

Add `loading="lazy"` to `<img>` elements that are outside the initial viewport. NEVER add it to the LCP/hero image — lazy-loading the hero forces the browser to wait before starting the most important fetch.

```html
<!-- ✅ thumbnail below the fold — lazy is correct -->
<img src="{{ thumb }}" alt="{{ name }}" width="300" height="300" loading="lazy" />
```

```html
<!-- ❌ full-width splash above the fold — loading="lazy" delays the LCP -->
<img src="{{ hero }}" alt="{{ title }}" width="1200" height="600" loading="lazy" />
```

## No JS-Driven Layout Changes

NEVER use Spartacus's `BreakpointService` (or any JavaScript subscription) to swap layout slots, swap template blocks, or change the DOM structure based on the current breakpoint. The SSR engine renders at an assumed mobile viewport; when JavaScript later detects a wider viewport and rearranges the DOM during hydration, the visible content shifts — a CLS hit that the user sees as a flash.

Use CSS for all responsive layout — the browser applies it instantly with the first paint, before any JavaScript runs.

```typescript
// ❌ JS-driven layout swap causes a CLS hit at hydration time
this.breakpointService
  .isUp('lg')
  .pipe(takeUntilDestroyed())
  .subscribe((isLg) => {
    this.showDesktopLayout = isLg; // drives *ngIf / structural directive in template
  });
```

```scss
// ✅ CSS-only responsive layout — stable across SSR and CSR, no layout shift
.my-banner {
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }
}
```

## Related Topics

- **INP / rendering performance** — `ChangeDetectionStrategy.OnPush` paired with the `async` pipe prevents unnecessary change-detection cycles, which is the main Interaction to Next Paint lever. See [subscriptions.md](./subscriptions.md).
- **Hydration safety** — components that mutate the DOM after load break Angular's non-destructive hydration and can cause a visible flash or blank slot. See [ssr-safety.md](./ssr-safety.md).

## Anti-pattern

```html
<!-- ❌ no dimensions → browser cannot reserve space → CLS on image load -->
<img src="{{ heroUrl }}" alt="{{ title }}" fetchpriority="high" />

<!-- ❌ loading="lazy" on the hero → browser defers the most important image → LCP regresses -->
<img src="{{ heroUrl }}" alt="{{ title }}" width="1200" height="600" loading="lazy" />
```

## Source reference

- `BreakpointService` from `@spartacus/storefront` — avoid for layout decisions.
- `CxMediaComponent` (`<cx-media>`) from `@spartacus/storefront`.
- MDN: [fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority) · [loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading) · [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio).
