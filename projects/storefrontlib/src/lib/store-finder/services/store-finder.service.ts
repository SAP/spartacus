import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable()
export class FindStoresService {
  constructor(private store: Store<fromStore.StoresState>) {}
  
  findStores(address: string) {
    console.log('in Local FindStoresService');
    this.store.dispatch(new fromStore.FindStores(address));
  }
}
