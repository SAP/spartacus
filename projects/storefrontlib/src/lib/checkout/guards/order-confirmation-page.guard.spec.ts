import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutService } from '../services';
import { RoutingService } from '@spartacus/core';

class MockCheckoutService {
  orderDetails: any;
}
const mockRoutingService = { goToPage: () => {} };

describe(`OrderConfirmationPageGuard`, () => {
  let routingService: RoutingService;
  let guard: OrderConfirmationPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderConfirmationPageGuard,
        { provide: CheckoutService, useClass: MockCheckoutService },
        {
          provide: RoutingService,
          useValue: mockRoutingService
        }
      ],
      imports: [RouterTestingModule]
    });

    routingService = TestBed.get(RoutingService);
    guard = TestBed.get(OrderConfirmationPageGuard);

    spyOn(routingService, 'goToPage');
  });

  describe(`when there are NO order details present`, () => {
    it(`should return false and navigate to 'my-account/orders'`, () => {
      spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(false);

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(routingService.goToPage).toHaveBeenCalledWith(
          'myAccount_orders'
        );
      });
    });

    describe(`when there are order details present`, () => {
      it(`should return true`, () => {
        spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(true);

        guard.canActivate().subscribe(result => {
          expect(result).toEqual(true);
          expect(routingService.goToPage).not.toHaveBeenCalled();
        });
      });
    });
  });
});
