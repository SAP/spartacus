/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { DefaultPointOfServiceActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const defaultPointOfServiceInitialState: PickupLocationsState['defaultPointOfService'] =
  null;

export const defaultPointOfServiceReducer = createReducer(
  defaultPointOfServiceInitialState as PickupLocationsState['defaultPointOfService'],
  on(
    DefaultPointOfServiceActions.LoadDefaultPointOfServiceSuccess,
    (_state, { payload }) => payload
  )
);
