import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ReplenishmentOrderList,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';

const mockReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [
    {
      code: '1',
      firstDate: new Date('2018-01-01').toDateString(),
      active: true,
      subTotal: { formattedValue: '$150.00' },
    },
    {
      code: '2',
      firstDate: new Date('2018-01-02').toDateString(),
      active: true,
      subTotal: { formattedValue: '$200.00' },
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
  replenishmentOrderHistroy = new BehaviorSubject(mockReplenishmentOrders);

  getReplenishmentOrderHistoryList(): Observable<ReplenishmentOrderList> {
    return this.replenishmentOrderHistroy;
  }
  getReplenishmentOrderHistoryListSuccess(): Observable<boolean> {
    return of(true);
  }
  loadReplenishmentOrderList(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}
  clearReplenishmentOrderList() {}
}

class MockRoutingService {
  go() {}
}

fdescribe('ReplenishmentOrderHistoryComponent', () => {
  let component: ReplenishmentOrderHistoryComponent;
  let fixture: ComponentFixture<ReplenishmentOrderHistoryComponent>;
  // let userService: UserReplenishmentOrderService | MockUserOrderService;
  // let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        ReplenishmentOrderHistoryComponent,
        MockUrlPipe,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: UserReplenishmentOrderService,
          useClass: MockUserOrderService,
        },
      ],
    }).compileComponents();

    // userService = TestBed.inject(UserReplenishmentOrderService);
    // routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read replenishment order list', () => {
    let replenishmentOrders: ReplenishmentOrderList;
    component.replenishmentOrders$
      .subscribe((value) => {
        replenishmentOrders = value;
      })
      .unsubscribe();
    expect(replenishmentOrders).toEqual(mockReplenishmentOrders);
  });

  // it('should redirect when clicking on order id', () => {
  //   spyOn(routingService, 'go').and.stub();

  //   fixture.detectChanges();
  //   const rows = fixture.debugElement.queryAll(
  //     By.css('.cx-order-history-table tbody tr')
  //   );
  //   rows[1].triggerEventHandler('click', null);

  //   expect(routingService.go).toHaveBeenCalledWith({
  //     cxRoute: 'orderDetails',
  //     params: mockOrders.orders[1],
  //   });
  // });

  // it('should display No orders found page if no orders are found', () => {
  //   const emptyOrderList: OrderHistoryList = {
  //     orders: [],
  //     pagination: { totalResults: 0, sort: 'byDate' },
  //     sorts: [{ code: 'byDate', selected: true }],
  //   };

  //   (userService as MockUserOrderService).orderHistroy.next(emptyOrderList);
  //   fixture.detectChanges();

  //   expect(
  //     fixture.debugElement.query(By.css('.cx-order-history-no-order'))
  //   ).not.toBeNull();
  // });

  // it('should set correctly sort code', () => {
  //   spyOn(userService, 'loadOrderList').and.stub();

  //   component.changeSortCode('byOrderNumber');

  //   expect(component.sortType).toBe('byOrderNumber');
  //   expect(userService.loadOrderList).toHaveBeenCalledWith(
  //     5,
  //     0,
  //     'byOrderNumber'
  //   );
  // });

  // it('should set correctly page', () => {
  //   spyOn(userService, 'loadOrderList').and.stub();

  //   component.sortType = 'byDate';
  //   component.pageChange(1);

  //   expect(userService.loadOrderList).toHaveBeenCalledWith(5, 1, 'byDate');
  // });

  // it('should clear order history data when component destroy', () => {
  //   spyOn(userService, 'clearOrderList').and.stub();

  //   component.ngOnDestroy();
  //   expect(userService.clearOrderList).toHaveBeenCalledWith();
  // });
});
