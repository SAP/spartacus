import { PaymentDetails } from '@spartacus/core';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import {
  DIGITAL_PAYMENTS_FEATURE,
  StateWithDigitalPayments,
} from './../store/digital-payments-state';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as fromReducers from '../store/reducers/index';

import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { DigitalPaymentActions } from '../store';

const initialPaymentRequestState: DpPaymentRequest = undefined;
const initialPaymentDetailsState: PaymentDetails = undefined;

describe('DpCheckoutPaymentService', () => {
  let store: Store<StateWithDigitalPayments>;
  let service: DpCheckoutPaymentService;

  const signature = 'mockSignature';
  const sessionId = 'mockSessionId';

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

    service = TestBed.inject(DpCheckoutPaymentService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load card registration details', () => {
    service.loadCardRegistrationDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new DigitalPaymentActions.LoadCheckoutPaymentRequest()
    );
  });

  it('should load checkout payment details', () => {
    service.loadCheckoutPaymentDetails(sessionId, signature);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DigitalPaymentActions.LoadCheckoutPaymentDetails({
        sessionId,
        signature,
      })
    );
  });

  it('should clear card registartion state', () => {
    service.clearCardRegitrationState();

    expect(store.dispatch).toHaveBeenCalledWith(
      new DigitalPaymentActions.ResetCheckoutPaymentRequest()
    );
  });

  it('should get card registration details', () => {
    let paymentRequest: DpPaymentRequest;
    service
      .getCardRegistrationDetails()
      .subscribe((data) => {
        paymentRequest = data;
      })
      .unsubscribe();

    expect(paymentRequest).toEqual(initialPaymentRequestState);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DigitalPaymentActions.LoadCheckoutPaymentRequest()
    );
  });

  it('should create payment details', () => {
    let paymentDetails: PaymentDetails;
    service
      .createPaymentDetails(sessionId, signature)
      .subscribe((data) => {
        paymentDetails = data;
      })
      .unsubscribe();

    expect(paymentDetails).toEqual(initialPaymentDetailsState);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DigitalPaymentActions.LoadCheckoutPaymentDetails({
        sessionId: sessionId,
        signature: signature,
      })
    );
  });
});
