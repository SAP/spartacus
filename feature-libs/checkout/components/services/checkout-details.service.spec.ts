import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/main/root';
import { CheckoutDetails } from '@spartacus/checkout/core';
import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import { Address, PaymentDetails } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutDetailsService } from './checkout-details.service';

const cartId = 'cartId';
const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
  deliveryMode: { code: 'testMode' },
  paymentInfo: { accountHolderName: 'name' },
};

class MockCheckoutService {
  loadCheckoutDetails(): Observable<CheckoutDetails> {
    return of(mockDetails);
  }

  getCheckoutDetailsLoaded(): Observable<boolean> {
    return of(true);
  }
}

class MockCheckoutDeliveryFacade {
  getDeliveryAddress(): Observable<Address> {
    return of();
  }

  getSelectedDeliveryModeCode(): Observable<string> {
    return of();
  }
}

class MockCheckoutPaymentService {
  getPaymentDetails(): Observable<PaymentDetails> {
    return of();
  }
}

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of({ code: cartId, guid: 'guid', user: { uid: 'test-user' } });
  }
  isGuestCart(): Observable<Boolean> {
    return of(false);
  }
  isStable() {
    return of(true);
  }
}

describe('CheckoutDetailsService', () => {
  let service: CheckoutDetailsService;
  let checkoutFacade: CheckoutFacade;
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;
  let checkoutPaymentFacade: CheckoutPaymentFacade;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDetailsService,
        {
          provide: CheckoutFacade,
          useClass: MockCheckoutService,
        },
        {
          provide: CheckoutDeliveryFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
      ],
    });

    service = TestBed.inject(CheckoutDetailsService);
    checkoutFacade = TestBed.inject(CheckoutFacade);
    checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
    checkoutPaymentFacade = TestBed.inject(CheckoutPaymentFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should load details data and call getDeliveryAddress`, () => {
    spyOn(activeCartFacade, 'getActive');
    spyOn(checkoutFacade, 'loadCheckoutDetails');
    spyOn(checkoutDeliveryFacade, 'getDeliveryAddress').and.returnValue(
      of(mockDetails.deliveryAddress)
    );

    let checkoutDetails;
    service
      .getDeliveryAddress()
      .subscribe((data) => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutFacade.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(checkoutDeliveryFacade.getDeliveryAddress).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails.deliveryAddress);
  });

  it(`should load details data and call getSelectedDeliveryModeCode`, () => {
    spyOn(activeCartFacade, 'getActive');
    spyOn(checkoutFacade, 'loadCheckoutDetails');
    spyOn(
      checkoutDeliveryFacade,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(mockDetails.deliveryMode?.code));

    let checkoutDetails;
    service
      .getSelectedDeliveryModeCode()
      .subscribe((data) => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutFacade.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(
      checkoutDeliveryFacade.getSelectedDeliveryModeCode
    ).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails.deliveryMode?.code);
  });

  it(`should load details data and call getPaymentDetails`, () => {
    spyOn(activeCartFacade, 'getActive');
    spyOn(checkoutFacade, 'loadCheckoutDetails');
    spyOn(checkoutPaymentFacade, 'getPaymentDetails').and.returnValue(
      of(mockDetails.paymentInfo)
    );

    let paymentInfo;
    service
      .getPaymentDetails()
      .subscribe((data) => (paymentInfo = data))
      .unsubscribe();
    expect(checkoutFacade.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(checkoutPaymentFacade.getPaymentDetails).toHaveBeenCalled();
    expect(paymentInfo).toBe(mockDetails.paymentInfo);
  });
});
