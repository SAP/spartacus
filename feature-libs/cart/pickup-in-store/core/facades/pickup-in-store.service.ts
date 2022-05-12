import { Injectable } from '@angular/core';
import { PickupInStoreFacade } from '@spartacus/cart/pickup-in-store/root';

@Injectable()
export class PickupInStoreService implements PickupInStoreFacade {
  getStore(): void {}
}
