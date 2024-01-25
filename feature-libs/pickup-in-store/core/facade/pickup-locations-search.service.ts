/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PointOfService, PointOfServiceStock, Stock } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/root';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  BrowserLocationActions,
  HideOutOfStockSelectors,
  PickupLocationActions,
  PickupLocationsSelectors,
  StateWithPickupLocations,
  StateWithStock,
  StockLevelActions,
  StockSelectors,
  ToggleHideOutOfStockOptionsAction,
} from '../store/index';

@Injectable()
export class PickupLocationsSearchService
  implements PickupLocationsSearchFacade, OnDestroy
{
  subscription: Subscription = new Subscription();
  constructor(
    protected store: Store<StateWithStock & StateWithPickupLocations>
  ) {
    // Intentional empty constructor
  }

  stockLevelAtStore(productCode: string, storeName: string): void {
    this.store.dispatch(
      StockLevelActions.StockLevelAtStore({
        payload: { productCode, storeName },
      })
    );
  }

  getStockLevelAtStore(
    productCode: string,
    storeName: string
  ): Observable<Stock | undefined> {
    return this.store.pipe(
      select(StockSelectors.getStockAtStore(productCode, storeName))
    );
  }

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

  loadStoreDetails(storeName: string): void {
    this.subscription.add(
      this.getStoreDetails(storeName)
        .pipe(
          filter((storeDetails) => !storeDetails),
          tap((_storeDetails) =>
            this.store.dispatch(
              PickupLocationActions.GetStoreDetailsById({ payload: storeName })
            )
          )
        )
        .subscribe()
    );
  }

  getStoreDetails(name: string): Observable<PointOfService> {
    return this.store.pipe(
      select(PickupLocationsSelectors.getStoreDetailsByName(name))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
