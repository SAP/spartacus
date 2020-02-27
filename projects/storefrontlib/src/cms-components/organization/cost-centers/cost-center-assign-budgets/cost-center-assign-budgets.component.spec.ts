import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  Budget,
  CostCenterService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { TableModule } from '../../../../shared/components/table/table.module';

import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const costCenterCode = 'costCenterCode';
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

class MockCostCenterService implements Partial<CostCenterService> {
  loadBudgets = createSpy('loadBudgets');

  getBudgets = createSpy('getBudgets').and.returnValue(budgetList);
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

describe('CostCenterAssignBudgetsComponent', () => {
  let component: CostCenterAssignBudgetsComponent;
  let fixture: ComponentFixture<CostCenterAssignBudgetsComponent>;
  let costCenterService: MockCostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ListNavigationModule,
        TableModule,
        I18nTestingModule,
      ],
      declarations: [CostCenterAssignBudgetsComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    costCenterService = TestBed.get(CostCenterService as Type<
      CostCenterService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterAssignBudgetsComponent);
    component = fixture.componentInstance;
    budgetList.next(mockBudgetList);
    component['costCenterCode$'] = of(costCenterCode);
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

    expect(fixture.debugElement.query(By.css('.cx-no-budgets'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read budget list', () => {
      component.ngOnInit();
      let budgetsList: any;
      component.budgetsList$
        .subscribe(value => {
          budgetsList = value;
        })
        .unsubscribe();
      expect(costCenterService.loadBudgets).toHaveBeenCalledWith(
        costCenterCode,
        defaultParams
      );
      expect(costCenterService.getBudgets).toHaveBeenCalledWith(
        costCenterCode,
        defaultParams
      );
      expect(budgetsList).toEqual(mockBudgetUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
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
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component['params$'] = of(defaultParams);
      component['costCenterCode$$'] = of(costCenterCode);
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
});
