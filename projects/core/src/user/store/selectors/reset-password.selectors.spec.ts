import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { StateWithUser, USER_FEATURE } from '../user-state';

describe('Reset Password Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getResetPassword', () => {
    it('should return the resetPassword state from the store', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getResetPassword))
        .subscribe(value => (result = value));
      expect(result).toBeFalsy();
    });
  });
});
