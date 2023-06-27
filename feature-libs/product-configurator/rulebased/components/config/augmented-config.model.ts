/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/product-configurator/common';
import { ProductConfiguratorCpqConfig } from '../../cpq/config/configurator-cpq.config';
import { ConfiguratorAttributeComposition } from '../attribute/composition/configurator-attribute-composition.config';
import { ProductConfiguratorCoreConfig } from './../../core/config/configurator-core.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ConfiguratorAttributeComposition,
      ProductConfiguratorCoreConfig,
      ProductConfiguratorCpqConfig {}
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CONFLICT_SOLVER = 'CONFLICT_SOLVER',
    CONFIGURATOR_OV_FILTER = 'CONFIGURATOR_OV_FILTER',
    CONFIGURATOR_RESTART_DIALOG = 'CONFIGURATOR_RESTART_DIALOG',
  }
}
