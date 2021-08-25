import { PaymentDetails } from '@spartacus/core';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { TestBed } from '@angular/core/testing';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { UserIdService } from '@spartacus/core';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

const initialPaymentRequestState: DpPaymentRequest | undefined = {};
const initialPaymentDetailsState: PaymentDetails | undefined = {};

class MockDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
  createPaymentRequest = createSpy('createPaymentRequest').and.returnValue(
    of({})
  );
  createPaymentDetails = createSpy('createPaymentDetails').and.returnValue(
    of({})
  );
}
class MockUserIdService {
  takeUserId() {
    return of('current');
  }
}
describe('DpCheckoutPaymentService', () => {
  let service: DpCheckoutPaymentService;
  let dpAdapter: DigitalPaymentsAdapter;
  const signature = 'mockSignature';
  const sessionId = 'mockSessionId';
  const userId = 'current';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DpCheckoutPaymentService,
        {
          provide: DigitalPaymentsAdapter,
          useClass: MockDigitalPaymentsAdapter,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });
    service = TestBed.inject(DpCheckoutPaymentService);
    dpAdapter = TestBed.inject(DigitalPaymentsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load card registration details', () => {
    service.getCardRegistrationDetails().subscribe().unsubscribe();
    expect(dpAdapter.createPaymentRequest).toHaveBeenCalledWith(userId);
  });

  it('should load checkout payment details', () => {
    service.createPaymentDetails(sessionId, signature);
    expect(dpAdapter.createPaymentDetails).toHaveBeenCalledWith(
      sessionId,
      signature,
      userId
    );
  });

  it('should get card registration details', () => {
    let paymentRequest: DpPaymentRequest | undefined;
    service
      .getCardRegistrationDetails()
      .subscribe((data) => {
        paymentRequest = data;
      })
      .unsubscribe();

    expect(paymentRequest).toEqual(initialPaymentRequestState);
  });

  it('should create payment details', () => {
    let paymentDetails: PaymentDetails | undefined;
    service
      .createPaymentDetails(sessionId, signature)
      .subscribe((data: any) => {
        paymentDetails = data;
      })
      .unsubscribe();

    expect(paymentDetails).toEqual(initialPaymentDetailsState);
  });
});
