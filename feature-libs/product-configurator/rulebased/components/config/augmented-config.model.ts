/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/product-configurator/common';
import { ProductConfiguratorCoreConfig } from './../../core/config/configurator-core.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ProductConfiguratorCoreConfig {}
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CONFIGURATOR_OV_FILTER = 'CONFIGURATOR_OV_FILTER',
  }
}
