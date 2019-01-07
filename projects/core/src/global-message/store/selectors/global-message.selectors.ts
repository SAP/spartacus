import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromGlobalMessage from './../reducers/global-message.reducer';
import {
  StateWithGlobalMessage,
  GlobalMessageState,
  GLOBAL_MESSAGE_FEATURE
} from '../global-message-state';

export const getGlobalMessageState: MemoizedSelector<
  StateWithGlobalMessage,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>(GLOBAL_MESSAGE_FEATURE);

export const getGlobalMessageEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getGlobalMessageState,
  fromGlobalMessage.getEntities
);
