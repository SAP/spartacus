import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { AddressValidation } from '@spartacus/core';

import { CHECKOUT_FEATURE, CheckoutState } from '../checkout-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';

describe('Address Verification Selectors', () => {
  let store: Store<CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAddressVerificationResults', () => {
    it('should return all address verification results', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }]
      };

      let result: string | AddressValidation;
      store
        .pipe(select(fromSelectors.getAddressVerificationResults))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.VerifyAddressSuccess(addressValidation));

      expect(result).toEqual(addressValidation);
    });
  });
});
