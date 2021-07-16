import { TestBed } from '@angular/core/testing';
import {
  ReplenishmentOrder,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
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

class MockUserReplenishmentOrderService {
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
  let userReplenishmentOrderService: UserReplenishmentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReplenishmentOrderDetailsService,
        {
          provide: UserReplenishmentOrderService,
          useClass: MockUserReplenishmentOrderService,
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
    userReplenishmentOrderService = TestBed.inject(
      UserReplenishmentOrderService
    );

    spyOn(
      userReplenishmentOrderService,
      'loadReplenishmentOrderDetails'
    ).and.callThrough();
    spyOn(
      userReplenishmentOrderService,
      'clearReplenishmentOrderDetails'
    ).and.callThrough();
    spyOn(
      userReplenishmentOrderService,
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
      userReplenishmentOrderService.loadReplenishmentOrderDetails
    ).toHaveBeenCalledWith('1');
    expect(
      userReplenishmentOrderService.getReplenishmentOrderDetails
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
      userReplenishmentOrderService.clearReplenishmentOrderDetails
    ).toHaveBeenCalled();
    expect(
      userReplenishmentOrderService.getReplenishmentOrderDetails
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
