/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FederatedLoginConfig {
  federatedLogin?: {
    enabled?: boolean;

    /** URL parameter name to use when passing context from an originating domain to a login domain. */
    contextParameterName: string;

    /** List of fully-qualified domains that serve as a federated login page. */
    loginDomains: string[];

    /**
     * Map of URL-safe keys to fully-qualified domains.
     *
     * These keys are used to pass the context from a domain to a federated login instance.
     *
     * ex:
     * ```
     * {
     *   sf1: 'https://storefront1.com',
     *   sf2: 'https://storefront2.com',
     * }
     */
    originMap: Record<string, string>;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FederatedLoginConfig {}
}
