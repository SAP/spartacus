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
import { take } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/checkout-cost-center/checkout-cost-center.connector';
import { CheckoutCostCenterService } from './checkout-cost-center.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCostCenter: CostCenter = { code: 'costCenterCode' };
const mockCart: Cart = {
  code: mockCartId,
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(EMPTY);
  dispatch = createSpy();
}

class MockCheckoutCostCenterConnector
  implements Partial<CheckoutCostCenterConnector>
{
  setCostCenter = createSpy().and.returnValue(of(mockCart));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
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
    it(`should return the cost center`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            costCenter: mockCostCenter,
          },
        })
      );

      service
        .getCostCenterState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<CostCenter | undefined>>{
            loading: false,
            error: false,
            data: mockCostCenter,
          });
          done();
        });
    });
  });

  describe(`setCostCenter`, () => {
    it(`should call checkoutCostCenterConnector.setCostCenter`, (done) => {
      service
        .setCostCenter(mockCostCenter.code ?? '')
        .pipe(take(1))
        .subscribe((cart) => {
          expect(connector.setCostCenter).toHaveBeenCalledWith(
            mockUserId,
            mockCartId,
            mockCostCenter.code
          );
          expect(cart).toEqual(mockCart);
          done();
        });
    });

    it(`should call dispatch CheckoutCostCenterSetEvent`, (done) => {
      service
        .setCostCenter(mockCostCenter.code ?? '')
        .pipe(take(1))
        .subscribe(() => {
          expect(eventService.dispatch).toHaveBeenCalledWith(
            {
              cartId: mockCartId,
              userId: mockUserId,
              code: mockCostCenter.code ?? '',
            },
            CheckoutCostCenterSetEvent
          );
          done();
        });
    });
  });
});
