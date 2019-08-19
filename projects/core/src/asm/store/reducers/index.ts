import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { AsmState } from '../asm-state';
import * as fromCustomerReducer from './customer.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    cusrtomerSearchResult: combineReducers({
      token: fromCustomerReducer.reducer,
    }),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AsmState>
> = new InjectionToken<ActionReducerMap<AsmState>>('AsmReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
