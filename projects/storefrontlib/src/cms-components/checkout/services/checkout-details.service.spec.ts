import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Address,
  Cart,
  CartService,
  CheckoutDeliveryService,
  CheckoutDetails,
  CheckoutPaymentService,
  CheckoutService,
  DeliveryMode,
  PaymentDetails,
} from '@spartacus/core';
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

class MockCheckoutDeliveryService {
  getDeliveryAddress(): Observable<Address> {
    return of();
  }

  getSelectedDeliveryModeCode(): Observable<DeliveryMode> {
    return of();
  }
}

class MockCheckoutPaymentService {
  getPaymentDetails(): Observable<PaymentDetails> {
    return of();
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of({ code: cartId, guid: 'guid', user: { uid: 'test-user' } });
  }
  isGuestCart(): Boolean {
    return false;
  }
}

describe('CheckoutDetailsService', () => {
  let service: CheckoutDetailsService;
  let checkoutService;
  let checkoutDeliveryService;
  let checkoutPaymentService;
  let cartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDetailsService,
        {
          provide: CheckoutService,
          useClass: MockCheckoutService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });

    service = TestBed.get(CheckoutDetailsService as Type<
      CheckoutDetailsService
    >);
    checkoutService = TestBed.get(CheckoutService as Type<CheckoutService>);
    checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    checkoutPaymentService = TestBed.get(CheckoutPaymentService as Type<
      CheckoutPaymentService
    >);
    cartService = TestBed.get(CartService as Type<CartService>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should load details data and call getDeliveryAddress`, () => {
    spyOn(cartService, 'getActive');
    spyOn(checkoutService, 'loadCheckoutDetails');
    spyOn(checkoutDeliveryService, 'getDeliveryAddress').and.returnValue(
      of(mockDetails)
    );

    let checkoutDetails;
    service
      .getDeliveryAddress()
      .subscribe(data => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(checkoutDeliveryService.getDeliveryAddress).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails);
  });

  it(`should load details data and call getSelectedDeliveryModeCode`, () => {
    spyOn(cartService, 'getActive');
    spyOn(checkoutService, 'loadCheckoutDetails');
    spyOn(
      checkoutDeliveryService,
      'getSelectedDeliveryModeCode'
    ).and.returnValue(of(mockDetails));

    let checkoutDetails;
    service
      .getSelectedDeliveryModeCode()
      .subscribe(data => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(
      checkoutDeliveryService.getSelectedDeliveryModeCode
    ).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails);
  });

  it(`should load details data and call getPaymentDetails`, () => {
    spyOn(cartService, 'getActive');
    spyOn(checkoutService, 'loadCheckoutDetails');
    spyOn(checkoutPaymentService, 'getPaymentDetails').and.returnValue(
      of(mockDetails)
    );

    let checkoutDetails;
    service
      .getPaymentDetails()
      .subscribe(data => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
    expect(checkoutPaymentService.getPaymentDetails).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails);
  });
});
