import { MemoizedSelector, createSelector } from '@ngrx/store';
import { getGlobalMessageState } from './feature.selector';
import {
  StateWithGlobalMessage,
  GlobalMessageState,
  GlobalMessageEntities,
} from '../global-message-state';
import { GlobalMessageType, Translatable } from '@spartacus/core';

export const getGlobalMessageEntities: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageEntities
> = createSelector(
  getGlobalMessageState,
  (state: GlobalMessageState) => state.entities
);

export const getGlobalMessageEntitiesByType = (
  type: GlobalMessageType
): MemoizedSelector<any, Translatable[]> => {
  return createSelector(
    getGlobalMessageEntities,
    entities => entities[type]
  );
};

export const getGlobalMessageCountByType = (
  type: GlobalMessageType
): MemoizedSelector<any, number> => {
  return createSelector(
    getGlobalMessageEntitiesByType(type),
    entities => entities.length
  );
};
