import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { OccUserIdState } from '../occ-user-id-state';
import { occUserIdReducer } from './occ-user-id.reducer';

export function getReducers(): ActionReducerMap<OccUserIdState> {
  return {
    occUserId: occUserIdReducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<OccUserIdState>
> = new InjectionToken<ActionReducerMap<OccUserIdState>>('OccUserIdReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
