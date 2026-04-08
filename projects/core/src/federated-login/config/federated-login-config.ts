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
    contextParameterName: string;
    loginDomains: string[];
    originMap: Record<string, string>;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FederatedLoginConfig {}
}
