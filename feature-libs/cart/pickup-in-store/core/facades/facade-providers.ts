import { Provider } from '@angular/core';
import { PickupInStoreFacade } from '@spartacus/cart/pickup-in-store/root';
import { PickupInStoreService } from './pickup-in-store.service';

export const facadeProviders: Provider[] = [
  PickupInStoreService,
  {
    provide: PickupInStoreFacade,
    useExisting: PickupInStoreService,
  },
];
