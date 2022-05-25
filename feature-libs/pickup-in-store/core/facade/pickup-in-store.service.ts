import { Injectable } from '@angular/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';

@Injectable()
export class PickupInStoreService implements PickupInStoreFacade {
  getStore(): void {
    console.log('facade test passed');
  }
}
