/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorMessageConfig } from './configurator-message.config';

export const defaultConfiguratorMessageConfig: ConfiguratorMessageConfig = {
  productConfigurator: {
    updateConfigurationMessage: {
      waitingTime: 1000,
    },
  },
};
