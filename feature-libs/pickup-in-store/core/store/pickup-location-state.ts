/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PointOfService } from '@spartacus/core';
import {
  AugmentedPointOfService,
  PointOfServiceNames,
} from '@spartacus/pickup-in-store/root';

export const PICKUP_LOCATIONS_FEATURE = 'pickup-locations';

export interface StateWithPickupLocations {
  [PICKUP_LOCATIONS_FEATURE]: PickupLocationsState;
}

export interface PickupLocationsState {
  defaultPointOfService: PointOfServiceNames | null;
  intendedPickupLocations: IntendedPickupLocationsState;
  storeDetails: Record<string, PointOfService>;
}

export type IntendedPickupLocationsState = {
  [productCode: string]: AugmentedPointOfService;
};
