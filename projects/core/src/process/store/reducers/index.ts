import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import { ProcessState } from '../process-state';
import { loaderReducer } from '../../../state';
import { USER_UPDATE_DETAILS } from '../../../user/store/user-state';

export function getReducers(): ActionReducerMap<ProcessState> {
  return { updateUserDetails: loaderReducer<void>(USER_UPDATE_DETAILS) };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProcessState>
> = new InjectionToken<ActionReducerMap<ProcessState>>('ProcessReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};
