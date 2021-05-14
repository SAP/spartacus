import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import {
  ConfiguratorState,
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../configurator-state';

export const getConfigurationsState: MemoizedSelector<
  StateWithConfigurator,
  ConfiguratorState
> = createFeatureSelector<ConfiguratorState>(CONFIGURATOR_FEATURE);

export const getConfigurationState: MemoizedSelector<
  StateWithConfigurator,
  StateUtils.EntityLoaderState<Configurator.Configuration>
> = createSelector(
  getConfigurationsState,
  (state: ConfiguratorState) => state.configurations
);

export const getConfigurationProcessLoaderStateFactory = (
  code: string
): MemoizedSelector<
  StateWithConfigurator,
  StateUtils.ProcessesLoaderState<Configurator.Configuration>
> => {
  return createSelector(getConfigurationState, (details) =>
    StateUtils.entityProcessesLoaderStateSelector(details, code)
  );
};

export const hasPendingChanges = (
  code: string
): MemoizedSelector<StateWithConfigurator, boolean> => {
  return createSelector(getConfigurationState, (details) =>
    StateUtils.entityHasPendingProcessesSelector(details, code)
  );
};

export const getConfigurationFactory = (
  code: string
): MemoizedSelector<StateWithConfigurator, Configurator.Configuration> => {
  return createSelector(
    getConfigurationProcessLoaderStateFactory(code),
    (configurationState) => StateUtils.loaderValueSelector(configurationState)
  );
};

export const getCurrentGroup = (
  ownerKey: string
): MemoizedSelector<StateWithConfigurator, string | undefined> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) => configuration?.interactionState?.currentGroup
  );
};

export const isGroupVisited = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfigurator, boolean> => {
  return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
    const groupsVisited = configuration?.interactionState?.groupsVisited;
    return groupsVisited ? groupsVisited[groupId] : false;
  });
};

export const areGroupsVisited = (
  ownerKey: string,
  groupIds: string[]
): MemoizedSelector<StateWithConfigurator, boolean> => {
  return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
    return (
      groupIds
        .map((id) => {
          const groupsVisited = configuration?.interactionState?.groupsVisited;
          return groupsVisited ? groupsVisited[id] : false;
        })
        .filter((visited) => !visited).length === 0
    );
  });
};
