import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  EntitiesModel,
  I18nTestingModule,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
import { OrderApprovalListComponent } from './order-approval-list.component';
import createSpy = jasmine.createSpy;

const mockOrderApprovals: EntitiesModel<OrderApproval> = {
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 3,
    totalResults: 12,
  },
  sorts: [
    {
      code: 'byDate',
      selected: true,
    },
    {
      code: 'byOrderNumber',
      selected: false,
    },
  ],
  values: [
    {
      code: '0000000A',
      order: {
        code: '00000001',
        purchaseOrderNumber: 'PO BOX 4200',
        orgCustomer: { name: 'Mark Rivers' },
        created: new Date('2018-01-02'),
        statusDisplay: 'pending.approval',
        totalPrice: {
          formattedValue: '$4,200.00',
        },
      },
    },
    {
      code: '0000000B',
      order: {
        code: '00000002',
        purchaseOrderNumber: 'PO BOX 9002',
        orgCustomer: { name: 'William Hunter' },
        created: new Date('2018-02-01'),
        statusDisplay: 'pending.approval',
        totalPrice: {
          formattedValue: '$9,001.99',
        },
      },
    },
  ],
};

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

class MockOrderApprovalService {
  orderApprovalList = new BehaviorSubject(mockOrderApprovals);

  loadOrderApprovals(_searchConfig: SearchConfig): void {}
  getList(
    _searchConfig: SearchConfig
  ): Observable<EntitiesModel<OrderApproval>> {
    return this.orderApprovalList;
  }
}

class MockRoutingService {
  go = createSpy('go').and.stub();
}

describe('OrderApprovalListComponent?', () => {
  let component: OrderApprovalListComponent;
  let fixture: ComponentFixture<OrderApprovalListComponent>;
  let orderApprovalService: OrderApprovalService | MockOrderApprovalService;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        UrlTestingModule,
        PaginationTestingModule,
      ],
      declarations: [OrderApprovalListComponent, MockSortingComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrderApprovalService, useClass: MockOrderApprovalService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    orderApprovalService = TestBed.inject(OrderApprovalService);
    routingService = TestBed.inject(RoutingService);

    fixture = TestBed.createComponent(OrderApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read order approval list', () => {
    let orderApprovalValues: Array<OrderApproval>;
    component.orderApprovals$
      .subscribe(({ values }: EntitiesModel<OrderApproval>) => {
        orderApprovalValues = values;
      })
      .unsubscribe();

    expect(orderApprovalValues).toEqual(mockOrderApprovals.values);
  });

  it('should display no approvals found message when there are no approvals', () => {
    const emptyOrderList: EntitiesModel<OrderApproval> = {
      pagination: { ...mockOrderApprovals.pagination, totalResults: 0 },
      values: [],
    };

    (orderApprovalService as MockOrderApprovalService).orderApprovalList.next(
      emptyOrderList
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-order-approval-no-order'))
    ).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    spyOn(orderApprovalService, 'getList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');

    const orderNumberSearchConfig: SearchConfig = {
      pageSize: 5,
      currentPage: 0,
      sort: 'byOrderNumber',
    };

    expect(orderApprovalService.getList).toHaveBeenCalledWith(
      orderNumberSearchConfig
    );
  });

  it('should set correctly page', () => {
    spyOn(orderApprovalService, 'loadOrderApprovals').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    const dateSearchConfig: SearchConfig = {
      pageSize: 5,
      currentPage: 1,
      sort: 'byDate',
    };

    expect(orderApprovalService.loadOrderApprovals).toHaveBeenCalledWith(
      dateSearchConfig
    );
  });

  it('should go to details page when the table row is clicked', () => {
    el.query(By.css('tr')).nativeElement.click();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderApprovalDetails',
      params: { approvalCode: mockOrderApprovals.values[0].code },
    });
  });
});
