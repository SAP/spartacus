import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { AsmState } from '../asm-state';
import * as fromAsmUiReducer from './asm-ui.reducer';
import * as fromCustomerReducer from './customer.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    customerSearchResult: fromCustomerReducer.reducer,
    asmUi: fromAsmUiReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<AsmState>
> = new InjectionToken<ActionReducerMap<AsmState>>('AsmReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
