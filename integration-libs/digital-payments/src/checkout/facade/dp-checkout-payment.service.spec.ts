import { PaymentDetails } from '@spartacus/core';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';

const initialPaymentRequestState: DpPaymentRequest | undefined = undefined;
const initialPaymentDetailsState: PaymentDetails | undefined = undefined;

describe('DpCheckoutPaymentService', () => {
  let service: DpCheckoutPaymentService;
  let occEnpointsService: OccEndpointsService;
  const signature = 'mockSignature';
  const sessionId = 'mockSessionId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
    });
    service = TestBed.inject(DpCheckoutPaymentService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load card registration details', () => {
    service.getCardRegistrationDetails();
    expect(occEnpointsService.buildUrl).toHaveBeenCalled();
    expect(service.getCardRegistrationDetails).toHaveBeenCalled();
  });

 it('should load checkout payment details', () => {
    service.createPaymentDetails(sessionId, signature);
    expect(occEnpointsService.buildUrl).toHaveBeenCalled();
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
    expect(occEnpointsService.buildUrl).toHaveBeenCalled();
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
    expect(occEnpointsService.buildUrl).toHaveBeenCalled();  });
});

