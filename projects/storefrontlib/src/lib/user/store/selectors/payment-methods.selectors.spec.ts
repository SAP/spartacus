import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

const mockUserPaymentMethods = ['payment1', 'payment2'];

describe('User Payment Methods Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPaymentMethods', () => {
    it('should return a user payment methods', () => {
      let result;
      store
        .select(fromSelectors.getPaymentMethods)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadUserPaymentMethodsSuccess(mockUserPaymentMethods)
      );

      expect(result).toEqual(mockUserPaymentMethods);
    });
  });
});
