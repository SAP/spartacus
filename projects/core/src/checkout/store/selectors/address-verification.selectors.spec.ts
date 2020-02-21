import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AddressValidation } from '../../../model/address.model';
import { CheckoutActions } from '../actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../checkout-state';
import * as fromReducers from '../reducers/index';
import { CheckoutSelectors } from '../selectors/index';

describe('Address Verification Selectors', () => {
  let store: Store<StateWithCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAddressVerificationResults', () => {
    it('should return all address verification results', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }],
      };

      let result: string | AddressValidation;
      store
        .pipe(select(CheckoutSelectors.getAddressVerificationResults))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new CheckoutActions.VerifyAddressSuccess(addressValidation)
      );

      expect(result).toEqual(addressValidation);
    });
  });
});
