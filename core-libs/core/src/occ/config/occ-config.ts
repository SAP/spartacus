/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { OccEndpoints } from '../occ-models/occ-endpoints.model';
import { LoadingScopes } from './loading-scopes-config';

/**
 * Configuration for the backend services consumed by Spartacus.
 *
 * All `baseUrl` values can be provided in three ways (in order of precedence):
 *
 * 1. **HTML meta tag** (recommended for CCv2 / cloud deployments) — add the
 *    corresponding `<meta>` tag to your `index.html`. The CCv2 platform
 *    replaces the placeholder at release time, so no rebuild is required:
 *    ```html
 *    <!-- OCC backend (preferred short form) -->
 *    <meta name="occ-base-url" content="OCC_BASE_URL_VALUE" />
 *    <!-- OCC backend (legacy — still supported for backward compatibility) -->
 *    <meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />
 *    <!-- Media CDN -->
 *    <meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />
 *    <!-- Vivaldi BFF -->
 *    <meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
 *    ```
 *
 * 2. **`provideConfig()`** in your Angular module or `app.config.ts`:
 *    ```ts
 *    provideConfig({
 *      backend: {
 *        occ:   { baseUrl: 'https://my-commerce.example.com' },
 *        media: { baseUrl: 'https://media.example.com' },
 *        bff:   { baseUrl: 'https://bff.example.com/bff/api' },
 *      },
 *    })
 *    ```
 *
 * 3. **Environment variable via `environment.ts`** (local development only):
 *    Set `CX_BASE_URL` / `CX_BFF_BASE_URL` in `.env-cmdrc` and read them
 *    from `buildProcess.env` in your environment file.
 */
export interface BackendConfig {
  occ?: {
    baseUrl?: string;
    prefix?: string;
    /**
     * Indicates whether or not cross-site Access-Control requests should be made
     * using credentials such as cookies, authorization headers or TLS client certificates
     */
    useWithCredentials?: boolean;

    endpoints?: OccEndpoints;
  };
  media?: {
    /**
     * Media URLs are typically relative, so that the host can be configured.
     * Configurable media baseURLs are useful for SEO, multi-site,
     * switching environments, etc.
     */
    baseUrl?: string;
    /**
     * Media URL path prefix, to be appended to the baseUrl.
     * This is useful when media is hosted under a specific path.
     * For example, if media is hosted under '/api/storefront', then the prefix should be set to '/api/storefront'.
     */
    prefix?: string;
  };
  loadingScopes?: LoadingScopes;
  /**
   * Configuration for the Vivaldi BFF (Backend for Frontend).
   *
   * The BFF exposes MCS procedures to the Spartacus storefront over HTTP/tRPC.
   * Set `baseUrl` to the root of the BFF API, e.g. `https://example.com/bff/api`.
   *
   * In CCv2 deployments the value is injected at release time via:
   * ```html
   * <meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
   * ```
   *
   * For local development set `CX_BFF_BASE_URL` in `.env-cmdrc`
   * (defaults to `/bff/api`, proxied by the Angular dev server).
   */
  bff?: {
    baseUrl?: string;
  };
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OccConfig extends SiteContextConfig {
  backend?: BackendConfig;
}

declare module '../../config/config-tokens' {
  interface Config extends OccConfig {}
}
