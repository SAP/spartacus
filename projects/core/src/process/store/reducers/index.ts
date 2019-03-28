import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import { ProcessState } from '../process-state';
// import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

export function getReducers<T>(): ActionReducerMap<ProcessState<T>> {
  return {};
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ProcessState<any>>
> = new InjectionToken<ActionReducerMap<ProcessState<any>>>('ProcessReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};
