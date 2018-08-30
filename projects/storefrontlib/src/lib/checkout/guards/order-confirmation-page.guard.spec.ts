import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutService } from '../services';

class MockCheckoutService {
  orderDetails: any;
}

describe(`OrderConfirmationPageGuard`, () => {
  let router: Router;
  let guard: OrderConfirmationPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderConfirmationPageGuard,
        { provide: CheckoutService, useClass: MockCheckoutService }
      ],
      imports: [RouterTestingModule]
    });

    router = TestBed.get(Router);
    guard = TestBed.get(OrderConfirmationPageGuard);

    spyOn(router, 'navigate').and.callThrough();
  });

  describe(`when there are NO order details present`, () => {
    it(`should return false and navigate to 'my-account/orders'`, () => {
      spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(false);

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/my-account/orders']);
      });
    });

    describe(`when there are order details present`, () => {
      it(`should return true`, () => {
        spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(true);

        guard.canActivate().subscribe(result => {
          expect(result).toEqual(true);
          expect(router.navigate).not.toHaveBeenCalled();
        });
      });
    });
  });
});
