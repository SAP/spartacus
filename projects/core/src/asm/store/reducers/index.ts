import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmState, CUSTOMER_SEARCH_DATA } from '../asm-state';
import * as fromAsmUiReducer from './asm-ui.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    customerSearchResult: loaderReducer<CustomerSearchPage>(
      CUSTOMER_SEARCH_DATA
    ),
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
