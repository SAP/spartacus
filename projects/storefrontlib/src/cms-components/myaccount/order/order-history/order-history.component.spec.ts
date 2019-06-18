import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  I18nTestingModule,
  OrderHistoryList,
  RoutingService,
  UserOrderService,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderHistoryComponent } from './order-history.component';

const mockOrders: OrderHistoryList = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' },
    },
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ userId: 'test' } as UserToken);
  }
}
class MockUserOrderService {
  go = jasmine.createSpy('go');
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return of();
  }
  getOrderHistoryListLoaded(): Observable<boolean> {
    return of(true);
  }
  loadOrderList(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}
  clearOrderList() {}
}

class MockRoutingService {
  go() {}
}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let userService: MockUserOrderService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ListNavigationModule, I18nTestingModule],
      declarations: [OrderHistoryComponent, MockUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserOrderService, useClass: MockUserOrderService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();

    userService = TestBed.get(UserOrderService);
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
      sorts: [],
    };
    spyOn(userService, 'getOrderHistoryList').and.returnValue(
      of(initialOrderListState)
    );
    spyOn(userService, 'loadOrderList').and.stub();

    component.ngOnInit();
    fixture.detectChanges();

    let orderList: OrderHistoryList;
    component.orders$
      .subscribe(value => {
        orderList = value;
      })
      .unsubscribe();
    expect(orderList).toEqual(initialOrderListState);
  });

  it('should read order list when data exist', () => {
    spyOn(userService, 'getOrderHistoryList').and.returnValue(of(mockOrders));
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

  it('should redirect when clicking on order id', () => {
    spyOn(userService, 'getOrderHistoryList').and.returnValue(of(mockOrders));
    spyOn(routingService, 'go').and.stub();

    component.ngOnInit();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(
      By.css('.cx-order-history-table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderDetails',
        params: mockOrders.orders[1],
      });
    });
  });

  it('should display No orders found page if no orders are found', () => {
    const initialOrderListState: OrderHistoryList = {
      orders: [],
      pagination: { totalResults: 0, sort: 'byDate' },
      sorts: [{ code: 'byDate', selected: true }],
    };
    spyOn(userService, 'getOrderHistoryList').and.returnValue(
      of(initialOrderListState)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history-no-order'))
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOn(userService, 'getOrderHistoryList').and.returnValue(of(mockOrders));
    spyOn(userService, 'loadOrderList').and.stub();

    component.ngOnInit();
    fixture.detectChanges();
    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(userService.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(userService, 'getOrderHistoryList').and.returnValue(of(mockOrders));
    spyOn(userService, 'loadOrderList').and.stub();

    component.ngOnInit();
    fixture.detectChanges();
    component.pageChange(1);

    expect(userService.loadOrderList).toHaveBeenCalledWith(5, 1, 'byDate');
  });
});
