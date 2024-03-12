/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const intendedPickupLocationsInitialState: PickupLocationsState['intendedPickupLocations'] =
  {};

export const intendedPickupLocationsReducer = createReducer(
  intendedPickupLocationsInitialState,
  on(PickupLocationActions.AddLocation, (state, { payload }) => ({
    ...state,
    [payload.productCode]: payload.location,
  })),
  on(PickupLocationActions.RemoveLocation, (state, { payload }) => ({
    ...state,
    [payload]: { pickupOption: 'delivery' as const },
  })),
  on(PickupLocationActions.SetPickupOption, (state, { payload }) => ({
    ...state,
    [payload.productCode]: {
      ...state[payload.productCode],
      pickupOption: payload.pickupOption,
    },
  }))
);
