import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SemanticPathService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { of } from 'rxjs';
import { CancelServiceOrderGuard } from './cancel-service-order.guard';

import createSpy = jasmine.createSpy;
class MockOrderDetailsService {
  getOrderDetails = createSpy().and.returnValue(of(undefined));
}
class MockSemanticPathService implements Partial<SemanticPathService> {
  get = createSpy().and.returnValue('');
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
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CancelServiceOrderGuard);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  describe('when there is NO order details present', () => {
    it('should return UrlTree to order history page', (done) => {
      orderDetailsService.getOrderDetails = createSpy().and.returnValue(of({}));
      semanticPathService.get =
        createSpy().and.returnValue('/my-account/orders');
      guard.canActivate().subscribe((result: any) => {
        expect(result.toString()).toEqual('/my-account/orders');
        done();
      });
    });
  });
  describe('when there are order details present', () => {
    it('should return true', (done) => {
      (orderDetailsService.getOrderDetails as jasmine.Spy).and.returnValue(
        of({ serviceCancellable: true })
      );

      guard.canActivate().subscribe((result) => {
        expect(result).toEqual(true);
        done();
      });
    });
  });
});
