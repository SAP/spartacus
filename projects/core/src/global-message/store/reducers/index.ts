/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer } from '@ngrx/store';
import { GlobalMessageState } from '../global-message-state';
import * as fromGlobalMessage from './global-message.reducer';

export function getReducers(): ActionReducer<GlobalMessageState, any> {
  return fromGlobalMessage.reducer;
}

export const reducerToken: InjectionToken<ActionReducer<GlobalMessageState>> =
  new InjectionToken<ActionReducer<GlobalMessageState>>(
    'GlobalMessageReducers'
  );

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
