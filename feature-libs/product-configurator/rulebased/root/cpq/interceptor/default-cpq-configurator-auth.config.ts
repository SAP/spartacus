/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';

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
