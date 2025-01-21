/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';
/**
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
 */
export const defaultCpqConfiguratorAuthConfig: CpqConfiguratorAuthConfig = {
  productConfigurator: {
    cpq: {
      authentication: {
        tokenExpirationBuffer: 10000,
        tokenMaxValidity: 24 * 60 * 60 * 1000,
        tokenMinValidity: 5000, // five seconds
      },
    },
  },
};
