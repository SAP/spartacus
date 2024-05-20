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
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  OrderHistoryFacade,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
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

const mockPOOrders: OrderHistoryList = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
      purchaseOrderNumber: '001',
      costCenter: {
        code: 'Custom_Retail',
        name: 'Custom Retail',
      },
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' },
      purchaseOrderNumber: '002',
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

class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return mockOrderHistoryList$.asObservable();
  }
  getOrderHistoryListLoaded(): Observable<boolean> {
    return of(true);
  }
  loadOrderList(
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
    return EMPTY;
  }
}

class MockReplenishmentOrderHistoryFacade
  implements Partial<ReplenishmentOrderHistoryFacade>
{
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return mockReplenishmentOrder$.asObservable();
  }
}

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let orderHistoryFacade: OrderHistoryFacade;
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
          { provide: OrderHistoryFacade, useClass: MockOrderHistoryFacade },
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: ReplenishmentOrderHistoryFacade,
            useClass: MockReplenishmentOrderHistoryFacade,
          },
        ],
      }).compileComponents();

      orderHistoryFacade = TestBed.inject(OrderHistoryFacade);
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

  it('should have a row tag in the table header', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-order-history-table thead tr'))
    ).toBeTruthy();
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
    spyOn(orderHistoryFacade, 'loadOrderList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(orderHistoryFacade.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(orderHistoryFacade, 'loadOrderList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(orderHistoryFacade.loadOrderList).toHaveBeenCalledWith(
      5,
      1,
      'byDate'
    );
  });

  it('should display pagination', () => {
    mockOrderHistoryList$.next(mockOrders);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(2);
    expect(component.sortType).toEqual('byDate');
  });

  it('should display PO Number & Cost Center', () => {
    mockOrderHistoryList$.next(mockOrders);
    fixture.detectChanges();

    const header = fixture.debugElement.query(
      By.css('.cx-order-history-thead-mobile > tr[role="row"')
    );
    expect(header.children.length).toEqual(4);

    mockOrderHistoryList$.next(mockPOOrders);
    fixture.detectChanges();

    const headerPO = fixture.debugElement.query(
      By.css('.cx-order-history-thead-mobile > tr[role="row"]')
    );
    expect(headerPO.children.length).toEqual(6);
    expect(headerPO.children[1].nativeElement.textContent.trim()).toEqual(
      'orderHistory.PONumber'
    );
    expect(headerPO.children[2].nativeElement.textContent.trim()).toEqual(
      'orderHistory.costCenter'
    );
  });

  it('should not have sortType if no orders and pagination are provided', () => {
    let orders: OrderHistoryList | undefined;

    mockOrderHistoryList$.next(undefined);

    component.orders$
      .subscribe((value) => {
        orders = value;
      })
      .unsubscribe();

    expect(orders).toEqual(undefined);

    expect(component.sortType).toBe(undefined);
  });

  it('should not have sortType if no pagination is provided', () => {
    let orders: OrderHistoryList | undefined;

    mockOrderHistoryList$.next(mockEmptyOrderList);

    component.orders$
      .subscribe((value) => {
        orders = value;
      })
      .unsubscribe();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(0);
    expect(orders).toEqual({
      orders: [],
      pagination: { totalResults: 0, totalPages: 1 },
    });

    expect(component.sortType).toBe(undefined);
  });

  it('should clear order history data when component destroy', () => {
    spyOn(orderHistoryFacade, 'clearOrderList').and.stub();

    component.ngOnDestroy();
    expect(orderHistoryFacade.clearOrderList).toHaveBeenCalledWith();
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
