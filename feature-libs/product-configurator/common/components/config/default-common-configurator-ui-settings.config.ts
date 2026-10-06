/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorType } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUISettingsConfig } from './common-configurator-ui-settings.config';

export const defaultCommonConfiguratorUISettingsConfig: CommonConfiguratorUISettingsConfig =
  {
    productConfigurator: {
      cartEntryBundleLineItemsThreshold: 10,
      overviewMenuFilterTabVisible: {
        [ConfiguratorType.VARIANT]: true,
      },
    },
  };
