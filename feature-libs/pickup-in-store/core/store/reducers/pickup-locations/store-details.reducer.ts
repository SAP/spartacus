/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const storeDetailsInitialState: PickupLocationsState['storeDetails'] =
  {};

export const storeDetailsReducer = createReducer(
  storeDetailsInitialState,

  on(PickupLocationActions.SetStoreDetailsSuccess, (state, { payload }) => ({
    ...state,
    ...(payload.name ? { [payload.name]: payload } : {}),
  }))
);
