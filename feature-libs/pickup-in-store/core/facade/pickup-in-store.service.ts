import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockEntities, StockLocationSearchParams } from '../model/index';
import { StateWithStock, StockActions, StockSelectors } from '../store';

@Injectable()
export class PickupInStoreService implements PickupInStoreFacade {
  constructor(protected store: Store<StateWithStock>) {}

  getStock({
    productCode,
    latitude,
    longitude,
    location,
  }: StockLocationSearchParams): void {
    this.store.dispatch(
      new StockActions.StockLevel({
        productCode,
        latitude,
        longitude,
        location,
      })
    );
  }

  getStockLoading(): Observable<boolean> {
    return this.store.pipe(select(StockSelectors.getStockLoading));
  }

  getStockSuccess(): Observable<boolean> {
    return this.store.pipe(select(StockSelectors.getStockSuccess));
  }

  getSearchHasBeenPerformed(): Observable<boolean> {
    return this.store.pipe(select(StockSelectors.getSearchHasBeenPerformed));
  }

  getStockEntities(): Observable<StockEntities> {
    return this.store.pipe(
      select(StockSelectors.getStockEntities),
      map((data) => data.findStockLevelByCode)
    );
  }
}
