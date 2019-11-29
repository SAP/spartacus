import { Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { CancelOrReturnRequestInputGuard } from './cancel-or-return-request-input.guard';

class MockOrderCancelOrReturnService {
  cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[];
}

describe(`CancelOrReturnRequestInputGuard`, () => {
  let guard: CancelOrReturnRequestInputGuard;
  let mockCancelOrReturnService: MockOrderCancelOrReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrderCancelOrReturnService,
          useClass: MockOrderCancelOrReturnService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(CancelOrReturnRequestInputGuard as Type<
      CancelOrReturnRequestInputGuard
    >);
    mockCancelOrReturnService = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
  });

  describe(`when there is NO cancelOrReturnRequestInputs`, () => {
    it(`should return UrlTree to order return/cancel page`, () => {
      mockCancelOrReturnService.cancelOrReturnRequestInputs = [];
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
      mockCancelOrReturnService.cancelOrReturnRequestInputs = [
        { orderEntryNumber: 0, quantity: 1 },
      ];
      expect(
        guard.canActivate({ url: [] } as ActivatedRouteSnapshot)
      ).toBeTruthy();
    });
  });
});
