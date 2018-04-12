import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

describe('Address Verification Selectors', () => {
  let store: Store<fromReducers.CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          checkout: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAddressVerificationResults', () => {
    it('should return all address verification results', () => {
      const addresses = ['address1', 'address2'];

      let result;
      store
        .select(fromSelectors.getAddressVerificationResults)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.VerifyAddressSuccess(addresses));

      expect(result).toEqual(addresses);
    });
  });
});
