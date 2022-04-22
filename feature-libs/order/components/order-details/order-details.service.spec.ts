import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderDetailsService } from './order-details.service';

const mockOrder: Order = {
  code: '1',
  statusDisplay: 'Shipped',
  deliveryAddress: {
    firstName: 'John',
    lastName: 'Smith',
    line1: 'Buckingham Street 5',
    line2: '1A',
    phone: '(+11) 111 111 111',
    postalCode: 'MA8902',
    town: 'London',
    country: {
      isocode: 'UK',
    },
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days',
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      line1: 'Buckingham Street 5',
      line2: '1A',
      phone: '(+11) 111 111 111',
      postalCode: 'MA8902',
      town: 'London',
      country: {
        isocode: 'UK',
      },
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
      orderCode: '1',
    },
    cmsRequired: false,
  },
};

const routerSubject = new BehaviorSubject<{ state: object }>(mockRouter);

class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
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

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let orderHistoryFacade: OrderHistoryFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: OrderHistoryFacade,
          useClass: MockOrderHistoryFacade,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.inject(OrderDetailsService);
    orderHistoryFacade = TestBed.inject(OrderHistoryFacade);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'getRouterState');
    spyOn(orderHistoryFacade, 'loadOrderDetails');
    spyOn(orderHistoryFacade, 'clearOrderDetails');
    spyOn(orderHistoryFacade, 'getOrderDetails').and.returnValue(of(mockOrder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load order details', () => {
    routerSubject.next(mockRouter);

    let orderDetails: Order;
    service
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();
    expect(orderHistoryFacade.loadOrderDetails).toHaveBeenCalledWith('1');
    expect(orderHistoryFacade.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });

  it('should clean order details', () => {
    routerSubject.next(mockRouterWithoutOrderCode);

    let orderDetails: Order;
    service
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();
    expect(orderHistoryFacade.clearOrderDetails).toHaveBeenCalled();
    expect(orderHistoryFacade.getOrderDetails).toHaveBeenCalled();
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

    routerSubject.next(mockRouter);

    let orderCode: string;
    service.orderCode$.subscribe((data) => {
      orderCode = data;
    });

    expect(orderCode).toEqual(mockRouter.state.params.orderCode);

    routerSubject.next(mockRouterNewOrderCode);

    expect(orderCode).toEqual(mockRouterNewOrderCode.state.params.orderCode);
  });
});
