import { TestBed } from '@angular/core/testing';
import { RoutingService, SemanticPathService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { firstValueFrom, of } from 'rxjs';
import { OrderConfirmationGuard } from './order-confirmation.guard';

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = vi.fn().mockReturnValue(of(undefined));
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = vi.fn().mockReturnValue('');
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
          useValue: { go: vi.fn() },
        },
        { provide: OrderFacade, useClass: MockOrderFacade },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });

    guard = TestBed.inject(OrderConfirmationGuard);
    orderFacade = TestBed.inject(OrderFacade);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe(`when there is NO order details present`, () => {
    it(`should return UrlTree to order history page`, async () => {
      orderFacade.getOrderDetails = vi.fn().mockReturnValue(of({}));
      semanticPathService.get = vi.fn().mockReturnValue('/my-account/orders');

      const result = await firstValueFrom(guard.canActivate());
      expect(result.toString()).toEqual('/my-account/orders');
    });
  });

  describe(`when there is order details present`, () => {
    it(`should return true`, async () => {
      orderFacade.getOrderDetails = vi
        .fn()
        .mockReturnValue(of({ code: 'test order' }));

      const result = await firstValueFrom(guard.canActivate());
      expect(result).toEqual(true);
    });
  });
});
