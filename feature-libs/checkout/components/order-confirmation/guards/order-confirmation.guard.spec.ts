import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order, RoutingService, SemanticPathService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrderConfirmationGuard } from './order-confirmation.guard';

class MockCheckoutService {
  getOrderDetails(): Observable<Order> {
    return of(null);
  }
}

class MockSemanticPageService {
  get(route: string): string {
    if (route === 'orders') {
      return '/my-account/orders';
    }
    return undefined;
  }
}

describe(`OrderConfirmationGuard`, () => {
  let guard: OrderConfirmationGuard;
  let mockCheckoutService: MockCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
        { provide: CheckoutFacade, useClass: MockCheckoutService },
        { provide: SemanticPathService, useClass: MockSemanticPageService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(OrderConfirmationGuard);
    mockCheckoutService = TestBed.inject(CheckoutFacade);
  });

  describe(`when there is NO order details present`, () => {
    it(`should return UrlTree to order history page`, (done) => {
      spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(of({}));

      guard.canActivate().subscribe((result) => {
        expect(result.toString()).toEqual('/my-account/orders');
        done();
      });
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, (done) => {
      spyOn(mockCheckoutService, 'getOrderDetails').and.returnValue(
        of({ code: 'test order' })
      );

      guard.canActivate().subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  });
});
