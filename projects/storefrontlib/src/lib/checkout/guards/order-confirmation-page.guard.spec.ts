import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { Order, RoutingService, CheckoutService } from '@spartacus/core';

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(null);
  }
}

describe(`OrderConfirmationPageGuard`, () => {
  let routingService: RoutingService;
  let guard: OrderConfirmationPageGuard;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderConfirmationPageGuard,
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() }
        },
        { provide: CheckoutService, useClass: MockCheckoutService }
      ],
      imports: [RouterTestingModule]
    });

    routingService = TestBed.get(RoutingService);
    guard = TestBed.get(OrderConfirmationPageGuard);
    mockCheckoutService = TestBed.get(CheckoutService);
  });

  describe(`when there is NO order details present`, () => {
    it(`should return false and navigate to order history page`, done => {
      spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(of({}));

      guard.canActivate().subscribe(result => {
        expect(result).toEqual(false);
        expect(routingService.go).toHaveBeenCalledWith({
          route: ['orders']
        });
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
        expect(routingService.go).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
