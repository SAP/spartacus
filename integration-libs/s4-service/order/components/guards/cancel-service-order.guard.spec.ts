import { TestBed } from '@angular/core/testing';
import { SemanticPathService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { firstValueFrom, of } from 'rxjs';
import { CancelServiceOrderGuard } from './cancel-service-order.guard';

class MockOrderDetailsService {
  getOrderDetails = vi.fn().mockReturnValue(of(undefined));
}
class MockSemanticPathService implements Partial<SemanticPathService> {
  get = vi.fn().mockReturnValue('');
}

describe('CancelServiceOrderGuard', () => {
  let guard: CancelServiceOrderGuard;
  let orderDetailsService: OrderDetailsService;
  let semanticPathService: SemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CancelServiceOrderGuard,
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });

    guard = TestBed.inject(CancelServiceOrderGuard);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe('when there is NO order details present', () => {
    it('should return UrlTree to order history page', async () => {
      orderDetailsService.getOrderDetails = vi.fn().mockReturnValue(of({}));
      semanticPathService.get =
        vi.fn().mockReturnValue('/my-account/orders');
      const result: any = await firstValueFrom(guard.canActivate());
      expect(result.toString()).toEqual('/my-account/orders');
    });
  });
  describe('when there are order details present', () => {
    it('should return true', async () => {
      (orderDetailsService.getOrderDetails as any).mockReturnValue(
        of({ serviceCancellable: true })
      );

      const result = await firstValueFrom(guard.canActivate());
      expect(result).toEqual(true);
    });
  });
});
