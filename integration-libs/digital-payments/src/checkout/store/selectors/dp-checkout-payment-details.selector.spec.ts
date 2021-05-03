import {
  StateWithDigitalPayments,
  DIGITAL_PAYMENTS_FEATURE,
} from '../digital-payments-state';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import * as fromReducers from '../reducers/index';
import { DigitalPaymentSelectors } from './index';
import { PaymentDetails } from '@spartacus/core';

const initialPaymentDetails = undefined;

const initialPaymentDetailsWithLoader = {
  loading: false,
  error: false,
  success: false,
  value: initialPaymentDetails,
};

describe('Digital Payments Checkout Payment Details Selectors', () => {
  let store: Store<StateWithDigitalPayments>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          DIGITAL_PAYMENTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getDpCheckoutPaymentDetailsState', () => {
    it('should get checkout payment details', () => {
      let result: StateUtils.LoaderState<PaymentDetails>;
      store
        .pipe(select(DigitalPaymentSelectors.getDpCheckoutPaymentDetailsState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(initialPaymentDetailsWithLoader);
    });
  });

  describe('getDpCheckoutPaymentDetails', () => {
    it('should get checkout payment details', () => {
      let result: PaymentDetails;
      store
        .pipe(select(DigitalPaymentSelectors.getDpCheckoutPaymentDetails))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(initialPaymentDetails);
    });
  });
});
