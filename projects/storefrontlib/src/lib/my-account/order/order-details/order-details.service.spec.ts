import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import {
  AuthService,
  Order,
  RoutingService,
  UserService,
  UserToken
} from '@spartacus/core';
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
      isocode: 'UK'
    }
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days'
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa'
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
        isocode: 'UK'
      }
    }
  }
};

const mockRouterWithoutOrderCode = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    cmsRequired: false
  }
};

const mockRouter = {
  state: {
    url: '/',
    queryParams: {},
    params: {
      orderCode: '1'
    },
    cmsRequired: false
  }
};

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}

class MockUserService {
  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
  loadOrderDetails(_userId: string, _orderCode: string): void {}
  clearOrderDetails(): void {}
}

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(mockRouter);
  }
}

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let authService;
  let userService;
  let routingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: UserService,
          useClass: MockUserService
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService
        }
      ]
    });

    service = TestBed.get(OrderDetailsService);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load order details', () => {
    spyOn(authService, 'getUserToken');
    spyOn(routingService, 'getRouterState').and.returnValue(of(mockRouter));
    spyOn(userService, 'loadOrderDetails');
    spyOn(userService, 'clearOrderDetails');
    spyOn(userService, 'getOrderDetails');
    service = TestBed.get(OrderDetailsService);

    let orderDetails;
    service
      .getOrderDetails()
      .subscribe(data => (orderDetails = data))
      .unsubscribe();
    expect(userService.loadOrderDetails).toHaveBeenCalledWith('test', '1');
    expect(userService.getOrderDetails).toHaveBeenCalled();
    expect(orderDetails).toBe(mockOrder);
  });

  it('should clean order details', () => {
    spyOn(authService, 'getUserToken');
    spyOn(routingService, 'getRouterState').and.returnValue(
      of(mockRouterWithoutOrderCode)
    );
    spyOn(userService, 'loadOrderDetails');
    spyOn(userService, 'clearOrderDetails');
    spyOn(userService, 'getOrderDetails');
    service = TestBed.get(OrderDetailsService);

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
