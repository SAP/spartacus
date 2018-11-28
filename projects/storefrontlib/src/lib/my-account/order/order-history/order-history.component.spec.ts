import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { RoutingService } from '@spartacus/core';

import { of, BehaviorSubject } from 'rxjs';

import createSpy = jasmine.createSpy;

import { AuthService } from '../../../auth/facade/auth.service';
import { UserService } from '../../../user/facade/user.service';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';

import { OrderHistoryComponent } from './order-history.component';
import { UserOrders } from '../../models/order.model';

const mockOrders: UserOrders = {
  orders: [
    { code: 1, placed: 1, statusDisplay: 'test', total: { formattedValue: 1 } }
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sort: [{ code: 'byDate', selected: true }]
};

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;

  let mockAuthService: any;
  let mockRoutingService: any;
  let mockUserService: any;

  beforeEach(async(() => {
    mockRoutingService = {};
    mockAuthService = {
      userToken$: of({ userId: 'test' })
    };
    mockUserService = {
      orderList$: new BehaviorSubject(null),
      orderListLoaded$: of(true),
      loadOrderList: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PaginationAndSortingModule],
      declarations: [OrderHistoryComponent],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order list when data not exist', () => {
    const initialOrderListState: UserOrders = {
      orders: [],
      pagination: {},
      sort: []
    };
    mockUserService.orderList$.next(initialOrderListState);

    component.ngOnInit();
    fixture.detectChanges();

    let orderList: UserOrders;
    component.orders$.subscribe(value => {
      orderList = value;
    });
    expect(orderList).toEqual(initialOrderListState);
    expect(mockUserService.loadOrderList).toHaveBeenCalledWith('test', 5);
  });

  it('should read order list when data exist', () => {
    mockUserService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();

    let orders: UserOrders;
    component.orders$.subscribe(value => {
      orders = value;
    });
    expect(orders).toEqual(mockOrders);
  });

  xit('should redirect when clicking on order id', () => {
    mockUserService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history__code a')).properties
        .href
    ).toEqual(`/my-account/orders/${mockOrders.orders[0].code}`);
  });

  it('should display No orders found page if no orders are found', () => {
    const initialOrderListState: UserOrders = {
      orders: [],
      pagination: { totalResults: 0, sort: 'byDate' },
      sort: [{ code: 'byDate', selected: true }]
    };
    mockUserService.orderList$.next(initialOrderListState);

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history__no-order'))
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    mockUserService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();
    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(mockUserService.loadOrderList).toHaveBeenCalledWith(
      'test',
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    mockUserService.orderList$.next(mockOrders);
    component.ngOnInit();
    fixture.detectChanges();
    component.pageChange(1);

    expect(mockUserService.loadOrderList).toHaveBeenCalledWith(
      'test',
      5,
      1,
      'byDate'
    );
  });
});
