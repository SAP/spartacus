import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions';
import { AsmState, CUSTOMER_SEARCH_DATA } from '../asm-state';
import * as fromAsmUiReducer from './asm-ui.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    customerSearchResult:
      StateUtils.loaderReducer<CustomerSearchPage>(CUSTOMER_SEARCH_DATA),
    asmUi: fromAsmUiReducer.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<AsmState>> =
  new InjectionToken<ActionReducerMap<AsmState>>('AsmReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearCustomerSupportAgentAsmState(
  reducer: ActionReducer<AsmState, Action>
): ActionReducer<AsmState, Action> {
  return function (state: AsmState | undefined, action: Action) {
    if (action.type === AsmActions.LOGOUT_CUSTOMER_SUPPORT_AGENT) {
      state = {
        ...(state as AsmState),
        customerSearchResult: {} as StateUtils.LoaderState<CustomerSearchPage>,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [
  clearCustomerSupportAgentAsmState,
];
