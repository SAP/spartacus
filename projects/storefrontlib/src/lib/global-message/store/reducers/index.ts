import * as fromGlobalMessage from './global-message.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

export interface GlobalMessageState {
  messages: fromGlobalMessage.GlobalMessageState;
}

export const reducers: ActionReducerMap<GlobalMessageState> = {
  messages: fromGlobalMessage.reducer
};

export const getGlobalMessageState: MemoizedSelector<
  any,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>('globalMessage');
