import { TestBed } from '@angular/core/testing';
import { PaymentDetails, UserIdService } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import createSpy = jasmine.createSpy;

const initialPaymentRequestState: DpPaymentRequest | undefined = {};
const initialPaymentDetailsState: PaymentDetails | undefined = {};
const cartId = 'cartId';

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
class MockActiveCartFacade {
  takeActiveCartId(): Observable<string> {
    return of(cartId);
  }
  isGuestCart(): Observable<boolean> {
    return of(false);
  }
}
describe('DpCheckoutPaymentService', () => {
  let service: DpCheckoutPaymentService;
  let dpAdapter: DigitalPaymentsAdapter;
  const signature = 'mockSignature';
  const sessionId = 'mockSessionId';
  const userId = 'userId';

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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
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
    expect(dpAdapter.createPaymentRequest).toHaveBeenCalledWith(userId, cartId);
  });

  it('should load checkout payment details', () => {
    service.createPaymentDetails(sessionId, signature, undefined);
    expect(dpAdapter.createPaymentDetails).toHaveBeenCalledWith(
      sessionId,
      signature,
      userId,
      cartId,
      undefined
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

  describe('if preconditions are not met', () => {
    beforeEach(() => {
      spyOn<any>(service, 'checkoutPreconditions').and.returnValue(
        throwError('Precondition failed')
      );
    });
    it('should not create payment details', (done) => {
      service.createPaymentDetails(sessionId, signature).subscribe({
        error: (error) => {
          expect(error).toEqual('Precondition failed');
          expect(dpAdapter.createPaymentRequest).not.toHaveBeenCalled();
          done();
        },
      });
    });
    // it('should not get card registration details if preconditions are not met', (done) => {
    //   service.getCardRegistrationDetails().subscribe({
    //     error: (error) => {
    //       expect(error).toEqual('Precondition failed');
    //       expect(dpAdapter.createPaymentRequest).not.toHaveBeenCalled();
    //       done();
    //     },
    //   });
    // });
  });
});
