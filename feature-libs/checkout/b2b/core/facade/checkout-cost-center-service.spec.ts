import { inject, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CheckoutCostCenterSetEvent } from '@spartacus/checkout/b2b/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  CostCenter,
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CheckoutCostCenterConnector } from '../connectors/checkout-cost-center/checkout-cost-center.connector';
import { CheckoutCostCenterService } from './checkout-cost-center.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCostCenter: CostCenter = { code: 'costCenterCode' };
const mockCart: Cart = {
  code: mockCartId,
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(EMPTY);
  dispatch = vi.fn();
}

class MockCheckoutCostCenterConnector
  implements Partial<CheckoutCostCenterConnector>
{
  setCostCenter = vi.fn().mockReturnValue(of(mockCart));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
    of(of({ loading: false, error: false, data: undefined }))
  );
}

describe(`CheckoutCostCenterService`, () => {
  let service: CheckoutCostCenterService;
  let connector: CheckoutCostCenterConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutCostCenterService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutCostCenterConnector,
          useClass: MockCheckoutCostCenterConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutCostCenterService);
    connector = TestBed.inject(CheckoutCostCenterConnector);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    eventService = TestBed.inject(EventService);
  });

  it(`should inject CheckoutCostCenterService`, inject(
    [CheckoutCostCenterService],
    (checkoutCostCenterService: CheckoutCostCenterService) => {
      expect(checkoutCostCenterService).toBeTruthy();
    }
  ));

  describe(`getCostCenterState`, () => {
    it(`should return the cost center`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            costCenter: mockCostCenter,
          },
        })
      );

      const result = await firstValueFrom(service.getCostCenterState());
      expect(result).toEqual(<QueryState<CostCenter | undefined>>{
        loading: false,
        error: false,
        data: mockCostCenter,
      });
    });
  });

  describe(`setCostCenter`, () => {
    it(`should call checkoutCostCenterConnector.setCostCenter`, async () => {
      const cart = await firstValueFrom(service.setCostCenter(mockCostCenter.code ?? ''));
      expect(connector.setCostCenter).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        mockCostCenter.code
      );
      expect(cart).toEqual(mockCart);
    });

    it(`should call dispatch CheckoutCostCenterSetEvent`, async () => {
      await firstValueFrom(service.setCostCenter(mockCostCenter.code ?? ''));
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {
          cartId: mockCartId,
          userId: mockUserId,
          code: mockCostCenter.code ?? '',
        },
        CheckoutCostCenterSetEvent
      );
    });
  });
});
