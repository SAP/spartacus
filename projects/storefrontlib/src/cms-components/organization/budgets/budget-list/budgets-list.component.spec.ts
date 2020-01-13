import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  BudgetService,
  BudgetListModel,
  BudgetSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { TableModule } from '../../../../shared/components/table/table.module';

import { BudgetsListComponent } from './budgets-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const defaultParams: BudgetSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockBudgetList: BudgetListModel = {
  budgets: [
    {
      code: '1',
      name: 'b1',
      budget: 2230,
      currency: {
        symbol: '$',
      },
      startDate: '2010-01-01T00:00:00+0000',
      endDate: '2034-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName' },
    },
    {
      code: '2',
      name: 'b2',
      budget: 2240,
      currency: {
        symbol: '$',
      },
      startDate: '2020-01-01T00:00:00+0000',
      endDate: '2024-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName' },
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
    },
    {
      code: '2',
      name: 'b2',
      amount: '2240 $',
      startEndDate: '2020-01-01 - 2024-07-12',
      parentUnit: 'orgName',
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

describe('BudgetsListComponent', () => {
  let component: BudgetsListComponent;
  let fixture: ComponentFixture<BudgetsListComponent>;
  let budgetsService: MockBudgetService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ListNavigationModule,
        TableModule,
        I18nTestingModule,
      ],
      declarations: [BudgetsListComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(BudgetsListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read budget list', () => {
    let budgetsList: any;
    const subscribtion = component.budgetsList$.subscribe(value => {
      budgetsList = value;
    });
    expect(budgetsService.loadBudgets).toHaveBeenCalledWith(defaultParams);
    expect(budgetsService.getList).toHaveBeenCalledWith(defaultParams);
    expect(budgetsList).toEqual(mockBudgetUIList);
    subscribtion.unsubscribe();
  });

  it('should redirect when clicking on budget id', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.cx-table tbody tr'));
    rows[1].triggerEventHandler('click', null);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'budgetDetails',
      params: mockBudgetUIList.budgetsList[1],
    });
  });

  it('should display No budgets found page if no budgets are found', () => {
    const emptyBudgetList: any = {
      budgets: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    budgetList.next(emptyBudgetList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-budgets'))).not.toBeNull();
  });

  it('should set correctly sort code', () => {
    component['params$'] = of(defaultParams);
    component.changeSortCode('byCode');
    expect(routingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'budgets',
      },
      {
        sort: 'byCode',
      }
    );
  });

  it('should set correctly page', () => {
    component['params$'] = of(defaultParams);
    component.pageChange(2);
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
