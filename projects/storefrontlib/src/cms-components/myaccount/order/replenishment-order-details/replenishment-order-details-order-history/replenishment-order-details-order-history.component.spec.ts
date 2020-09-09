import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OrderHistoryList,
  RoutingService,
  TranslationService,
  UserOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReplenishmentOrderDetailsOrderHistoryComponent } from './replenishment-order-details-order-history.component';

const mockOrders: OrderHistoryList = {
  orders: [
    {
      code: 'test-order-code-of-repl',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
    },
  ],
  pagination: { totalResults: 1, totalPages: 1 },
};

const mockOrderHistoryList = new BehaviorSubject<OrderHistoryList>(mockOrders);

class MockRoutingService {
  go() {}
}

class MockUserOrderService {
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return mockOrderHistoryList.asObservable();
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

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('ReplenishmentOrderDetailsOrderHistoryComponent', () => {
  let component: ReplenishmentOrderDetailsOrderHistoryComponent;
  let fixture: ComponentFixture<ReplenishmentOrderDetailsOrderHistoryComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        ReplenishmentOrderDetailsOrderHistoryComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserOrderService, useClass: MockUserOrderService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ReplenishmentOrderDetailsOrderHistoryComponent
    );
    routingService = TestBed.inject(RoutingService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read replenishment details order list', () => {
    let orders: OrderHistoryList;

    component.orders$
      .subscribe((value) => {
        orders = value;
      })
      .unsubscribe();

    expect(orders).toEqual(mockOrders);
  });

  it('should display replenishment details history title', () => {
    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.cx-order-history-header h4')
    );

    expect(element.nativeElement.textContent).toEqual(
      'orderHistory.replenishmentHistory'
    );
  });

  it('should redirect when clicking on the row', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(
      By.css('.cx-order-history-table tbody tr')
    );
    rows[0].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: mockOrders.orders[0],
    });
  });

  it('should display no orders are found text when no orders', () => {
    const emptyOrderList: OrderHistoryList = {
      orders: [],
      pagination: { totalResults: 0 },
    };

    mockOrderHistoryList.next(emptyOrderList);

    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.cx-order-history-no-order')
    );

    expect(element).not.toBeNull();
    expect(element.nativeElement.textContent).toEqual('orderHistory.notFound');
  });
});
