import { InjectionToken, Provider } from '@angular/core';

import {
  MemoizedSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromGlobalErrorReducer from './global-error-handling.reducer';

export interface ErrorState {
  error: fromGlobalErrorReducer.GlobalErrorState;
}

export function getReducers(): ActionReducerMap<ErrorState> {
  return { error: fromGlobalErrorReducer.reducer };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<fromGlobalErrorReducer.GlobalErrorState>
> = new InjectionToken<
  ActionReducerMap<fromGlobalErrorReducer.GlobalErrorState>
>('GlobalErrorReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getGlobalErrorState: MemoizedSelector<
  any,
  fromGlobalErrorReducer.GlobalErrorState
> = createFeatureSelector<fromGlobalErrorReducer.GlobalErrorState>('error');
