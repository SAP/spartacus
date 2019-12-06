import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer } from '@ngrx/store';

import * as fromGlobalMessage from './global-message.reducer';
import { GlobalMessageState } from '../global-message-state';

export function getReducers(): ActionReducer<GlobalMessageState> {
  return fromGlobalMessage.reducer;
}

export const reducerToken: InjectionToken<
  ActionReducer<GlobalMessageState>
> = new InjectionToken<ActionReducer<GlobalMessageState>>(
  'GlobalMessageReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
