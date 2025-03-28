/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  ApplicationInitStatus,
  inject,
  Injectable,
  provideAppInitializer,
} from '@angular/core';
import {
  LOCATION_INITIALIZED_MULTI,
  provideConfig,
  WindowRef,
} from '@spartacus/core';
import {
  PageLayoutComponentService,
  PageSlotComponentService,
  SPIKE_STOREFRONT_FOOTER_RENDER_DELAY,
} from '@spartacus/storefront';
import { map, Observable, of } from 'rxjs';
import { lazyLoadMediaImagesByDefault } from './lazy-load-media-images-by-default';
import { addPreconnectLinkToCdnInSsr } from './preconnect-to-cdn';
import { useCdnForBackendAndMediaBaseUrl } from './use-cdn-for-backend-and-media-base-url';
import { useImageOptimizerReverseProxyForMedia } from './use-image-optimizer-reverse-proxy-for-media';
import { workaroundExtractBannerDimensionsFromUrl } from './workaround-extract-banner-dimensions-from-url';
import { workaroundMarkCertainBannersAsLcp } from './workaround-mark-certain-banners-as-lcp';

@Injectable({ providedIn: 'root' })
export class CustomApplicationInitStatus extends ApplicationInitStatus {
  // SPIKE NEW - DIRTY WORKAROUND! `runInitializers` is a private @internal method of Angular's public API
  runInitializers() {
    // SPIKE NEW - defer ApplicationInitStatus.runInitializers to next macro task
    setTimeout(() => {
      // @ts-ignore - SPIKE CAUTION - DIRTY WORKAROUND!
      super.runInitializers();
    }, 0);
  }
}

@Injectable({ providedIn: 'root' })
export class CustomPageLayoutComponentService extends PageLayoutComponentService {
  override shouldRenderSync(
    _layoutName$: Observable<string>,
    _templateName$: Observable<string>,
    _section$: Observable<string | undefined>
  ): Observable<boolean> {
    return _layoutName$.pipe(
      map((layoutName) => {
        // console.log({ layoutName });
        return ['header', 'navigation', 'footer'].includes(layoutName);
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class CustomPageSlotComponentService extends PageSlotComponentService {
  override shouldRenderSync(
    _position: string,
    _layoutName$: Observable<string>,
    _templateName$: Observable<string>,
    _section$: Observable<string | undefined>
  ): Observable<boolean> {
    return of(true);
  }
}

export const customProviders = [
  useCdnForBackendAndMediaBaseUrl,
  useImageOptimizerReverseProxyForMedia,
  lazyLoadMediaImagesByDefault,
  workaroundExtractBannerDimensionsFromUrl,
  addPreconnectLinkToCdnInSsr,
  workaroundMarkCertainBannersAsLcp,

  // SPIKE NEW - defer initial navigation to next macro task
  {
    provide: LOCATION_INITIALIZED_MULTI,
    multi: true,
    useFactory: () => {
      return () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 0);
        });
    },
  },

  // SPIKE NEW - defer ApplicationInitStatus to next macro task
  {
    provide: ApplicationInitStatus,
    useExisting: CustomApplicationInitStatus,
  },

  // SPIKE NEW -don't load /pages and re-render everything
  provideConfig({
    routing: {
      loadStrategy: 'once' as any, // SPIKE CAUTION - DIRTY TYPING HACK!
    },
  }),

  // SPIKE NEW - add a hardcoded preload for the LCP homepage image (ideally should be dynamic)
  // <link
  //   rel="preload"
  //   as="image"
  //   href="
  // <BASE DOMAIN>/https://sparta-api.platis.dev/medias/Elec-480x320-HomeSpeed-EN-01-480W.jpg?context=bWFzdGVyfGltYWdlc3wzMzkzMnxpbWFnZS9qcGVnfGFEWXlMMmhtWVM4NE56azNOakV6TXpJMk16WTJMMFZzWldOZk5EZ3dlRE15TUY5SWIyMWxVM0JsWldSZlJVNWZNREZmTkRnd1Z5NXFjR2N8N2FkNDNjZmQ1OGMwNDgyMGQwYTMyNjBkMDZlNDQ5YTAzN2NkM2MyY2M4ZWZmOGQ1NTljOTRjYTQ4MDEyOTgwZA"
  //   fetchpriority="high"
  // />

  provideAppInitializer(() => {
    const document = inject(DOCUMENT);
    const windowRef = inject(WindowRef);
    // run only on the server:
    if (windowRef.isBrowser()) {
      return;
    }

    const hardcodedLcpImageUrl =
      'https://sparta-api.platis.dev/medias/Elec-480x320-HomeSpeed-EN-01-480W.jpg?context=bWFzdGVyfGltYWdlc3wzMzkzMnxpbWFnZS9qcGVnfGFEWXlMMmhtWVM4NE56azNOakV6TXpJMk16WTJMMFZzWldOZk5EZ3dlRE15TUY5SWIyMWxVM0JsWldSZlJVNWZNREZmTkRnd1Z5NXFjR2N8N2FkNDNjZmQ1OGMwNDgyMGQwYTMyNjBkMDZlNDQ5YTAzN2NkM2MyY2M4ZWZmOGQ1NTljOTRjYTQ4MDEyOTgwZA';

    // SPIKE NEW - ideally for performance of LCP, we'd like to load Media from the same domain as the Storefront domain
    // to avoid a "performance tax" of making extra DNS lookup and TLS handshake to another Media domain
    //
    // This is possible thanks to custom routing rules in Cloudflare (`<whatever-subdomain>.your-domain.com/cdn-cgi/image/...`)
    // So let's use the same subdomain for Media as the Storefront domain (the current windowRef.location.origin):
    // For more, see Cloudflare docs: https://developers.cloudflare.com/images/transform-images/transform-via-url/
    let storefrontDomain = windowRef.location.origin;

    const imageOrigin = storefrontDomain?.includes('localhost')
      ? // for local development, let's use some Cloudflare URL in a hardcoded way, otherwise it won't work - because we don't host images on localhost. Then we'll pay the little price of extra DNS lookup and TLS handshake.
        'https://sparta-api.platis.dev'
      : storefrontDomain;

    const IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL =
      imageOrigin + '/cdn-cgi/image/format=auto/';

    const fullUrl =
      IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL + hardcodedLcpImageUrl;

    const link = document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.href = fullUrl;
    link.setAttribute('fetchpriority', 'high');

    document.head.insertBefore(link, document.head.firstChild);
  }),

  // SPIKE NEW - use rxFor to cut tasks but only in specific slots/layouts
  {
    provide: PageLayoutComponentService,
    useExisting: CustomPageLayoutComponentService,
  },
  {
    provide: PageSlotComponentService,
    useExisting: CustomPageSlotComponentService,
  },

  // SPIKE NEW - delay rendering of footer to avoid CLS (footer appearing before its preceding content)
  {
    provide: SPIKE_STOREFRONT_FOOTER_RENDER_DELAY,
    useValue: 2000,
  },
];
