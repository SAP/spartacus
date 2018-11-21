import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { WindowRef } from './window-ref';
import { LongitudeLatitude } from '../models/longitude-latitude';

@Injectable()
export class StoreFinderService {
  constructor(private store: Store<fromStore.StoresState>, private winRef: WindowRef) { }

  findStores(
    queryText: string,
    useMyLocation?: boolean
  ) {
    if (useMyLocation) {
      this.store.dispatch(new fromStore.OnHold());
      this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition((pos: Position) => {
        const longitudeLatitude: LongitudeLatitude = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        };
        this.store.dispatch(
          new fromStore.FindStores({ queryText, longitudeLatitude })
        );
      });
    } else {
      this.store.dispatch(
        new fromStore.FindStores({ queryText })
      );
    }
  }

  viewAllStores() {
    this.store.dispatch(new fromStore.ViewAllStores());
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    this.store.dispatch(
      new fromStore.FindAllStoresByCountry({ countryIsoCode })
    );
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.store.dispatch(
      new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
    );
  }
}
