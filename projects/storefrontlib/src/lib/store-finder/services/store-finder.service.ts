import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { LongitudeLatitude } from '../models/longitude-latitude';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  constructor(private store: Store<fromStore.StoresState>) {}

  findStores(
    queryText: string,
    longitudeLatitude?: LongitudeLatitude,
    useMyLocation?: boolean
  ) {
    if (longitudeLatitude) {
      this.store.dispatch(
        new fromStore.FindStores({
          queryText,
          useMyLocation,
          longitudeLatitude
        })
      );
    } else {
      this.store.dispatch(
        new fromStore.FindStores({ queryText, useMyLocation })
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
