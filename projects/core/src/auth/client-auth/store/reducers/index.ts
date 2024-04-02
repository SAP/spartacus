/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from '../../../../state/utils/loader/loader.reducer';
import { ClientToken } from '../../models/client-token.model';
import { ClientAuthState, CLIENT_TOKEN_DATA } from '../client-auth-state';

export function getReducers(): ActionReducerMap<ClientAuthState> {
  return {
    clientToken: loaderReducer<ClientToken>(CLIENT_TOKEN_DATA),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<ClientAuthState>> =
  new InjectionToken<ActionReducerMap<ClientAuthState>>('ClientAuthReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
