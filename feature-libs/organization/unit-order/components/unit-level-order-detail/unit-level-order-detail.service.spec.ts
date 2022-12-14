import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UnitOrderFacade } from '../../root/facade';
import { UnitLevelOrderDetailService } from './unit-level-order-detail.service';

const mockOrder: Order = {
  code: '1',
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
      orderCode: '1',
    },
    cmsRequired: false,
  },
};

const routerSubject = new BehaviorSubject<{ state: object }>(mockRouter);

class MockUnitOrderFacade implements Partial<UnitOrderFacade> {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
  loadOrderDetails(_orderCode: string): void {}
  clearOrderDetails(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState(): Observable<any> {
    return routerSubject.asObservable();
  }
}

describe('UnitLevelOrderDetailService', () => {
  let service: UnitLevelOrderDetailService;
  let unitOrderFacade: UnitOrderFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitLevelOrderDetailService,
        {
          provide: UnitOrderFacade,
          useClass: MockUnitOrderFacade,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.inject(UnitLevelOrderDetailService);
    unitOrderFacade = TestBed.inject(UnitOrderFacade);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'getRouterState');
    spyOn(unitOrderFacade, 'loadOrderDetails');
    spyOn(unitOrderFacade, 'clearOrderDetails');
    spyOn(unitOrderFacade, 'getOrderDetails').and.returnValue(of(mockOrder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load order details', () => {
    routerSubject.next(mockRouter);

    let orderDetails: Order | undefined;
    service
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();
    expect(unitOrderFacade.loadOrderDetails).toHaveBeenCalledWith('1');
    expect(unitOrderFacade.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });

  it('should clean order details', () => {
    routerSubject.next(mockRouterWithoutOrderCode);

    let orderDetails: Order | undefined;
    service
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();
    expect(unitOrderFacade.clearOrderDetails).toHaveBeenCalled();
    expect(unitOrderFacade.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });

  it('should emit distinct orderCode values', () => {
    const mockRouterNewOrderCode = {
      ...mockRouter,
      state: {
        ...mockRouter.state,
        params: {
          orderCode: '123',
        },
      },
    };

    let orderCode: string | undefined;
    service.orderCode$.subscribe((data) => {
      orderCode = data;
    });

    routerSubject.next(mockRouter);
    expect(orderCode).toEqual(mockRouter.state.params.orderCode);

    routerSubject.next(mockRouterNewOrderCode);
    expect(orderCode).toEqual(mockRouterNewOrderCode.state.params.orderCode);
  });
});
