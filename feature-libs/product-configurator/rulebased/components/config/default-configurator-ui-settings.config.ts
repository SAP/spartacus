/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

export const defaultConfiguratorUISettingsConfig: ConfiguratorUISettingsConfig =
  {
    productConfigurator: {
      updateDebounceTime: {
        quantity: 750,
        input: 500,
        date: 1500,
      },
      addRetractOption: false,
      enableNavigationToConflict: true,
      descriptions: {
        attributeDescriptionLength: 100,
        valueDescriptionLength: 70,
      },
    },
  };
