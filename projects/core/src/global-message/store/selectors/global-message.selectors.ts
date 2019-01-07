import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromGlobalMessage from './../reducers/global-message.reducer';
import { getGlobalMessageState } from './feature.selector';
import { StateWithGlobalMessage } from '../global-message-state';

export const getGlobalMessageEntities: MemoizedSelector<
  StateWithGlobalMessage,
  any
> = createSelector(
  getGlobalMessageState,
  fromGlobalMessage.getEntities
);
