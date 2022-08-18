/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  CartFacade,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { CartService } from './cart.service';
import { IntendedPickupLocationService } from './intended-pickup-location.service';
import { PickupLocationsSearchService } from './pickup-locations-search.service';

export const facadeProviders: Provider[] = [
  IntendedPickupLocationService,
  {
    provide: IntendedPickupLocationFacade,
    useExisting: IntendedPickupLocationService,
  },
  PickupLocationsSearchService,
  {
    provide: PickupLocationsSearchFacade,
    useExisting: PickupLocationsSearchService,
  },
  CartService,
  {
    provide: CartFacade,
    useExisting: CartService,
  },
];
