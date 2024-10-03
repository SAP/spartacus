/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import { AsmActions } from '../actions';
import {
  AsmState,
  CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA,
  CUSTOMER_SEARCH_DATA,
} from '../asm-state';
import * as fromAsmUiReducer from './asm-ui.reducer';

export function getReducers(): ActionReducerMap<AsmState> {
  return {
    customerSearchResult:
      StateUtils.loaderReducer<CustomerSearchPage>(CUSTOMER_SEARCH_DATA),
    customerListCustomersSearchResult:
      StateUtils.loaderReducer<CustomerSearchPage>(
        CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA
      ),
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
