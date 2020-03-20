import {
  Pipe,
  PipeTransform,
  Type,
  Input,
  Output,
  EventEmitter,
  Component,
} from '@angular/core';
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

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { UnitAssignRolesComponent } from './unit-assign-roles.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';

const code = 'costCenterCode';
const budgetCode = '1';
const budgetRow = {
  row: {
    code: budgetCode,
  },
};

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
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2010-01-01T00:00:00+0000',
      endDate: '2034-07-12T00:59:59+0000',
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      code: '2',
      name: 'b2',
      budget: 2240,
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2020-01-01T00:00:00+0000',
      endDate: '2024-07-12T00:59:59+0000',
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockBudgetUIList = {
  values: [
    {
      code: '1',
      name: 'b1',
      amount: '2230 $',
      selected: true,
      startEndDate: '2010-01-01 - 2034-07-12',
      uid: 'orgUid',
      parentUnit: 'orgName',
    },
    {
      code: '2',
      name: 'b2',
      amount: '2240 $',
      selected: true,
      startEndDate: '2020-01-01 - 2024-07-12',
      uid: 'orgUid2',
      parentUnit: 'orgName2',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
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

const budgetList = new BehaviorSubject(mockBudgetList);

class MockCostCenterService implements Partial<CostCenterService> {
  loadBudgets = createSpy('loadBudgets');

  getBudgets = createSpy('getBudgets').and.returnValue(budgetList);

  assignBudget = createSpy('assign');

  unassignBudget = createSpy('unassign');
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        params: {
          code,
        },
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
  let component: UnitAssignRolesComponent;
  let fixture: ComponentFixture<UnitAssignRolesComponent>;
  let costCenterService: MockCostCenterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UnitAssignRolesComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    costCenterService = TestBed.get(
      CostCenterService as Type<CostCenterService>
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAssignRolesComponent);
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
      component.ngOnInit();

      let budgetsList: any;
      component.data$.subscribe(value => {
        budgetsList = value;
      });

      expect(costCenterService.loadBudgets).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(costCenterService.getBudgets).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(budgetsList).toEqual(mockBudgetUIList);
    });
  });

  describe('assign', () => {
    it('should assign budget', () => {
      component.assign(budgetRow);
      expect(costCenterService.assignBudget).toHaveBeenCalledWith(
        code,
        budgetRow.row.code
      );
    });
  });

  describe('unassign', () => {
    it('should unassign budget', () => {
      component.unassign(budgetRow);
      expect(costCenterService.unassignBudget).toHaveBeenCalledWith(
        code,
        budgetRow.row.code
      );
    });
  });
});
