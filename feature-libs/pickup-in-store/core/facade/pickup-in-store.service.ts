import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { StateWithStock, StockActions } from '../store';

@Injectable()
export class PickupInStoreService implements PickupInStoreFacade {
  constructor(protected store: Store<StateWithStock>) {}

  getStore(): void {
    console.log('PickupInStoreService.getStore');
    this.store.dispatch(
      new StockActions.StockLevel({
        productCode: '300310300',
        latitude: 0,
        longitude: 0,
      })
    );
    console.log('PickupInStoreService.getStore done');
  }
}
