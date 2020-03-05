import {
  Pipe,
  PipeTransform,
  Type,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  RoutingService,
  BudgetService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  Budget,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../table/table.module';
import { InteractiveTableComponent } from './interactive-table.component';
import { InteractiveTableModule } from './interactive-table.module';

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockBudgetList: EntitiesModel<Budget> = {
  values: [
    {
      code: '1',
      name: 'b1',
      budget: 2230,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2010-01-01T00:00:00+0000',
      endDate: '2034-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
    {
      code: '2',
      name: 'b2',
      budget: 2240,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2020-01-01T00:00:00+0000',
      endDate: '2024-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
  ],
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockBudgetUIList = {
  budgetsList: [
    {
      code: '1',
      name: 'b1',
      amount: '2230 $',
      startEndDate: '2010-01-01 - 2034-07-12',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
    {
      code: '2',
      name: 'b2',
      amount: '2240 $',
      startEndDate: '2020-01-01 - 2024-07-12',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
  ],
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const budgetList = new BehaviorSubject(mockBudgetList);

class MockBudgetService implements Partial<BudgetService> {
  loadBudgets = createSpy('loadBudgets');

  getList = createSpy('getList').and.returnValue(budgetList);
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        queryParams: {
          sort: 'byName',
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

describe('InteractiveTableComponent', () => {
  let component: InteractiveTableComponent;
  let fixture: ComponentFixture<InteractiveTableComponent>;
  let budgetsService: MockBudgetService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, InteractiveTableModule],
      declarations: [
        InteractiveTableComponent,
        MockPaginationComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    }).compileComponents();

    budgetsService = TestBed.get(BudgetService as Type<BudgetService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTableComponent);
    component = fixture.componentInstance;
    budgetList.next(mockBudgetList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No budgets found page if no budgets are found', () => {
    const emptyBudgetList: EntitiesModel<Budget> = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    budgetList.next(emptyBudgetList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read budget list', () => {
      let budgetsList: any;
      component.data$
        .subscribe(value => {
          budgetsList = value;
        })
        .unsubscribe();
      expect(budgetsService.loadBudgets).toHaveBeenCalledWith(defaultParams);
      expect(budgetsService.getList).toHaveBeenCalledWith(defaultParams);
      expect(budgetsList).toEqual(mockBudgetUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component['queryParams$'] = of(defaultParams);
      component.sortListEvent('byCode');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'budgets',
        },
        {
          sort: 'byCode',
        }
      );
    });
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component['queryParams$'] = of(defaultParams);
      component.viewPageEvent(2);
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'budgets',
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
