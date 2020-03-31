import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Translatable } from '../../../i18n/translatable';
import { GlobalMessageType } from '../../models/global-message.model';
import {
  GlobalMessageEntities,
  GlobalMessageState,
  StateWithGlobalMessage,
} from '../global-message-state';
import { getGlobalMessageState } from './feature.selector';

export const getGlobalMessageEntities: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageEntities
> = createSelector(
  getGlobalMessageState,
  (state: GlobalMessageState) => state.entities
);

export const getGlobalMessageEntitiesByType = (
  type: GlobalMessageType
): MemoizedSelector<StateWithGlobalMessage, Translatable[]> => {
  return createSelector(
    getGlobalMessageEntities,
    (entities) => entities && entities[type]
  );
};

export const getGlobalMessageCountByType = (
  type: GlobalMessageType
): MemoizedSelector<StateWithGlobalMessage, number> => {
  return createSelector(
    getGlobalMessageEntitiesByType(type),
    (entities) => entities && entities.length
  );
};
