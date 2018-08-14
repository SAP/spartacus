import { InjectionToken, Provider } from '@angular/core';
import * as fromGlobalMessage from './global-message.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

export interface GlobalMessageState {
  messages: fromGlobalMessage.GlobalMessageState;
}

export function getReducers(): ActionReducerMap<GlobalMessageState> {
  return {
    messages: fromGlobalMessage.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<GlobalMessageState>
> = new InjectionToken<ActionReducerMap<GlobalMessageState>>(
  'GlobalMessageReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getGlobalMessageState: MemoizedSelector<
  any,
  GlobalMessageState
> = createFeatureSelector<GlobalMessageState>('globalMessage');
