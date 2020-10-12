import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions/index';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmState, CUSTOMER_SEARCH_DATA } from '../asm-state';
import * as fromAsmUiReducer from './asm-ui.reducer';
import * as fromCSAgentTokenReducer from './csagent-token.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    customerSearchResult: loaderReducer<CustomerSearchPage>(
      CUSTOMER_SEARCH_DATA
    ),
    asmUi: fromAsmUiReducer.reducer,
    csagentToken: combineReducers({ token: fromCSAgentTokenReducer.reducer }),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  AsmState
>> = new InjectionToken<ActionReducerMap<AsmState>>('AsmReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearCustomerSupportAgentAsmState(
  reducer: ActionReducer<AsmState, Action>
): ActionReducer<AsmState, Action> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT_CUSTOMER_SUPPORT_AGENT) {
      state = {
        ...state,
        customerSearchResult: undefined,
        csagentToken: undefined,
      };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [
  clearCustomerSupportAgentAsmState,
];
