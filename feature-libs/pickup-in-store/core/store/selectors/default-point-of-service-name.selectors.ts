/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  PickupLocationsState,
  StateWithPickupLocations,
} from '../pickup-location-state';
import { getPickupLocationsState } from './feature.selectors';

export const getPreferredStore: MemoizedSelector<
  StateWithPickupLocations,
  PickupLocationsState['defaultPointOfService']
> = createSelector(
  getPickupLocationsState,
  (pickupLocationsState) => pickupLocationsState.defaultPointOfService
);
