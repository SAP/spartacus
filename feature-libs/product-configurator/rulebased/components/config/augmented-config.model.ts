/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@commerce-storefront-toolset/product-configurator/common';
import { ProductConfiguratorCoreConfig } from './../../core/config/configurator-core.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

declare module '@commerce-storefront-toolset/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ProductConfiguratorCoreConfig {}
}
