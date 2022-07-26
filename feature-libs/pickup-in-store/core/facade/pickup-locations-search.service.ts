import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PointOfServiceStock } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import {
  BrowserLocationActions,
  HideOutOfStockSelectors,
  StateWithStock,
  StockLevelActions,
  StockSelectors,
  ToggleHideOutOfStockOptionsAction,
} from '../store/index';

// TODO jsdoc

@Injectable()
export class PickupLocationsSearchService
  implements PickupLocationsSearchFacade
{
  constructor(protected readonly store: Store<StateWithStock>) {}

  startSearch(searchParams: StockLocationSearchParams): void {
    this.store.dispatch(new StockLevelActions.StockLevel(searchParams));
  }

  hasSearchStarted(productCode: string): Observable<boolean> {
    return this.store.pipe(
      select(StockSelectors.hasSearchStartedForProductCode(productCode))
    );
  }

  isSearchRunning(): Observable<boolean> {
    return this.store.pipe(select(StockSelectors.getStockLoading));
  }

  getSearchResults(productCode: string): Observable<PointOfServiceStock[]> {
    return this.store.pipe(
      select(StockSelectors.getStoresWithStockForProductCode(productCode))
    );
  }

  clearSearchResults(): void {
    this.store.dispatch(new StockLevelActions.ClearStockData());
  }

  getHideOutOfStock(): Observable<boolean> {
    return this.store.pipe(
      select(HideOutOfStockSelectors.getHideOutOfStockState)
    );
  }

  setBrowserLocation(latitude: number, longitude: number): void {
    this.store.dispatch(
      BrowserLocationActions.AddBrowserLocation({
        payload: { latitude, longitude },
      })
    );
  }

  toggleHideOutOfStock(): void {
    this.store.dispatch(ToggleHideOutOfStockOptionsAction());
  }
}
