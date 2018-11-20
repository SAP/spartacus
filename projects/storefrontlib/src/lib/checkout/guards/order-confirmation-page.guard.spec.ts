import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutService } from '../facade';

describe(`OrderConfirmationPageGuard`, () => {
  let router: Router;
  let guard: OrderConfirmationPageGuard;
  let mockCheckoutService: any;

  beforeEach(() => {
    mockCheckoutService = {
      orderDetails$: new BehaviorSubject(null)
    };
    TestBed.configureTestingModule({
      providers: [
        OrderConfirmationPageGuard,
        { provide: CheckoutService, useValue: mockCheckoutService }
      ],
      imports: [RouterTestingModule]
    });

    router = TestBed.get(Router);
    guard = TestBed.get(OrderConfirmationPageGuard);

    spyOn(router, 'navigate').and.stub();
  });

  describe(`when there is NO order details present`, () => {
    it(`should return false and navigate to 'my-account/orders'`, done => {
      mockCheckoutService.orderDetails$.next({});

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/my-account/orders']);
        done();
      });
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, done => {
      mockCheckoutService.orderDetails$.next({ code: 'test order' });

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
