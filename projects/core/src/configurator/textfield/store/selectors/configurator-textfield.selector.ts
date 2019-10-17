import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import {
  ConfigurationsTextfieldState,
  CONFIGURATION_TEXTFIELD_FEATURE,
  StateWithConfigurationTextfield,
} from '../configuration-textfield-state';

const getConfigurationContentSelector = (state: ConfigurationsTextfieldState) =>
  state.active.value.content;

const getConfigurationsState: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfigurationsTextfieldState
> = createFeatureSelector<ConfigurationsTextfieldState>(
  CONFIGURATION_TEXTFIELD_FEATURE
);

export const getConfigurationContent: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfiguratorTextfield.Configuration
> = createSelector(
  getConfigurationsState,
  getConfigurationContentSelector
);
