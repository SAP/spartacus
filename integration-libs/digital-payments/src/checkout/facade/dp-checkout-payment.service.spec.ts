import { TestBed } from '@angular/core/testing';
import {
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { DpCheckoutPaymentService } from './dp-checkout-payment.service';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import createSpy = jasmine.createSpy;

const initialPaymentRequestState: DpPaymentRequest | undefined = {};
const initialPaymentDetailsState: PaymentDetails | undefined = {};
const cartId = 'cartId';
const userId = 'userId';

class MockDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
  createPaymentRequest = createSpy('createPaymentRequest').and.returnValue(
    of({})
  );
  createPaymentDetails = createSpy('createPaymentDetails').and.returnValue(
    of({})
  );
}
class MockUserIdService2 {
  takeUserId() {
    return of(OCC_USER_ID_ANONYMOUS);
  }
}

class MockUserIdService {
  takeUserId() {
    return of(userId);
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
});
describe('DpCheckoutPaymentService With Pre-Conditions failing', () => {
  let service: DpCheckoutPaymentService;
  let dpAdapter: DigitalPaymentsAdapter;
  let userIdService: UserIdService;
  let cardFacade: ActiveCartFacade;
  const signature = 'mockSignature';
  const sessionId = 'mockSessionId';

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
          useClass: MockUserIdService2,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
      ],
    });
    service = TestBed.inject(DpCheckoutPaymentService);
    dpAdapter = TestBed.inject(DigitalPaymentsAdapter);
    cardFacade = TestBed.inject(ActiveCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });
  it('should not create payment details if preconditions are not met', (done) => {
    spyOn(userIdService, 'takeUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    spyOn(cardFacade, 'isGuestCart').and.returnValue(of(false));
    service.createPaymentDetails(sessionId, signature).subscribe({
      error: (error) => {
        expect(error.message).toEqual('Checkout conditions not met');
        expect(dpAdapter.createPaymentDetails).not.toHaveBeenCalled();
        done();
      },
    });
  });
  it('should not get card registration details if preconditions are not met', (done) => {
    spyOn(userIdService, 'takeUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    spyOn(cardFacade, 'isGuestCart').and.returnValue(of(false));
    service.getCardRegistrationDetails().subscribe({
      error: (error) => {
        expect(error.message).toEqual('Checkout conditions not met');
        expect(dpAdapter.createPaymentRequest).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
