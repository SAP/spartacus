import { InjectionToken, Provider } from '@angular/core';
import * as fromGlobalMessage from './global-message.reducer';
import {
  GlobalMessageState
} from '../global-message-state';
import { ActionReducerMap } from '@ngrx/store';

export function getReducers(): ActionReducerMap<GlobalMessageState> {
  return fromGlobalMessage.reducer;
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
