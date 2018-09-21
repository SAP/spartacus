import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  constructor(private store: Store<fromStore.StoresState>) {}

  findStores(queryText: string, longitudeLatitude?: number[]) {
    if (longitudeLatitude) {
      this.store.dispatch(
        new fromStore.FindStores({ queryText, longitudeLatitude })
      );
    } else {
      this.store.dispatch(new fromStore.FindStores({ queryText }));
    }
  }

  viewAllStores() {
    this.store.dispatch(new fromStore.FindAllStores());
  }
}
