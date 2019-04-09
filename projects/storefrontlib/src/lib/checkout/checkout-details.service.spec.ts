import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import {
  AuthService,
  Cart,
  CartService,
  CheckoutService,
  CheckoutDetails,
  UserToken,
} from '@spartacus/core';
import { CheckoutDetailsService } from './checkout-details.service';

const userId = 'userId';
const cartId = 'cartId';
const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
};

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId } as UserToken);
  }
}

class MockCheckoutService {
  loadCheckoutDetails(): Observable<CheckoutDetails> {
    return of(mockDetails);
  }
  getDeliveryAddress(): Observable<any> {
    return of();
  }
  getSelectedDeliveryMode(): Observable<any> {
    return of();
  }
  getPaymentDetails(): Observable<any> {
    return of();
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

  it('should load checkout details', () => {
    spyOn(authService, 'getUserToken');
    spyOn(cartService, 'getActive');
    spyOn(checkoutService, 'loadCheckoutDetails');
    spyOn(checkoutService, 'getDeliveryAddress').and.returnValue(
      of(mockDetails)
    );

    let checkoutDetails;
    service
      .getDeliveryAddress()
      .subscribe(data => (checkoutDetails = data))
      .unsubscribe();
    expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(
      userId,
      cartId
    );
    expect(checkoutService.getDeliveryAddress).toHaveBeenCalled();
    expect(checkoutDetails).toBe(mockDetails);
  });
});
