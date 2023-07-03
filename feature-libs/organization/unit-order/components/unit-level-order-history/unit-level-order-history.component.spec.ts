import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  PaginationModel,
  RoutingService,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { OrderHistoryQueryParams } from '../../core/model/unit-order.model';
import { UnitOrderFacade } from '../../root/facade';
import { UnitLevelOrderHistoryComponent } from './unit-level-order-history.component';

const mockOrderList: OrderHistoryList | undefined = {
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      orgCustomer: {
        email: 'mark.rivers@rustic-hw.com',
        uid: 'mark.rivers@rustic-hw.com',
        firstName: 'Mark',
        lastName: 'Rivers',
      },
      orgUnit: { name: 'Custom Retail', uid: 'Custom Retail' },
      statusDisplay: 'test',
      total: { formattedValue: '1' },
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      orgCustomer: {
        email: 'mark.rivers@rustic-hw.com',
        uid: 'mark.rivers@rustic-hw.com',
        firstName: 'Mark',
        lastName: 'Rivers',
      },
      orgUnit: { name: 'Custom Retail', uid: 'Custom Retail' },

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

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions: SortModel;
  @Input() sortLabels: string;
  @Input() selectedOption: string;
  @Input() placeholder: string;
  @Output() sortListEvent = new EventEmitter<string>();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUnitLevelOrdersFacade implements UnitOrderFacade {
  getOrderDetails(): Observable<Order> {
    throw new Error('Method not implemented.');
  }

  loadOrderDetails(_orderCode: string): void {
    throw new Error('Method not implemented.');
  }

  clearOrderDetails(): void {
    throw new Error('Method not implemented.');
  }

  mockOrderHistoryListSubject = new BehaviorSubject<
    OrderHistoryList | undefined
  >(mockOrderList);

  getOrderHistoryList(): Observable<OrderHistoryList | undefined> {
    return this.mockOrderHistoryListSubject.asObservable();
  }

  getOrderHistoryListLoaded(): Observable<boolean> {
    return of(true);
  }

  loadOrderList(
    _pageSize: number,
    _currentPage?: number,
    _filters?: string,
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

describe('UnitLevelOrderHistoryComponent', () => {
  let component: UnitLevelOrderHistoryComponent;
  let fixture: ComponentFixture<UnitLevelOrderHistoryComponent>;
  let unitOrderFacade: UnitOrderFacade;
  let mockUnitLevelOrdersFacade: MockUnitLevelOrdersFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        UnitLevelOrderHistoryComponent,
        MockUrlPipe,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UnitOrderFacade, useClass: MockUnitLevelOrdersFacade },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    unitOrderFacade = TestBed.inject(UnitOrderFacade);
    mockUnitLevelOrdersFacade = unitOrderFacade as MockUnitLevelOrdersFacade;
    routingService = TestBed.inject(RoutingService);
    fixture = TestBed.createComponent(UnitLevelOrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read unit order list', () => {
    let orders: OrderHistoryList | undefined;
    component.orders$
      .subscribe((value) => {
        orders = value;
      })
      .unsubscribe();
    expect(orders).toEqual(mockOrderList);
  });

  it('should redirect when clicking on order id', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(
      By.css('.cx-unit-level-order-history-table tbody tr')
    );
    rows[0].triggerEventHandler('click', null);

    const order = mockOrderList.orders ? mockOrderList.orders[0] : undefined;
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'unitLevelOrderDetail',
      params: order,
    });
  });

  it('should set correctly sort code', () => {
    spyOn(unitOrderFacade, 'loadOrderList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(unitOrderFacade.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      '',
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(unitOrderFacade, 'loadOrderList').and.stub();

    component.changeSortCode('byDate');
    component.pageChange(1);

    expect(unitOrderFacade.loadOrderList).toHaveBeenCalledWith(
      5,
      1,
      '',
      'byDate'
    );
  });

  it('should display pagination', () => {
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-unit-level-order-history-pagination')
    );
    expect(elements.length).toEqual(2);
    expect(component.sortType).toEqual('byDate');
  });

  it('should not have sortType if no orders and pagination are provided', () => {
    let orders: OrderHistoryList | undefined;

    mockUnitLevelOrdersFacade.mockOrderHistoryListSubject.next(undefined);

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

    mockUnitLevelOrdersFacade.mockOrderHistoryListSubject.next(
      mockEmptyOrderList
    );

    component.orders$
      .subscribe((value) => {
        orders = value;
      })
      .unsubscribe();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-unit-order-history-pagination')
    );

    expect(elements.length).toEqual(0);
    expect(orders).toEqual({
      orders: [],
      pagination: { totalResults: 0, totalPages: 1 },
    });

    expect(component.sortType).toBe(undefined);
  });

  it('should clear order history data when component destroy', () => {
    spyOn(unitOrderFacade, 'clearOrderList').and.stub();

    component.ngOnDestroy();
    expect(unitOrderFacade.clearOrderList).toHaveBeenCalledWith();
  });

  it('should display no orders found page if no orders are found', () => {
    mockUnitLevelOrdersFacade.mockOrderHistoryListSubject.next(
      mockEmptyOrderList
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(
        By.css('.cx-unit-level-order-history-no-order')
      )
    ).not.toBeNull();
  });

  it('should set correct filters', () => {
    spyOn(unitOrderFacade, 'loadOrderList').and.stub();

    let orderHistoryQueryParam: OrderHistoryQueryParams = {
      currentPage: 0,
      sortCode: 'byDate',
      filters: '::user:mark:unit:custom',
    };
    component.filterChange(orderHistoryQueryParam);

    expect(unitOrderFacade.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      '::user:mark:unit:custom',
      'byDate'
    );
  });
});
