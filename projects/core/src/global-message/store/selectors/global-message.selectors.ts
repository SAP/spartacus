import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromGlobalMessage from './../reducers/global-message.reducer';
import { getGlobalMessageState } from './feature.selector';

export const getGlobalMessageEntities: MemoizedSelector<
  any,
  any
> = createSelector(
  getGlobalMessageState,
  fromGlobalMessage.getEntities
);
