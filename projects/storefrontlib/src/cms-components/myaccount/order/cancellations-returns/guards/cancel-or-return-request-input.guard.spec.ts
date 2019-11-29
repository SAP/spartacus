import { Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { CancelOrReturnRequestInputGuard } from './cancel-or-return-request-input.guard';

class MockOrderDetailsService {
  cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[];
}

describe(`CancelOrReturnRequestInputGuard`, () => {
  let guard: CancelOrReturnRequestInputGuard;
  let mockOrderDetailsService: MockOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(CancelOrReturnRequestInputGuard as Type<
      CancelOrReturnRequestInputGuard
    >);
    mockOrderDetailsService = TestBed.get(OrderDetailsService as Type<
      OrderDetailsService
    >);
  });

  describe(`when there is NO cancelOrReturnRequestInputs`, () => {
    it(`should return UrlTree to order return/cancel page`, () => {
      mockOrderDetailsService.cancelOrReturnRequestInputs = undefined;
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

  describe(`when there is cancelOrReturnRequestInputs`, () => {
    it(`should return true`, () => {
      mockOrderDetailsService.cancelOrReturnRequestInputs = [
        { orderEntryNumber: 0, quantity: 1 },
      ];
      expect(
        guard.canActivate({ url: [] } as ActivatedRouteSnapshot)
      ).toBeTruthy();
    });
  });
});
