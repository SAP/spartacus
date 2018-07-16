import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromGlobalMessage from './../reducers/global-message.reducer';

export const getGlobalMessageActiveState: MemoizedSelector<
  any,
  fromGlobalMessage.GlobalMessageState
> = createSelector(
  fromFeature.getGlobalMessageState,
  (globalMessageState: fromFeature.GlobalMessageState) =>
    globalMessageState.active
);

export const getGlobalMessages: MemoizedSelector<any, any> = createSelector(
  getGlobalMessageActiveState,
  fromGlobalMessage.getMessages
);
