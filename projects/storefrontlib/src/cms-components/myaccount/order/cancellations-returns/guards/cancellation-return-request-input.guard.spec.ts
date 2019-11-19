import { Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CancellationReturnRequestEntryInput } from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { CancellationReturnRequestInputGuard } from './cancellation-return-request-input.guard';

class MockOrderDetailsService {
  cancellationReturnRequestInputs: CancellationReturnRequestEntryInput[];
}

describe(`CancellationReturnRequestInputGuard`, () => {
  let guard: CancellationReturnRequestInputGuard;
  let mockOrderDetailsService: MockOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(CancellationReturnRequestInputGuard as Type<
      CancellationReturnRequestInputGuard
    >);
    mockOrderDetailsService = TestBed.get(OrderDetailsService as Type<
      OrderDetailsService
    >);
  });

  describe(`when there is NO cancellationReturnRequestInputs`, () => {
    it(`should return UrlTree to order return/cancel page`, () => {
      mockOrderDetailsService.cancellationReturnRequestInputs = undefined;
      const urlTree = guard.canActivate({
        url: [
          { path: 'my-account' },
          { path: 'order' },
          { path: 'return' },
          { path: 'confirmation' },
        ],
      } as ActivatedRouteSnapshot);

      expect(urlTree.toString()).toEqual('/my-account/order/return');
    });
  });

  describe(`when there is cancellationReturnRequestInputs`, () => {
    it(`should return true`, () => {
      mockOrderDetailsService.cancellationReturnRequestInputs = [
        { orderEntryNumber: 0, quantity: 1 },
      ];
      expect(
        guard.canActivate({ url: [] } as ActivatedRouteSnapshot)
      ).toBeTruthy();
    });
  });
});
