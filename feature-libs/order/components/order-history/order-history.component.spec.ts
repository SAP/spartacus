import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OrderHistoryList,
  ReplenishmentOrder,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { OrderFacade, ReplenishmentOrderFacade } from '@spartacus/order/root';
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
  pagination: { totalResults: 1, totalPages: 2, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const mockEmptyOrderList: OrderHistoryList = {
  orders: [],
  pagination: { totalResults: 0, totalPages: 1 },
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockOrderHistoryList$ = new BehaviorSubject<OrderHistoryList>(mockOrders);
const mockReplenishmentOrder$ = new BehaviorSubject<ReplenishmentOrder>(
  mockReplenishmentOrder
);

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
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return mockOrderHistoryList$.asObservable();
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

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

class MockUserReplenishmentOrderService {
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return mockReplenishmentOrder$.asObservable();
  }
}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let userService: OrderFacade | MockUserOrderService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
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
          { provide: OrderFacade, useClass: MockUserOrderService },
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: ReplenishmentOrderFacade,
            useClass: MockUserReplenishmentOrderService,
          },
        ],
      }).compileComponents();

      userService = TestBed.inject(OrderFacade);
      routingService = TestBed.inject(RoutingService);
    })
  );

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
      .subscribe((value) => {
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

  it('should display pagination', () => {
    mockOrderHistoryList$.next(mockOrders);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(2);
  });

  it('should NOT display pagination', () => {
    mockOrderHistoryList$.next(mockEmptyOrderList);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(0);
  });

  it('should clear order history data when component destroy', () => {
    spyOn(userService, 'clearOrderList').and.stub();

    component.ngOnDestroy();
    expect(userService.clearOrderList).toHaveBeenCalledWith();
  });

  describe('when replenishment does NOT exist', () => {
    beforeEach(() => {
      mockReplenishmentOrder$.next({});
    });

    it('should display history title', () => {
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.cx-order-history-header')
      );

      expect(element.nativeElement.textContent).toContain(
        'orderHistory.orderHistory'
      );

      expect(element.nativeElement.textContent).not.toContain(
        'orderHistory.replenishmentHistory'
      );
    });

    it('should display no orders found page if no orders are found', () => {
      mockOrderHistoryList$.next(mockEmptyOrderList);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.cx-order-history-no-order'))
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(
          By.css('.cx-replenishment-details-order-history-no-order')
        )
      ).toBeNull();
    });
  });

  describe('when replenishment does exist', () => {
    beforeEach(() => {
      mockReplenishmentOrder$.next(mockReplenishmentOrder);
    });

    it('should display replenishment details history title', () => {
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('.cx-replenishment-details-order-history-header')
      );

      expect(element.nativeElement.textContent).toContain(
        'orderHistory.replenishmentHistory'
      );

      expect(element.nativeElement.textContent).not.toContain(
        'orderHistory.orderHistory'
      );
    });

    it('should display no orders found page if no orders are found', () => {
      mockOrderHistoryList$.next(mockEmptyOrderList);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.cx-order-history-no-order'))
      ).toBeNull();
      expect(
        fixture.debugElement.query(
          By.css('.cx-replenishment-details-order-history-no-order')
        )
      ).not.toBeNull();
    });
  });
});
