/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { SiteThemeState } from '../state';

import * as fromThemes from './site-themes.reducer';

export function getReducers(): ActionReducerMap<SiteThemeState, any> {
  return {
    themes: fromThemes.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<SiteThemeState>> =
  new InjectionToken<ActionReducerMap<SiteThemeState>>('SiteThemeReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
