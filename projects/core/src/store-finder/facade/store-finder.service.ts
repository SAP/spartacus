import { Injectable } from '@angular/core';
import { Store, Action, select } from '@ngrx/store';
import { StateWithStoreFinder } from '../store/store-finder-state';

import * as fromStore from '../store/index';
import { StoreFinderSearchConfig } from './../model/search-config';
import { LongitudeLatitude } from './../model/longitude-latitude';
import { StoreEntities } from '../model/store-entities';
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
  getFindStoresEntities(): Observable<StoreEntities> {
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
  getViewAllStoresEntities(): Observable<StoreEntities> {
    return this.store.pipe(select(fromStore.getViewAllStoresEntities));
  }

  /**
   * Store finding action functionality
   * @param queryText text query
   * @param longitudeLatitude longitude and latitude coordinates
   * @param searchConfig search configuration
   */
  findStoresAction(
    queryText: string,
    longitudeLatitude: LongitudeLatitude,
    searchConfig: StoreFinderSearchConfig
  ) {
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: queryText,
        longitudeLatitude: longitudeLatitude,
        searchConfig: searchConfig
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
   * View all stores for specified country
   * @param countryIsoCode country ISO code
   */
  viewAllStoresForCountry(countryIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByCountry({ countryIsoCode })
    );
  }

  /**
   * View all stores for specified region
   * @param regionIsoCode region ISO code
   */
  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
    );
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
