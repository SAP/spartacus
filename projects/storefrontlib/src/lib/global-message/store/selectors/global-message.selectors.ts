import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromGlobalMessage from './../reducers/global-message.reducer';

export const getGlobalMessagesActiveState: MemoizedSelector<
  any,
  fromGlobalMessage.GlobalMessageState
> = createSelector(
  fromFeature.getGlobalMessageState,
  (globalMessageState: fromFeature.GlobalMessageState) =>
    globalMessageState.messages
);

export const getGlobalMessages: MemoizedSelector<any, any> = createSelector(
  getGlobalMessagesActiveState,
  fromGlobalMessage.getMessages
);
