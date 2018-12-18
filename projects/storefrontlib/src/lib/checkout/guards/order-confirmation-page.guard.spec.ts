import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { Order, CheckoutService } from '@spartacus/core';

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(null);
  }
}

describe(`OrderConfirmationPageGuard`, () => {
  let router: Router;
  let guard: OrderConfirmationPageGuard;
  let mockCheckoutService: MockCheckoutService;

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
    mockCheckoutService = TestBed.get(CheckoutService);

    spyOn(router, 'navigate').and.stub();
  });

  describe(`when there is NO order details present`, () => {
    it(`should return false and navigate to 'my-account/orders'`, done => {
      spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(of({}));

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/my-account/orders']);
        done();
      });
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, done => {
      spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(
        of({ code: 'test order' })
      );

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
