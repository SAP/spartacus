import {
  StateWithDigitalPayments,
  DIGITAL_PAYMENTS_FEATURE,
  DigitalPaymentsState,
} from '../digital-payments-state';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../reducers/index';
import { DigitalPaymentSelectors } from './index';

const initialPaymentDetailsState = undefined;
const initialPaymentRequestState = undefined;

const initialState: DigitalPaymentsState = {
  paymentDetails: {
    loading: false,
    error: false,
    success: false,
    value: initialPaymentDetailsState,
  },
  paymentRequest: {
    loading: false,
    error: false,
    success: false,
    value: initialPaymentRequestState,
  },
};

describe('Digital Payments Feature Selectors', () => {
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

  describe('getDigitalPaymentsState', () => {
    it('should get digital payments state', () => {
      let result: DigitalPaymentsState;
      store
        .pipe(select(DigitalPaymentSelectors.getDigitalPaymentsState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(initialState);
    });
  });
});
