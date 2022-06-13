import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService, SemanticPathService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationGuard } from './order-confirmation.guard';
import createSpy = jasmine.createSpy;

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(of(undefined));
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue('');
}

describe(`OrderConfirmationGuard`, () => {
  let guard: OrderConfirmationGuard;
  let orderFacade: OrderFacade;
  let semanticPathService: SemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
        { provide: OrderFacade, useClass: MockOrderFacade },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(OrderConfirmationGuard);
    orderFacade = TestBed.inject(OrderFacade);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe(`when there is NO order details present`, () => {
    it(`should return UrlTree to order history page`, (done) => {
      orderFacade.getOrderDetails = createSpy().and.returnValue(of({}));
      semanticPathService.get =
        createSpy().and.returnValue('/my-account/orders');

      guard.canActivate().subscribe((result) => {
        expect(result.toString()).toEqual('/my-account/orders');
        done();
      });
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, (done) => {
      orderFacade.getOrderDetails = createSpy().and.returnValue(
        of({ code: 'test order' })
      );

      guard.canActivate().subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  });
});
