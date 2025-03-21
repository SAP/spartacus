/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Provider } from '@angular/core';
import { SERVER_REQUEST_ORIGIN, WindowRef } from '@spartacus/core';
import { MediaService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class CustomMediaService extends MediaService {
  protected windowRef = inject(WindowRef);
  protected serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
    optional: true,
  });

  protected override resolveAbsoluteUrl(url: string): string {
    // SPIKE NEW - ideally for performance of LCP, we'd like to load Media from the same domain as the Storefront domain
    // to avoid a "performance tax" of making extra DNS lookup and TLS handshake to another Media domain
    //
    // This is possible thanks to custom routing rules in Cloudflare (`<whatever-subdomain>.your-domain.com/cdn-cgi/image/...`)
    // So let's use the same subdomain for Media as the Storefront domain (the current windowRef.location.origin):
    // For more, see Cloudflare docs: https://developers.cloudflare.com/images/transform-images/transform-via-url/
    let storefrontDomain = this.windowRef.location.origin;

    const imageOrigin = storefrontDomain?.includes('localhost')
      ? // for local development, let's use some Cloudflare URL in a hardcoded way, otherwise it won't work - because we don't host images on localhost. Then we'll pay the little price of extra DNS lookup and TLS handshake.
        'https://sparta-api.platis.dev'
      : storefrontDomain;

    const IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL =
      imageOrigin + '/cdn-cgi/image/format=auto/';

    return (
      IMAGE_OPTIMIZER_REVERSE_PROXY_BASE_URL + super.resolveAbsoluteUrl(url)
    );
  }
}

export const useImageOptimizerReverseProxyForMedia: Provider = {
  provide: MediaService,
  useExisting: CustomMediaService,
};
