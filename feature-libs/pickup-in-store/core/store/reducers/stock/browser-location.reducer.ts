/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { BrowserLocationActions } from '../../actions/index';
import { StockState } from '../../stock-state';

export const initialState: StockState['browserLocation'] = {
  latitude: null,
  longitude: null,
};

export const browserLocationReducer = createReducer(
  initialState,
  on(BrowserLocationActions.AddBrowserLocation, (state, { payload }) => ({
    ...state,
    latitude: payload.latitude,
    longitude: payload.longitude,
  }))
);
