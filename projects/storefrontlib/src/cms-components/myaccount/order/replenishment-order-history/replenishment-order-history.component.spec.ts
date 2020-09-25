import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
  DebugElement,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ReplenishmentOrderList,
  RoutingService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';
import { ReplenishmentOrderCancellationLaunchDialogService } from '../replenishment-order-details/replenishment-order-cancellation/replenishment-order-cancellation-launch-dialog.service';

const mockReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders: [
    {
      code: '1',
      firstDate: new Date('2018-01-01').toDateString(),
      active: false,
      purchaseOrderNumber: '',
      subTotal: { formattedValue: '$150.00' },
      trigger: {
        displayTimeTable: 'time-table',
        activationTime: '1994-01-11T00:00Z',
      },
    },
    {
      code: '2',
      firstDate: new Date('2018-01-02').toDateString(),
      active: true,
      purchaseOrderNumber: 'xyz',
      subTotal: { formattedValue: '$200.00' },
      trigger: {
        displayTimeTable: 'time-table',
        activationTime: '1994-01-11T00:00Z',
      },
    },
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const replenishmentOrderHistory = new BehaviorSubject<ReplenishmentOrderList>(
  mockReplenishmentOrders
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

class MockReplenishmentOrderCancellationLaunchDialogService {
  openDialog(_openElement?: ElementRef, _vcr?: ViewContainerRef) {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserReplenishmentOrderService {
  getReplenishmentOrderHistoryList(): Observable<ReplenishmentOrderList> {
    return replenishmentOrderHistory.asObservable();
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
  let userService: UserReplenishmentOrderService;
  let routingService: RoutingService;
  let replenishmentOrderCancellationLaunchDialogService: ReplenishmentOrderCancellationLaunchDialogService;
  let el: DebugElement;

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
          useClass: MockUserReplenishmentOrderService,
        },
        {
          provide: ReplenishmentOrderCancellationLaunchDialogService,
          useClass: MockReplenishmentOrderCancellationLaunchDialogService,
        },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserReplenishmentOrderService);
    routingService = TestBed.inject(RoutingService);
    replenishmentOrderCancellationLaunchDialogService = TestBed.inject(
      ReplenishmentOrderCancellationLaunchDialogService
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderHistoryComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should be created', () => {
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

  it('should redirect when clicking on replenishment order row', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(
      By.css('.cx-replenishment-order-history-table tbody tr')
    );
    rows[1].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'replenishmentDetails',
      params: mockReplenishmentOrders.replenishmentOrders[1],
    });
  });

  it('should display No replenishment orders found page if no orders are found', () => {
    const emptyReplenishmentOrderList: ReplenishmentOrderList = {
      replenishmentOrders: [],
      pagination: { totalResults: 0, sort: 'byDate' },
      sorts: [{ code: 'byDate', selected: true }],
    };

    replenishmentOrderHistory.next(emptyReplenishmentOrderList);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(
        By.css('.cx-replenishment-order-history-no-order')
      )
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOn(userService, 'loadReplenishmentOrderList').and.stub();

    component.changeSortCode('byReplenishmentNumber');

    expect(component.sortType).toBe('byReplenishmentNumber');
    expect(userService.loadReplenishmentOrderList).toHaveBeenCalledWith(
      5,
      0,
      'byReplenishmentNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(userService, 'loadReplenishmentOrderList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(userService.loadReplenishmentOrderList).toHaveBeenCalledWith(
      5,
      1,
      'byDate'
    );
  });

  it('should be able to call the open dialog', () => {
    spyOn(
      replenishmentOrderCancellationLaunchDialogService,
      'openDialog'
    ).and.stub();

    replenishmentOrderHistory.next(mockReplenishmentOrders);

    fixture.detectChanges();

    el.query(By.css('.cx-order-cancel')).nativeElement.click();

    expect(
      replenishmentOrderCancellationLaunchDialogService.openDialog
    ).toHaveBeenCalledWith(component.element, component['vcr']);
  });

  it('should NOT show a cancel action button', () => {
    replenishmentOrderHistory.next(mockReplenishmentOrders);

    fixture.detectChanges();

    const button = el.query(By.css('.cx-order-cancel:first-child'));

    expect(button).toBeFalsy();
  });

  it('should show a cancel action button', () => {
    fixture.detectChanges();

    const button = el.query(By.css('.cx-order-cancel:last-child'))
      .nativeElement;

    expect(button.textContent).toContain('orderHistory.cancel');
  });

  it('should display Cancelled when replenishment order is cancelled', () => {
    fixture.detectChanges();

    const element = el.queryAll(By.css('.cx-next-order-date'))[0].nativeElement;

    expect(element.textContent).toContain('orderHistory.cancelled');
  });

  it('should display next order date when replenishment order is NOT cancelled', () => {
    fixture.detectChanges();

    const element = el.queryAll(By.css('.cx-next-order-date'))[1].nativeElement;

    expect(element.textContent).toContain('1/10/94');
  });

  it('should display None when purchaseOrderNumber is empty', () => {
    fixture.detectChanges();

    const element = el.queryAll(By.css('.cx-purchase-order-number'))[0]
      .nativeElement;

    expect(element.textContent).toContain('orderHistory.emptyPurchaseOrderId');
  });

  it('should display purchaseOrderNumber when not empty', () => {
    fixture.detectChanges();

    const element = el.queryAll(By.css('.cx-purchase-order-number'))[1]
      .nativeElement;

    expect(element.textContent).toContain(
      mockReplenishmentOrders.replenishmentOrders[1].purchaseOrderNumber
    );
  });

  it('should clear replenishment order history data when component destroy', () => {
    spyOn(userService, 'clearReplenishmentOrderList').and.stub();

    component.ngOnDestroy();

    expect(userService.clearReplenishmentOrderList).toHaveBeenCalledWith();
  });
});
