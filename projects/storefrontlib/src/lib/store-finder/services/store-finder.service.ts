import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LongitudeLatitude } from '../models/longitude-latitude';
import { WindowRef } from './window-ref';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  constructor(
    private store: Store<fromStore.StoresState>,
    private winRef: WindowRef
  ) {}

  findStores(queryText: string, useMyLocation?: boolean) {
    if (useMyLocation) {
      this.store.dispatch(new fromStore.OnHold());
      this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition(
        (pos: Position) => {
          const longitudeLatitude: LongitudeLatitude = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          };
          this.store.dispatch(
            new fromStore.FindStores({ queryText, longitudeLatitude })
          );
        }
      );
    } else {
      this.store.dispatch(new fromStore.FindStores({ queryText }));
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
