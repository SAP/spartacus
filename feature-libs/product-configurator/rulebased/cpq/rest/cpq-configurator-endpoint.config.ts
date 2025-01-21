/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
 */
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

declare module '@spartacus/core' {
  interface BackendConfig extends CpqConfiguratorBackendConfig {}
}
