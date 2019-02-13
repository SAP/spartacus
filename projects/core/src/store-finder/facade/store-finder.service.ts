import { Injectable } from '@angular/core';
import { Store, Action, select } from '@ngrx/store';
import {
  StateWithStoreFinder,
  FindStoresState,
  ViewAllStoresState
} from '../store/store-finder-state';

import * as fromStore from '../store/index';
import { StoreFinderSearchConfig } from './../model/search-config';
import { LongitudeLatitude } from './../model/longitude-latitude';
import { Observable } from 'rxjs';
import { WindowRef } from '../../window/window-ref';

@Injectable()
export class StoreFinderService {
  private geolocationWatchId: number = null;

  constructor(
    private store: Store<StateWithStoreFinder>,
    private winRef: WindowRef
  ) {}

  /**
   * Returns boolean observable for store's loading state
   */
  getStoresLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getStoresLoading));
  }

  /**
   * Returns observable for store's entities
   */
  getFindStoresEntities(): Observable<FindStoresState> {
    return this.store.pipe(select(fromStore.getFindStoresEntities));
  }

  /**
   * Returns boolean observable for view all store's loading state
   */
  getViewAllStoresLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getViewAllStoresLoading));
  }

  /**
   * Returns observable for view all store's entities
   */
  getViewAllStoresEntities(): Observable<ViewAllStoresState> {
    return this.store.pipe(select(fromStore.getViewAllStoresEntities));
  }

  /**
   * Store finding action functionality
   * @param queryText text query
   * @param longitudeLatitude longitude and latitude coordinates
   * @param searchConfig search configuration
   * @param countryIsoCode country ISO code
   */
  findStoresAction(
    queryText: string,
    longitudeLatitude: LongitudeLatitude,
    searchConfig: StoreFinderSearchConfig,
    countryIsoCode?: string
  ) {
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: queryText,
        longitudeLatitude: longitudeLatitude,
        searchConfig: searchConfig,
        countryIsoCode: countryIsoCode
      })
    );
  }

  /**
   * View all stores
   */
  viewAllStores() {
    this.clearWatchGeolocation(new fromStore.ViewAllStores());
  }

  /**
   * View all stores by id
   * @param storeId store id
   */
  viewStoreById(storeId: string) {
    this.clearWatchGeolocation(new fromStore.FindStoreById({ storeId }));
  }

  /**
   * Find all stores
   * @param queryText text query
   * @param useMyLocation use current location
   */
  findStores(queryText: string, useMyLocation?: boolean) {
    if (useMyLocation && this.winRef.nativeWindow) {
      this.clearWatchGeolocation(new fromStore.OnHold());
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          const longitudeLatitude: LongitudeLatitude = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          };
          this.clearWatchGeolocation(
            new fromStore.FindStores({ queryText, longitudeLatitude })
          );
        }
      );
    } else {
      this.clearWatchGeolocation(new fromStore.FindStores({ queryText }));
    }
  }

  private clearWatchGeolocation(callbackAction: Action) {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(callbackAction);
  }
}
