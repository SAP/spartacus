import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { LongitudeLatitude } from '../models/longitude-latitude';
import { WindowRef } from './window-ref';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  private geolocationWatchId: number;

  constructor(
    private store: Store<fromStore.StoresState>,
    private winRef: WindowRef
  ) {}

  findStores(queryText: string, useMyLocation?: boolean) {
    if (useMyLocation) {
      this.clearWatchGeolocationAndDispatchAction(new fromStore.OnHold());
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          const longitudeLatitude: LongitudeLatitude = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          };
          this.clearWatchGeolocationAndDispatchAction(
            new fromStore.FindStores({ queryText, longitudeLatitude })
          );
        }
      );
    } else {
      this.clearWatchGeolocationAndDispatchAction(
        new fromStore.FindStores({ queryText })
      );
    }
  }

  viewAllStores() {
    this.clearWatchGeolocationAndDispatchAction(new fromStore.ViewAllStores());
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    this.clearWatchGeolocationAndDispatchAction(
      new fromStore.FindAllStoresByCountry({ countryIsoCode })
    );
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.clearWatchGeolocationAndDispatchAction(
      new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
    );
  }

  clearWatchGeolocationAndDispatchAction(action: Action) {
    if (this.geolocationWatchId != null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(action);
  }
}
