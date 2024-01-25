/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOptionFacade,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { PreferredStoreService } from '../services';
import { IntendedPickupLocationService } from './intended-pickup-location.service';
import { PickupLocationsSearchService } from './pickup-locations-search.service';
import { PickupOptionService } from './pickup-option.service';

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
  PickupOptionService,
  {
    provide: PickupOptionFacade,
    useExisting: PickupOptionService,
  },
  PreferredStoreService,
  { provide: PreferredStoreFacade, useExisting: PreferredStoreService },
];
