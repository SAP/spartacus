import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OrderHistoryList,
  RoutingService,
  UserOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions;
  @Input() sortLabels;
  @Input() selectedOption;
  @Input() placeholder;
  @Output() sortListEvent = new EventEmitter<string>();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserOrderService {
  orderHistroy = new BehaviorSubject(mockOrders);

  getOrderHistoryList(): Observable<OrderHistoryList> {
    return this.orderHistroy;
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
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        OrderHistoryComponent,
        MockUrlPipe,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserOrderService, useClass: MockUserOrderService },
      ],
    }).compileComponents();

    userService = TestBed.get(UserOrderService as Type<UserOrderService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read order list', () => {
    let orders: OrderHistoryList;
    component.orders$
      .subscribe(value => {
        orders = value;
      })
      .unsubscribe();
    expect(orders).toEqual(mockOrders);
  });

  it('should redirect when clicking on order id', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(
      By.css('.cx-order-history-table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: mockOrders.orders[1],
    });
  });

  it('should display No orders found page if no orders are found', () => {
    const emptyOrderList: OrderHistoryList = {
      orders: [],
      pagination: { totalResults: 0, sort: 'byDate' },
      sorts: [{ code: 'byDate', selected: true }],
    };

    userService.orderHistroy.next(emptyOrderList);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-history-no-order'))
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOn(userService, 'loadOrderList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(userService.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(userService, 'loadOrderList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(userService.loadOrderList).toHaveBeenCalledWith(5, 1, 'byDate');
  });

  it('should clear order history data when component destroy', () => {
    spyOn(userService, 'clearOrderList').and.stub();

    component.ngOnDestroy();
    expect(userService.clearOrderList).toHaveBeenCalledWith();
  });
});
