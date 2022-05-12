import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_PICKUP_IN_STORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PickupInStoreFacade,
      feature: CART_PICKUP_IN_STORE_FEATURE,
      methods: [],
      async: true,
    }),
})
export abstract class PickupInStoreFacade {
  abstract getStore(): void;
}
