import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
import { EntityLoaderState } from '../../../../state/utils/entity-loader/entity-loader-state';
import {
  StateEntityProcessesLoaderSelectors,
  StateLoaderSelectors,
} from '../../../../state/utils/index';
import { ProcessesLoaderState } from '../../../../state/utils/processes-loader/processes-loader-state';
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

export const getConfigurationProcessLoaderStateFactory = (
  code: string
): MemoizedSelector<
  StateWithConfiguration,
  ProcessesLoaderState<Configurator.Configuration>
> => {
  return createSelector(
    getConfigurationState,
    details =>
      StateEntityProcessesLoaderSelectors.entityProcessesLoaderStateSelector(
        details,
        code
      )
  );
};

export const hasPendingChanges = (
  code: string
): MemoizedSelector<StateWithConfiguration, boolean> => {
  return createSelector(
    getConfigurationState,
    details =>
      StateEntityProcessesLoaderSelectors.entityHasPendingProcessesSelector(
        details,
        code
      )
  );
};

export const getConfigurationFactory = (
  code: string
): MemoizedSelector<StateWithConfiguration, Configurator.Configuration> => {
  return createSelector(
    getConfigurationProcessLoaderStateFactory(code),
    configurationState =>
      StateLoaderSelectors.loaderValueSelector(configurationState)
  );
};
