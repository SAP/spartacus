import * as fromGlobalMessage from './global-message.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

export interface GlobalMessageState {
  active: fromGlobalMessage.GlobalMessageState;
}

export const reducers: ActionReducerMap<GlobalMessageState> = {
  active: fromGlobalMessage.reducer
};

export const getGlobalMessageState: MemoizedSelector<
  any,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>('globalMessage');
