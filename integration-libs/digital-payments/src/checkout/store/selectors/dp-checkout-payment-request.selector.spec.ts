import { DpPaymentRequest } from '../../models/dp-checkout.model';
import {
  StateWithDigitalPayments,
  DIGITAL_PAYMENTS_FEATURE,
} from '../digital-payments-state';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import * as fromReducers from '../reducers/index';
import { DigitalPaymentSelectors } from './index';

const initialPaymentRequest = undefined;

const initialPaymentRequestWithLoader = {
  loading: false,
  error: false,
  success: false,
  value: initialPaymentRequest,
};

describe('Digital Payments Checkout Payment Request Selectors', () => {
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

  describe('getDpCheckoutPaymentRequestState', () => {
    it('should get checkout payment request', () => {
      let result: StateUtils.LoaderState<DpPaymentRequest>;
      store
        .pipe(select(DigitalPaymentSelectors.getDpCheckoutPaymentRequestState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(initialPaymentRequestWithLoader);
    });
  });

  describe('getDpCheckoutPaymentRequest', () => {
    it('should get checkout payment request', () => {
      let result: DpPaymentRequest;
      store
        .pipe(select(DigitalPaymentSelectors.getDpCheckoutPaymentRequest))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(initialPaymentRequest);
    });
  });
});
