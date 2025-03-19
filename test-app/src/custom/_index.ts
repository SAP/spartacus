/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationInitStatus, Injectable } from '@angular/core';
import { LOCATION_INITIALIZED_MULTI, provideConfig } from '@spartacus/core';
import { lazyLoadMediaImagesByDefault } from './lazy-load-media-images-by-default';
import { addPreconnectLinkToCdnInSsr } from './preconnect-to-cdn';
import { useCdnForBackendAndMediaBaseUrl } from './use-cdn-for-backend-and-media-base-url';
import { useImageOptimizerReverseProxyForMedia } from './use-image-optimizer-reverse-proxy-for-media';
import { workaroundExtractBannerDimensionsFromUrl } from './workaround-extract-banner-dimensions-from-url';
import { workaroundMarkCertainBannersAsLcp } from './workaround-mark-certain-banners-as-lcp';

@Injectable({ providedIn: 'root' })
export class CustomApplicationInitStatus extends ApplicationInitStatus {
  runInitializers() {
    // SPIKE NEW - defer ApplicationInitStatus.runInitializers to next macro task
    setTimeout(() => {
      // @ts-ignore - SPIKE CAUTION - DIRTY WORKAROUND!
      super.runInitializers();
    }, 0);
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
];
