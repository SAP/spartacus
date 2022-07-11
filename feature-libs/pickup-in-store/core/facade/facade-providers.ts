import { Provider } from '@angular/core';
import {
  IntendedPickupLocationFacade,
  PickupInStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { IntendedPickupLocationService } from './intended-pickup-location.service';
import { PickupInStoreService } from './pickup-in-store.service';

export const facadeProviders: Provider[] = [
  IntendedPickupLocationService,
  {
    provide: IntendedPickupLocationFacade,
    useExisting: IntendedPickupLocationService,
  },
  PickupInStoreService,
  {
    provide: PickupInStoreFacade,
    useExisting: PickupInStoreService,
  },
];
