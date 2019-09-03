import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ProductConfiguration } from '../../../../model/configurator.model';
import {
  ConfigurationsState,
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../configuration-state';

const getConfigurationContentSelector = (state: ConfigurationsState) =>
  state.active.value.content;

export const getConfigurationsState: MemoizedSelector<
  StateWithConfiguration,
  ConfigurationsState
> = createFeatureSelector<ConfigurationsState>(CONFIGURATION_FEATURE);

export const getConfigurationContent: MemoizedSelector<
  StateWithConfiguration,
  ProductConfiguration
> = createSelector(
  getConfigurationsState,
  getConfigurationContentSelector
);
