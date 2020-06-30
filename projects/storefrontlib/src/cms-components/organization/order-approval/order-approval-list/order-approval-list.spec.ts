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
  B2BSearchConfig,
  CxDatePipe,
  EntitiesModel,
  I18nTestingModule,
  OrderApproval,
  OrderApprovalService,
  RoutesConfig,
  RoutingConfig,
  RoutingService,
} from '@spartacus/core';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { BehaviorSubject, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { OrderApprovalListComponent } from './order-approval-list.component';

import createSpy = jasmine.createSpy;

const defaultParams: B2BSearchConfig = {
  sort: 'byOrderNumber',
  currentPage: 0,
  pageSize: 5,
};

const mockApprovalList: EntitiesModel<OrderApproval> = {
  values: [
    {
      order: {
        code: '00000039',
        purchaseOrderNumber: '4000',
        orgCustomer: {
          name: 'Hanna Schmidt',
          orgUnit: {
            name: 'Rustic',
          },
        },
        // @ts-ignore
        created: '2020-06-29T17:48:13+0000',
        statusDisplay: 'Assigned to administrator',
        totalPrice: {
          formattedValue: '$130,816.99',
        },
      },
    },
    {
      order: {
        code: '00000020',
        purchaseOrderNumber: '',
        orgCustomer: {
          name: 'Mark Rivers',
          orgUnit: {
            name: 'Custom Retail',
          },
        },
        // @ts-ignore
        created: '2020-06-17T19:15:55+0000',
        statusDisplay: 'Approved',
        totalPrice: {
          formattedValue: '$157,394.99',
        },
      },
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byOrderNumber' },
  sorts: [
    { code: 'byDate', selected: true },
    { code: 'byOrderNumber', selected: false },
  ],
};

const mockApprovalUIList = {
  values: [
    {
      POCode: '4000',
      code: '00000039',
      date: '2020-06-29',
      placedBy: 'Hanna Schmidt Rustic',
      status: 'Assigned to administrator',
      total: '$130,816.99',
    },
    {
      POCode: 'None',
      code: '00000020',
      date: '2020-06-17',
      placedBy: 'Mark Rivers Custom Retail',
      status: 'Approved',
      total: '$157,394.99',
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byOrderNumber' },
  sorts: [
    { code: 'byDate', selected: true },
    { code: 'byOrderNumber', selected: false },
  ],
};

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const approvalList = new BehaviorSubject(mockApprovalList);

class MockOrderApprovalService implements Partial<OrderApprovalService> {
  loadOrderApprovals = createSpy('loadOrderApprovals');
  getList = createSpy('getList').and.returnValue(approvalList);
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        queryParams: {
          sort: 'byOrderNumber',
          currentPage: '0',
          pageSize: '5',
        },
      },
    });
  }
}
const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

fdescribe('OrderApprovalListComponent', () => {
  let component: OrderApprovalListComponent;
  let fixture: ComponentFixture<OrderApprovalListComponent>;
  let orderApprovalService: MockOrderApprovalService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        OrderApprovalListComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrderApprovalService, useClass: MockOrderApprovalService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    orderApprovalService = TestBed.get(
      OrderApprovalService as Type<OrderApprovalService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovalListComponent);
    component = fixture.componentInstance;
    approvalList.next(mockApprovalList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no approvals found page if no orders are found', () => {
    const emptyApprovalList: EntitiesModel<OrderApproval> = {
      pagination: {
        currentPage: 0,
        totalResults: 0,
      },
      sorts: [{ code: 'byName', selected: true }],
      values: [],
    };

    approvalList.next(emptyApprovalList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read order approvals list', () => {
      component.ngOnInit();
      expect(orderApprovalService.loadOrderApprovals).toHaveBeenCalledWith(
        defaultParams
      );
      expect(orderApprovalService.getList).toHaveBeenCalledWith(defaultParams);

      let approvalsList: any;
      component.data$
        .subscribe((value) => {
          approvalsList = value;
          console.log(value);
        })
        .unsubscribe();

      expect(approvalsList).toEqual(mockApprovalUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component.changeSortCode('byDate');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'orderApprovals',
          params: {},
        },
        {
          sort: 'byDate',
        }
      );
    });
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component.pageChange(2);
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'orderApprovals',
          params: {},
        },
        {
          sort: 'byOrderNumber',
          currentPage: 2,
        }
      );
    });
  });
});
