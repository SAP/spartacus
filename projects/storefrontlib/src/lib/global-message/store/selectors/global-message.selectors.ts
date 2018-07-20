import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromGlobalMessage from './../reducers/global-message.reducer';

export const getGlobalMessagesMessagesState: MemoizedSelector<
  any,
  fromGlobalMessage.GlobalMessageState
> = createSelector(
  fromFeature.getGlobalMessageState,
  (globalMessageState: fromFeature.GlobalMessageState) =>
    globalMessageState.messages
);

export const getGlobalMessagesEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getGlobalMessagesMessagesState,
  fromGlobalMessage.getEntities
);
