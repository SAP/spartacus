import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';

describe('ClientToken Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromReducers.getReducers())
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
});
