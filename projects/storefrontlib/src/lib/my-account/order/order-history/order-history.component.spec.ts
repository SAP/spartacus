import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import {
  AuthService,
  RoutingService,
  UserToken,
  UserService
} from '@spartacus/core';

import { of, BehaviorSubject, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';

import { OrderHistoryComponent } from './order-history.component';

const mockOrders = {
  orders: [
    { code: 1, placed: 1, statusDisplay: 'test', total: { formattedValue: 1 } }
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }]
};

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}
class MockUserService {
  orderList$ = new BehaviorSubject(null);
  orderListLoaded$ = of(true);
  loadOrderList = createSpy();
}
class MockRoutingService {}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let userService: MockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PaginationAndSortingModule],
      declarations: [OrderHistoryComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order list when data not exist', () => {
    const initialOrderListState = {
      orders: [],
      pagination: {},
      sorts: []
    };
    userService.orderList$.next(initialOrderListState);

    component.ngOnInit();
    fixture.detectChanges();

    let orderList;
    component.orders$
      .subscribe(value => {
        orderList = value;
      })
      .unsubscribe();
    expect(orderList).toEqual(initialOrderListState);
    expect(userService.loadOrderList).toHaveBeenCalledWith('test', 5);
  });

  it('should read order list when data exist', () => {
    userService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();

    let order;
    component.orders$
      .subscribe(value => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrders);
  });

  xit('should redirect when clicking on order id', () => {
    userService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history__code a')).properties
        .href
    ).toEqual(`/my-account/orders/${mockOrders.orders[0].code}`);
  });

  it('should display No orders found page if no orders are found', () => {
    const initialOrderListState = {
      orders: [],
      pagination: { totalResults: 0, sort: 'byDate' },
      sorts: [{ code: 'byDate', selected: true }]
    };
    userService.orderList$.next(initialOrderListState);

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history__no-order'))
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    userService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();
    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(userService.loadOrderList).toHaveBeenCalledWith(
      'test',
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    userService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();
    component.pageChange(1);

    expect(userService.loadOrderList).toHaveBeenCalledWith(
      'test',
      5,
      1,
      'byDate'
    );
  });
});
