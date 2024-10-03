/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';

export const CONFIGURATION_TEXTFIELD_FEATURE = 'productConfigurationTextfield';
export const CONFIGURATION_TEXTFIELD_DATA =
  '[ConfiguratorTextfield] Configuration Data';

export interface StateWithConfigurationTextfield {
  [CONFIGURATION_TEXTFIELD_FEATURE]: ConfigurationTextfieldState;
}

export interface ConfigurationTextfieldState {
  loaderState: StateUtils.LoaderState<ConfiguratorTextfield.Configuration>;
}
