import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Pipe,
  PipeTransform,
  ViewContainerRef,
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
      active: true,
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

describe('ReplenishmentOrderHistoryComponent', () => {
  let component: ReplenishmentOrderHistoryComponent;
  let fixture: ComponentFixture<ReplenishmentOrderHistoryComponent>;
  let userService: UserReplenishmentOrderService;
  let routingService: RoutingService;

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentOrderHistoryComponent);
    component = fixture.componentInstance;
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

  it('should redirect when clicking on replenishment order code', () => {
    spyOn(routingService, 'go').and.stub();

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(
      By.css('.cx-replenishment-order-history-code')
    );
    console.log(rows);
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

  it('should clear replenishment order history data when component destroy', () => {
    spyOn(userService, 'clearReplenishmentOrderList').and.stub();

    component.ngOnDestroy();
    expect(userService.clearReplenishmentOrderList).toHaveBeenCalledWith();
  });
});
