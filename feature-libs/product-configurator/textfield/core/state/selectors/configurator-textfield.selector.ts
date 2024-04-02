/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import {
  ConfigurationTextfieldState,
  CONFIGURATION_TEXTFIELD_FEATURE,
  StateWithConfigurationTextfield,
} from '../configuration-textfield-state';

const getConfigurationContentSelector = (state: ConfigurationTextfieldState) =>
  state.loaderState.value;

export const getConfigurationsState: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfigurationTextfieldState
> = createFeatureSelector<ConfigurationTextfieldState>(
  CONFIGURATION_TEXTFIELD_FEATURE
);

export const getConfigurationContent: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfiguratorTextfield.Configuration | undefined
> = createSelector(getConfigurationsState, getConfigurationContentSelector);
