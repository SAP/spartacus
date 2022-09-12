/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';

interface CpqConfiguratorBackendConfig {
  cpq?: {
    endpoints: {
      configurationInit: string;
      configurationDisplay: string;
      attributeUpdate: string;
      valueUpdate: string;
    };
    prefix: string;
  };
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CpqConfiguratorEndpointConfig {
  backend?: CpqConfiguratorBackendConfig;
}

declare module '@commerce-storefront-toolset/core' {
  interface BackendConfig extends CpqConfiguratorBackendConfig {}
}
