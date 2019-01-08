import { Injectable } from '@angular/core';
import { Store, Action, select } from '@ngrx/store';
import { StoresState } from '../store/store-finder-state';

import * as fromStore from '../store/index';
import { LongitudeLatitude, StoreFinderSearchConfig } from '../model';
import { WindowRef } from '../services';
import { Observable } from 'rxjs';

@Injectable()
export class StoreFinderService {
  private geolocationWatchId: number = null;

  constructor(private store: Store<StoresState>, private winRef: WindowRef) {}

  getStoresLoading(): Observable<any> {
    return this.store.pipe(select(fromStore.getStoresLoading));
  }

  getFindStoresEntities(): Observable<any> {
    return this.store.pipe(select(fromStore.getFindStoresEntities));
  }

  getViewAllStoresLoading(): Observable<any> {
    return this.store.pipe(select(fromStore.getViewAllStoresLoading));
  }

  getViewAllStoresEntities(): Observable<any> {
    return this.store.pipe(select(fromStore.getViewAllStoresEntities));
  }

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

  findStores(queryText: string, useMyLocation?: boolean) {
    if (useMyLocation) {
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

  viewAllStores() {
    this.clearWatchGeolocation(new fromStore.ViewAllStores());
  }

  viewStoreById(storeId: string) {
    this.clearWatchGeolocation(new fromStore.FindStoreById({ storeId }));
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByCountry({ countryIsoCode })
    );
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.clearWatchGeolocation(
      new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
    );
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
