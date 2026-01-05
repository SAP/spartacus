/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/product-configurator/common';
import { ConfiguratorAttributeComposition } from '../attribute/composition/configurator-attribute-composition.config';
import { ProductConfiguratorCoreConfig } from './../../core/config/configurator-core.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';
import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ConfiguratorAttributeComposition,
      ProductConfiguratorCoreConfig {}
}

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    CONFLICT_SOLVER = 'CONFLICT_SOLVER',
    CONFIGURATOR_OV_FILTER = 'CONFIGURATOR_OV_FILTER',
    CONFIGURATOR_RESTART_DIALOG = 'CONFIGURATOR_RESTART_DIALOG',
  }
}

(LAUNCH_CALLER as any)['CONFLICT_SOLVER'] = 'CONFLICT_SOLVER';
(LAUNCH_CALLER as any)['CONFIGURATOR_OV_FILTER'] = 'CONFIGURATOR_OV_FILTER';
(LAUNCH_CALLER as any)['CONFIGURATOR_RESTART_DIALOG'] =
  'CONFIGURATOR_RESTART_DIALOG';
