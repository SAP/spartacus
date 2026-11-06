# SSR Safety — Browser-Only Code

## Rule

If this app was installed with `--ssr` (or set up via `ng add @spartacus/setup --ssr`), it runs Server-Side Rendering in production. A single unguarded `window.something` reference crashes the server render: the initial SSR HTML comes back blank, then transitions to the CSR page after a delay. First paint is delayed, Core Web Vitals suffer, and SEO crawling sees the blank page.

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
