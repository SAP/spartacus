import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PointOfServiceStock } from '@spartacus/core';
import {
  PickupInStoreFacade,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockEntities } from '../model/index';
import {
  HideOutOfStockOptionsAction,
  HideOutOfStockSelectors,
  StateWithStock,
  StockLevelActions,
  StockSelectors,
} from '../store/index';

@Injectable()
export class PickupInStoreService implements PickupInStoreFacade {
  constructor(protected readonly store: Store<StateWithStock>) {}

  getStock({
    productCode,
    latitude,
    longitude,
    location,
  }: StockLocationSearchParams): void {
    this.store.dispatch(
      new StockLevelActions.StockLevel({
        productCode,
        latitude,
        longitude,
        location,
      })
    );
  }

  clearStockData(): void {
    this.store.dispatch(new StockLevelActions.ClearStockData());
  }

  getStockLoading(): Observable<boolean> {
    return this.store.pipe(select(StockSelectors.getStockLoading));
  }

  getHideOutOfStockState(): Observable<boolean> {
    return this.store.pipe(
      select(HideOutOfStockSelectors.getHideOutOfStockState)
    );
  }

  hideOutOfStock(): void {
    this.store.dispatch(HideOutOfStockOptionsAction());
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

  getStores(): Observable<PointOfServiceStock[]> {
    return this.store.pipe(select(StockSelectors.getStores));
  }
}
