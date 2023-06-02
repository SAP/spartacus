/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { OpfState } from '../opf-state';
import * as fromOpfUiReducer from './opf-ui.reducer';

export function getReducers(): ActionReducerMap<OpfState> {
  return {
    opfUi: fromOpfUiReducer.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<OpfState>> =
  new InjectionToken<ActionReducerMap<OpfState>>('OpfReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
