import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutService } from '../services';
import { Router } from '@angular/router';

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

  it(`should return false and navigate to home when there are no order details present`, () => {
    spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(false);

    guard.canActivate().subscribe(result => {
      expect(result).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  it(`should return true and not navigate to home when there are order details present`, () => {
    spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(true);

    guard.canActivate().subscribe(result => {
      expect(result).toEqual(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
