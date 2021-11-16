import { AbstractType, Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { CostCenterSetEvent } from '@spartacus/checkout/b2b/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  CostCenter,
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/cost-center/checkout-cost-center.connector';
import { CheckoutCostCenterService } from './checkout-cost-center.service';

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';
const mockCostCenter: CostCenter = { code: 'costCenterCode' };
const mockCart: Cart = {
  code: mockCartId,
};

class MockActiveCartService implements Partial<ActiveCartService> {
  takeActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
  isGuestCart(_cart?: Cart): boolean {
    return false;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(_loggedIn = false): Observable<string> {
    return of(mockUserId);
  }
}

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return of();
  }
  dispatch<T extends object>(_event: T, _eventType?: Type<T>): void {}
}

class MockCheckoutCostCenterConnector
  implements Partial<CheckoutCostCenterConnector>
{
  setCostCenter(
    _userId: string,
    _cartId: string,
    _costCenterId: string
  ): Observable<Cart> {
    return of(mockCart);
  }
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return of({ loading: false, error: false, data: undefined });
  }
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
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      spyOn(checkoutQuery, 'getCheckoutDetailsState').and.returnValue(
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
      spyOn(connector, 'setCostCenter').and.callThrough();

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

    it(`should call dispatch CostCenterSetEvent`, (done) => {
      spyOn(connector, 'setCostCenter').and.callThrough();
      spyOn(eventService, 'dispatch').and.stub();

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
            CostCenterSetEvent
          );
          done();
        });
    });
  });
});
