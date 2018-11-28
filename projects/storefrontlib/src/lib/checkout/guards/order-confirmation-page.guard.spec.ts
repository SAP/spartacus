import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutService } from '../facade';
import { RoutingService } from '@spartacus/core';

describe(`OrderConfirmationPageGuard`, () => {
  let routingService: RoutingService;
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

    routingService = TestBed.get(RoutingService);
    guard = TestBed.get(OrderConfirmationPageGuard);

    spyOn(routingService, 'goToPage').and.stub();
  });

  describe(`when there is NO order details present`, () => {
    it(`should return false and navigate to 'my-account/orders'`, done => {
      mockCheckoutService.orderDetails$.next({});

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(routingService.goToPage).toHaveBeenCalledWith([
          'myAccount_orders'
        ]);
        done();
      });
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, done => {
      mockCheckoutService.orderDetails$.next({ code: 'test order' });

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(true);
        expect(routingService.goToPage).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
