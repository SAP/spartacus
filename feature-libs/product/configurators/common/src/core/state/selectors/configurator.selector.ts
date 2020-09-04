import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Configurator, StateUtils } from '@spartacus/core';
import {
  ConfigurationState,
  CONFIGURATOR_FEATURE,
  StateWithConfiguration,
} from '../configuration-state';

export const getConfigurationsState: MemoizedSelector<
  StateWithConfiguration,
  ConfigurationState
> = createFeatureSelector<ConfigurationState>(CONFIGURATOR_FEATURE);

export const getConfigurationState: MemoizedSelector<
  StateWithConfiguration,
  StateUtils.EntityLoaderState<Configurator.Configuration>
> = createSelector(
  getConfigurationsState,
  (state: ConfigurationState) => state.configurations
);

export const getConfigurationProcessLoaderStateFactory = (
  code: string
): MemoizedSelector<
  StateWithConfiguration,
  StateUtils.ProcessesLoaderState<Configurator.Configuration>
> => {
  return createSelector(getConfigurationState, (details) =>
    StateUtils.entityProcessesLoaderStateSelector(details, code)
  );
};

export const hasPendingChanges = (
  code: string
): MemoizedSelector<StateWithConfiguration, boolean> => {
  return createSelector(getConfigurationState, (details) =>
    StateUtils.entityHasPendingProcessesSelector(details, code)
  );
};

export const getConfigurationFactory = (
  code: string
): MemoizedSelector<StateWithConfiguration, Configurator.Configuration> => {
  return createSelector(
    getConfigurationProcessLoaderStateFactory(code),
    (configurationState) => StateUtils.loaderValueSelector(configurationState)
  );
};

export const getCurrentGroup = (
  ownerKey: string
): MemoizedSelector<StateWithConfiguration, string> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.currentGroup || undefined
  );
};

export const getGroupStatus = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfiguration, Configurator.GroupStatus> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.groupsStatus[groupId] || undefined
  );
};

export const isGroupVisited = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfiguration, boolean> => {
  return createSelector(
    getConfigurationFactory(ownerKey),
    (configuration) =>
      configuration?.interactionState?.groupsVisited[groupId] || undefined
  );
};

export const areGroupsVisited = (
  ownerKey: string,
  groupIds: string[]
): MemoizedSelector<StateWithConfiguration, boolean> => {
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
