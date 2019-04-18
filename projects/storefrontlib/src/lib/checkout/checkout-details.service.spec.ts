import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import {
  Address,
  AuthService,
  Cart,
  CartService,
  CheckoutDetails,
  CheckoutService,
  DeliveryMode,
  PaymentDetails,
  UserToken,
} from '@spartacus/core';
import { CheckoutDetailsService } from './checkout-details.service';

const userId = 'userId';
const cartId = 'cartId';
const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
  deliveryMode: { code: 'testMode' },
  paymentInfo: { accountHolderName: 'name' },
};

const testedFunctions = [
  'getDeliveryAddress',
  'getSelectedDeliveryModeCode',
  'getPaymentDetails',
];

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId } as UserToken);
  }
}

class MockCheckoutService {
  loadCheckoutDetails(): Observable<CheckoutDetails> {
    return of(mockDetails);
  }

  getDeliveryAddress(): Observable<Address> {
    return of();
  }

  getSelectedDeliveryModeCode(): Observable<DeliveryMode> {
    return of();
  }

  getPaymentDetails(): Observable<PaymentDetails> {
    return of();
  }

  getCheckoutDetailsLoaded(): Observable<boolean> {
    return of(true);
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of({ code: cartId });
  }
}

describe('CheckoutDetailsService', () => {
  let service: CheckoutDetailsService;
  let authService;
  let checkoutService;
  let cartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutDetailsService,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: CheckoutService,
          useClass: MockCheckoutService,
        },
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });

    service = TestBed.get(CheckoutDetailsService);
    authService = TestBed.get(AuthService);
    checkoutService = TestBed.get(CheckoutService);
    cartService = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  testedFunctions.forEach(testedFunction => {
    it(`should load details data and call ${testedFunction}`, () => {
      spyOn(authService, 'getUserToken');
      spyOn(cartService, 'getActive');
      spyOn(checkoutService, 'loadCheckoutDetails');
      spyOn(checkoutService, testedFunction).and.returnValue(of(mockDetails));

      let checkoutDetails;
      service[testedFunction]()
        .subscribe(data => (checkoutDetails = data))
        .unsubscribe();
      expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(
        userId,
        cartId
      );
      expect(checkoutService[testedFunction]).toHaveBeenCalled();
      expect(checkoutDetails).toBe(mockDetails);
    });
  });
});
