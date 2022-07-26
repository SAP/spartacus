import { Provider } from '@angular/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
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
];
