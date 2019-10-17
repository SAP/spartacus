import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import {
  ConfigurationsState,
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../configuration-textfield-state';

const getConfigurationContentSelector = (state: ConfigurationsState) =>
  state.active.value.content;

const getConfigurationsState: MemoizedSelector<
  StateWithConfiguration,
  ConfigurationsState
> = createFeatureSelector<ConfigurationsState>(CONFIGURATION_FEATURE);

export const getConfigurationContent: MemoizedSelector<
  StateWithConfiguration,
  ConfiguratorTextfield.Configuration
> = createSelector(
  getConfigurationsState,
  getConfigurationContentSelector
);
