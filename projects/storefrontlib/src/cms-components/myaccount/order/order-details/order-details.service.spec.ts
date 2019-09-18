import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartDataService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  RoutingService,
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
  loadOrderDetails(_orderCode: string): void {}
  clearOrderDetails(): void {}
}

class MockRoutingService {
  getRouterState(): Observable<any> {
    return routerSubject.asObservable();
  }
}

class MockCartDataService {
  userId = 'test';
}

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let userService;
  let routingService;
  let cartDataService;

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
        {
          provide: CartDataService,
          useClass: MockCartDataService,
        },
      ],
    });

    service = TestBed.get(OrderDetailsService as Type<OrderDetailsService>);
    userService = TestBed.get(UserOrderService as Type<UserOrderService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    cartDataService = TestBed.get(CartDataService as Type<CartDataService>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load order details for login user', () => {
    spyOn(routingService, 'getRouterState');
    spyOn(userService, 'loadOrderDetails');
    spyOn(userService, 'clearOrderDetails');
    spyOn(userService, 'getOrderDetails').and.returnValue(of(mockOrder));
    routerSubject.next(mockRouter);

    let orderDetails;
    service
      .getOrderDetails()
      .subscribe(data => (orderDetails = data))
      .unsubscribe();
    expect(userService.loadOrderDetails).toHaveBeenCalledWith('1');
    expect(userService.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });

  it('should load order details for anonymous user', () => {
    cartDataService.userId = OCC_USER_ID_ANONYMOUS;
    spyOn(routingService, 'getRouterState');
    spyOn(userService, 'loadOrderDetails');

    service
      .getOrderDetails()
      .subscribe()
      .unsubscribe();
    expect(userService.loadOrderDetails).toHaveBeenCalledWith(
      '1',
      OCC_USER_ID_ANONYMOUS
    );
  });

  it('should clean order details', () => {
    spyOn(routingService, 'getRouterState');
    spyOn(userService, 'loadOrderDetails');
    spyOn(userService, 'clearOrderDetails');
    spyOn(userService, 'getOrderDetails').and.returnValue(of(mockOrder));
    routerSubject.next(mockRouterWithoutOrderCode);

    let orderDetails;
    service
      .getOrderDetails()
      .subscribe(data => (orderDetails = data))
      .unsubscribe();
    expect(userService.clearOrderDetails).toHaveBeenCalled();
    expect(userService.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });
});
