import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import {
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReplenishmentOrderDetailsService } from './replenishment-order-details.service';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  firstDate: '1994-01-11T00:00Z',
  trigger: {
    activationTime: '1994-02-24T00:00Z',
    displayTimeTable: 'every-test-date',
  },
  paymentType: {
    code: 'test-type',
    displayName: 'test-type-name',
  },
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
};

const mockRouterWithoutOrderCode = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    cmsRequired: false,
  },
};

const mockRouter = {
  state: {
    url: '/',
    queryParams: {},
    params: {
      replenishmentOrderCode: '1',
    },
    cmsRequired: false,
  },
};

const routerSubject = new BehaviorSubject<{ state: object }>(mockRouter);

class MockReplenishmentOrderHistoryFacade
  implements Partial<ReplenishmentOrderHistoryFacade>
{
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return of(mockReplenishmentOrder);
  }
  loadReplenishmentOrderDetails(_replenishmentOrderCode: string): void {}
  clearReplenishmentOrderDetails(): void {}
}

class MockRoutingService {
  getRouterState(): Observable<any> {
    return routerSubject.asObservable();
  }
}

describe('ReplenishmentOrderDetailsService', () => {
  let replenishmentOrderDetailsService: ReplenishmentOrderDetailsService;
  let replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReplenishmentOrderDetailsService,
        {
          provide: ReplenishmentOrderHistoryFacade,
          useClass: MockReplenishmentOrderHistoryFacade,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    replenishmentOrderDetailsService = TestBed.inject(
      ReplenishmentOrderDetailsService
    );
    replenishmentOrderHistoryFacade = TestBed.inject(
      ReplenishmentOrderHistoryFacade
    );

    spyOn(
      replenishmentOrderHistoryFacade,
      'loadReplenishmentOrderDetails'
    ).and.callThrough();
    spyOn(
      replenishmentOrderHistoryFacade,
      'clearReplenishmentOrderDetails'
    ).and.callThrough();
    spyOn(
      replenishmentOrderHistoryFacade,
      'getReplenishmentOrderDetails'
    ).and.returnValue(of(mockReplenishmentOrder));
  });

  it('should be created', () => {
    expect(replenishmentOrderDetailsService).toBeTruthy();
  });

  it('should load order details', () => {
    routerSubject.next(mockRouter);

    let orderDetails: ReplenishmentOrder;

    replenishmentOrderDetailsService
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();

    expect(
      replenishmentOrderHistoryFacade.loadReplenishmentOrderDetails
    ).toHaveBeenCalledWith('1');
    expect(
      replenishmentOrderHistoryFacade.getReplenishmentOrderDetails
    ).toHaveBeenCalled();
    expect(orderDetails).toBe(mockReplenishmentOrder);
  });

  it('should clean order details', () => {
    routerSubject.next(mockRouterWithoutOrderCode);

    let orderDetails: ReplenishmentOrder;

    replenishmentOrderDetailsService
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();

    expect(
      replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails
    ).toHaveBeenCalled();
    expect(
      replenishmentOrderHistoryFacade.getReplenishmentOrderDetails
    ).toHaveBeenCalled();
    expect(orderDetails).toBe(mockReplenishmentOrder);
  });

  it('should emit distinct replenishmentOrderCode values', () => {
    const mockRouterNewOrderCode = {
      ...mockRouter,
      state: {
        ...mockRouter.state,
        params: {
          replenishmentOrderCode: '123',
        },
      },
    };

    routerSubject.next(mockRouter);

    let replenishmentOrderCode: string;
    replenishmentOrderDetailsService['replenishmentOrderCode$'].subscribe(
      (data) => {
        replenishmentOrderCode = data;
      }
    );

    expect(replenishmentOrderCode).toEqual(
      mockRouter.state.params.replenishmentOrderCode
    );

    routerSubject.next(mockRouterNewOrderCode);

    expect(replenishmentOrderCode).toEqual(
      mockRouterNewOrderCode.state.params.replenishmentOrderCode
    );
  });
});
