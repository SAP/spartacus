import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {
  RoutingService,
  OrderHistoryList,
  AuthService,
  UserToken
} from '@spartacus/core';

import { of, BehaviorSubject, Observable } from 'rxjs';

import createSpy = jasmine.createSpy;

import { UserService } from '../../../user/facade/user.service';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';

import { OrderHistoryComponent } from './order-history.component';

const mockOrders: OrderHistoryList = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' }
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' }
    }
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }]
};

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}
class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}
class MockUserService {
  orderList$ = new BehaviorSubject(null);
  orderListLoaded$ = of(true);
  loadOrderList = createSpy('loadOrderList');
  translateAndGo = createSpy('translateAndGo');
}
class MockRoutingService {}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let userService: MockUserService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PaginationAndSortingModule],
      declarations: [OrderHistoryComponent, MockTranslateUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order list when data not exist', () => {
    const initialOrderListState: OrderHistoryList = {
      orders: [],
      pagination: {},
      sorts: []
    };
    userService.orderList$.next(initialOrderListState);

    component.ngOnInit();
    fixture.detectChanges();

    let orderList: OrderHistoryList;
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

    let orders: OrderHistoryList;
    component.orders$
      .subscribe(value => {
        orders = value;
      })
      .unsubscribe();
    expect(orders).toEqual(mockOrders);
  });

  xit('should redirect when clicking on order id', () => {
    userService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(
      By.css('.cx-order-history__table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(routingService.translateAndGo).toHaveBeenCalledWith({
        route: [
          {
            name: 'orderDetails',
            params: mockOrders.orders[1]
          }
        ]
      });
    });
  });

  it('should display No orders found page if no orders are found', () => {
    const initialOrderListState: OrderHistoryList = {
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
