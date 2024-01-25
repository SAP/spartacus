/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';

export interface ProductConfiguratorConfig {}

declare module '@spartacus/core' {
  interface Config {
    productConfigurator?: ProductConfiguratorConfig;
  }
}
