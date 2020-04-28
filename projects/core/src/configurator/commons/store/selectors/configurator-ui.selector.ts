import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  EntityState,
  StateEntitySelectors,
} from '../../../../state/utils/index';
import {
  ConfigurationState,
  StateWithConfiguration,
  UiState,
} from '../configuration-state';
import { getConfigurationsState } from './configurator.selector';

const getUiState: MemoizedSelector<
  StateWithConfiguration,
  EntityState<UiState>
> = createSelector(
  getConfigurationsState,
  (state: ConfigurationState) => state.uiState
);

export const getUiStateForOwner = (
  ownerKey: string
): MemoizedSelector<StateWithConfiguration, UiState> => {
  return createSelector(getUiState, (details) =>
    StateEntitySelectors.entitySelector(details, ownerKey)
  );
};

export const getCurrentGroupForProduct = (
  ownerKey: string
): MemoizedSelector<StateWithConfiguration, string> => {
  return createSelector(
    getUiStateForOwner(ownerKey),
    (details) => details.currentGroup
  );
};

export const isGroupVisisted = (
  ownerKey: string,
  groupId: string
): MemoizedSelector<StateWithConfiguration, Boolean> => {
  return createSelector(getUiStateForOwner(ownerKey), (details) =>
    StateEntitySelectors.entitySelector(details.groupsVisited, groupId)
  );
};
