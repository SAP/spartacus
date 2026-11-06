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
