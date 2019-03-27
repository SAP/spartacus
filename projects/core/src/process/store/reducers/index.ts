import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import { ProcessState } from '../process-state';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

export function getReducers(): ActionReducerMap<ProcessState> {
  return { updateUserDetails: loaderReducer('to-be-changed') };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProcessState>
> = new InjectionToken<ActionReducerMap<ProcessState>>('ProcessReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};
