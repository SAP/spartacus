import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PointOfServiceStock } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { Observable, of } from 'rxjs';

import { StockEntities, StockLocationSearchParams } from '../model/index';
import { StateWithStock, StockLevelActions } from '../store/index';

@Injectable()
export class MockPickupInStoreService implements PickupInStoreFacade {
  constructor(protected store: Store<StateWithStock>) {}

  getStock({
    productCode,
    latitude,
    longitude,
    location,
  }: StockLocationSearchParams): void {
    new StockLevelActions.StockLevel({
      productCode,
      latitude,
      longitude,
      location,
    });
  }

  clearStockData(): void {}

  getStockLoading(): Observable<boolean> {
    return of(true);
  }

  getHideOutOfStockState(): Observable<boolean> {
    return of(true);
  }

  hideOutOfStock(): void {}

  getStockSuccess(): Observable<boolean> {
    return of(true);
  }

  getSearchHasBeenPerformed(): Observable<boolean> {
    return of(true);
  }

  getStockEntities(): Observable<StockEntities> {
    return of({});
  }

  getStores(): Observable<PointOfServiceStock[]> {
    return of([]);
  }
}
