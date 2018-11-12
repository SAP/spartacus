import { Store, StoreModule } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromReducers from './../reducers';

describe('ClientToken Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
});
