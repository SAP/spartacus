import { TestBed } from '@angular/core/testing';
import {
  Address,
  Cart,
  CartService,
  CheckoutDetails,
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

const testedFunctions = [
  'getDeliveryAddress',
  'getSelectedDeliveryModeCode',
  'getPaymentDetails',
];

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
  let checkoutService;
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
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });

    service = TestBed.get(CheckoutDetailsService);
    checkoutService = TestBed.get(CheckoutService);
    cartService = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  testedFunctions.forEach(testedFunction => {
    it(`should load details data and call ${testedFunction}`, () => {
      spyOn(cartService, 'getActive');
      spyOn(checkoutService, 'loadCheckoutDetails');
      spyOn(checkoutService, testedFunction).and.returnValue(of(mockDetails));

      let checkoutDetails;
      service[testedFunction]()
        .subscribe(data => (checkoutDetails = data))
        .unsubscribe();
      expect(checkoutService.loadCheckoutDetails).toHaveBeenCalledWith(cartId);
      expect(checkoutService[testedFunction]).toHaveBeenCalled();
      expect(checkoutDetails).toBe(mockDetails);
    });
  });
});
