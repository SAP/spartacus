import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
import { EntityLoaderState } from '../../../../state/utils/entity-loader/entity-loader-state';
import {
  StateEntityLoaderSelectors,
  StateLoaderSelectors,
} from '../../../../state/utils/index';
import { LoaderState } from '../../../../state/utils/loader/loader-state';
import {
  ConfigurationState,
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../configuration-state';

// const getConfigurationContentSelector = (state: ConfigurationState) =>
//   state.content;

export const getConfigurationsState: MemoizedSelector<
  StateWithConfiguration,
  ConfigurationState
> = createFeatureSelector<ConfigurationState>(CONFIGURATION_FEATURE);

export const getConfigurationState: MemoizedSelector<
  StateWithConfiguration,
  EntityLoaderState<Configurator.Configuration>
> = createSelector(
  getConfigurationsState,
  (state: ConfigurationState) => state.configurations
);

export const getPendingChanges: MemoizedSelector<
  StateWithConfiguration,
  number
> = createSelector(
  getConfigurationsState,
  state =>
    state.changeCounter && state.changeCounter.pendingChanges
      ? state.changeCounter.pendingChanges
      : 0
);

export const getConfigurationStateFactory = (
  code: string
): MemoizedSelector<
  StateWithConfiguration,
  LoaderState<Configurator.Configuration>
> => {
  return createSelector(
    getConfigurationState,
    details => StateEntityLoaderSelectors.entityStateSelector(details, code)
  );
};

export const getConfigurationFactory = (
  code: string
): MemoizedSelector<StateWithConfiguration, Configurator.Configuration> => {
  return createSelector(
    getConfigurationStateFactory(code),
    configurationState =>
      StateLoaderSelectors.loaderValueSelector(configurationState)
  );
};
