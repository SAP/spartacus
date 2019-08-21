import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { AsmState } from '../asm-state';
import * as fromCustomerReducer from './customer.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    cusrtomerSearchResult: fromCustomerReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AsmState>
> = new InjectionToken<ActionReducerMap<AsmState>>('AsmReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
