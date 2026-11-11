# SSR Safety — Browser-Only Code

## Rule

An SSR-enabled app can serve rendered HTML, a shared CSR shell or a route-specific fallback. Inspect the production document and rendering strategy for the route. On account or loyalty pages, establish where authenticated data first becomes available. Use a neutral SSR shell when per-request authorization and private caching are unverified. An unguarded browser API can fail a server render and delay first paint.

If a component or service uses `window`, `document`, `localStorage`, `sessionStorage`, `IntersectionObserver`, `navigator`, a browser-only third-party widget (maps, analytics, chat, video players), or any API that doesn't exist in Node — guard the browser-only code with `WindowRef.isBrowser()`.

## Guard with `WindowRef.isBrowser()` (preferred)

`WindowRef` is the Spartacus-idiomatic way to check the platform and reach `window`/`document`/storage. Internally it uses Angular's `isPlatformBrowser`, but it exposes one consistent API and pairs `isBrowser()` with `nativeWindow`, `nativeDocument`, `localStorage`, and `sessionStorage` accessors that are SSR-safe.

```typescript
import { WindowRef } from '@spartacus/core';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent implements OnInit {
  private winRef = inject(WindowRef);

  ngOnInit() {
    if (!this.winRef.isBrowser()) return;
    const stored = this.winRef.localStorage?.getItem('recentlyViewed') ?? '[]';
    this.loadProducts(JSON.parse(stored));
  }
}
```

The component renders on the server with empty/default state, then hydrates and fills in browser-only data on the client.

## Last-resort: `disableSSR`

```typescript
provideConfig({
  cmsComponents: {
    MyBrowserOnlyComponent: {
      component: MyBrowserOnlyComponent,
      disableSSR: true,
    },
  },
})
```

`disableSSR: true` prevents the component from rendering on the server; the slot is empty in the SSR HTML and only fills in once the CSR app boots.

AVOID `disableSSR` on publicly crawlable pages — the SSR-to-CSR transition causes a visible flicker, hurts the CLS Core Web Vital (which impacts SEO), and removes the content from the server-rendered HTML that crawlers read. Reach for it only when the component has no useful server-rendered fallback at all (e.g. a third-party live-chat widget, a client-only map). For everything else, use `WindowRef.isBrowser()` so the component still renders meaningful default markup on the server.

## Source reference (in `node_modules/@spartacus/*`)

- `WindowRef` from `@spartacus/core` — `isBrowser()`, `nativeWindow`, `nativeDocument`, `localStorage`, `sessionStorage`.
- `disableSSR` is handled by `ComponentWrapperDirective` in `@spartacus/storefront`.

## Supplemental Information

- For CLS and layout-stability rules that apply alongside SSR safety (image dimensions, no JS-driven layout, lazy-loading), see [performance.md](./performance.md).
