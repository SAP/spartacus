/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithPickupLocations,
  PickupLocationsState,
} from '../pickup-location-state';
import { getPickupLocationsState } from './feature.selectors';

export const getPreferredStore: MemoizedSelector<
  StateWithPickupLocations,
  PickupLocationsState['defaultPointOfService']
> = createSelector(
  getPickupLocationsState,
  (pickupLocationsState) => pickupLocationsState.defaultPointOfService
);
