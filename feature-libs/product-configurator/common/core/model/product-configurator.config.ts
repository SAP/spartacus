/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@commerce-storefront-toolset/core';

export interface ProductConfiguratorConfig {}

declare module '@commerce-storefront-toolset/core' {
  interface Config {
    productConfigurator?: ProductConfiguratorConfig;
  }
}
