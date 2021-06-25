import { TestBed } from '@angular/core/testing';
import {
  Order,
  RoutingService,
  StateUtils,
  UserOrderService,
} from '@spartacus/core';
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

const mockOrderLoaderState: StateUtils.LoaderState<Order> = {
  loading: false,
  error: false,
  success: true,
  value: mockOrder,
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

class MockUserOrderService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
  getOrderDetailsState(): Observable<StateUtils.LoaderState<Order>> {
    return of(mockOrderLoaderState);
  }
  loadOrderDetails(_orderCode: string): void {}
  clearOrderDetails(): void {}
}

class MockRoutingService {
  getRouterState(): Observable<any> {
    return routerSubject.asObservable();
  }
}

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let userService: UserOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: UserOrderService,
          useClass: MockUserOrderService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.inject(OrderDetailsService);
    userService = TestBed.inject(UserOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should load', () => {
    beforeEach(() => {
      spyOn(userService, 'loadOrderDetails');
      spyOn(userService, 'getOrderDetails').and.returnValue(of(mockOrder));
    });

    it('order details', () => {
      routerSubject.next(mockRouter);

      let orderDetails: Order;
      service
        .getOrderDetails()
        .subscribe((data) => (orderDetails = data))
        .unsubscribe();
      expect(userService.loadOrderDetails).toHaveBeenCalledWith('1');
      expect(userService.getOrderDetails).toHaveBeenCalled();
      expect(orderDetails).toBe(mockOrder);
    });

    it('order details state', () => {
      routerSubject.next(mockRouter);

      let orderDetailsState: StateUtils.LoaderState<Order>;
      service
        .getOrderDetailsState()
        .subscribe((data) => (orderDetailsState = data))
        .unsubscribe();

      expect(userService.loadOrderDetails).toHaveBeenCalledWith('1');
      expect(userService.getOrderDetailsState).toHaveBeenCalled();
      expect(orderDetailsState).toBe(mockOrderLoaderState);
    });
  });

  it('should clean order details', () => {
    spyOn(userService, 'clearOrderDetails');
    routerSubject.next(mockRouterWithoutOrderCode);

    let orderDetails: Order;
    service
      .getOrderDetails()
      .subscribe((data) => (orderDetails = data))
      .unsubscribe();
    expect(userService.clearOrderDetails).toHaveBeenCalled();
    expect(userService.getOrderDetails).toHaveBeenCalled();
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
