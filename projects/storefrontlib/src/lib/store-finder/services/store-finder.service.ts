import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable()
export class StoreFinderService {
  constructor(private store: Store<fromStore.StoresState>) {}

  findStores(queryText: string, longitudeLatitude?: number[]) {
    this.store.dispatch(
      new fromStore.FindStores({ queryText, longitudeLatitude })
    );
  }

  viewAllStores() {
    this.store.dispatch(new fromStore.FindAllStores());
  }
}
