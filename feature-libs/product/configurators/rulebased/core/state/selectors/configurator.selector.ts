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
): MemoizedSelector<StateWithConfigurator, string> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.currentGroup || undefined
  );
};

export const getGroupStatus = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfigurator, Configurator.GroupStatus> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.groupsStatus[groupId] || undefined
  );
};

export const isGroupVisited = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfigurator, boolean> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.groupsVisited[groupId] || undefined
  );
};

export const areGroupsVisited = (
  ownerKey: string,
  groupIds: string[]
): MemoizedSelector<StateWithConfigurator, boolean> => {
  return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
    let isVisited = true;
    groupIds.forEach((groupId) => {
      if (!isVisited) {
        return;
      }

      isVisited =
        configuration?.interactionState?.groupsVisited[groupId] || undefined;
      if (isVisited === undefined) {
        isVisited = false;
      }
    });

    return isVisited;
  });
};
