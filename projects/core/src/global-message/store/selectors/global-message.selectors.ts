import { MemoizedSelector, createSelector } from '@ngrx/store';
import { getGlobalMessageState } from './feature.selector';
import {
  StateWithGlobalMessage,
  GlobalMessageState,
  GlobalMessageEntities
} from '../global-message-state';

export const getGlobalMessageEntities: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageEntities
> = createSelector(
  getGlobalMessageState,
  (state: GlobalMessageState) => state.entities
);
