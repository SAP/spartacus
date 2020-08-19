import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { Budget } from '../../../../core/model/budget.model';
import { CurrentCostCenterService } from '../../current-cost-center.service';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budgets.service';

const costCenterCode = 'costCenterCode';

class MockCurrentCostCenterService
  implements Partial<CurrentCostCenterService> {
  code$ = of(costCenterCode);
}

const mockBudgetList: Table<Budget> = {
  data: [
    {
      code: 'budget-1',
      name: 'b1',
      selected: false,
    },
    {
      code: 'budget-2',
      name: 'b2',
      selected: false,
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

class MockCostCenterBudgetListService {
  getTable(_code) {
    return of(mockBudgetList);
  }
  toggleAssign() {}
}

describe('CostCenterAssignBudgetsComponent', () => {
  let component: CostCenterAssignBudgetsComponent;
  let fixture: ComponentFixture<CostCenterAssignBudgetsComponent>;
  let service: CostCenterAssignBudgetListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
        PaginationTestingModule,
      ],
      declarations: [CostCenterAssignBudgetsComponent],
      providers: [
        {
          provide: CostCenterAssignBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
        {
          provide: CurrentCostCenterService,
          useClass: MockCurrentCostCenterService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(CostCenterAssignBudgetListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterAssignBudgetsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have budgets', () => {
    let result;
    component.dataTable$.subscribe((data) => (result = data));
    expect(result).toEqual(mockBudgetList);
  });

  it('should get budgets from service by code', () => {
    spyOn(service, 'getTable');
    fixture.detectChanges();
    expect(service.getTable).toHaveBeenCalled();
  });

  describe('with table data', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeFalsy();
    });

    it('should assign a budget', () => {
      spyOn(service, 'toggleAssign');
      component.toggleAssign('costCenterCode', 'budget-1', true);
      expect(service.toggleAssign).toHaveBeenCalledWith(
        'costCenterCode',
        'budget-1',
        true
      );
    });

    it('should unassign a budget', () => {
      spyOn(service, 'toggleAssign');
      component.toggleAssign('costCenterCode', 'budget-1', false);
      expect(service.toggleAssign).toHaveBeenCalledWith(
        'costCenterCode',
        'budget-1',
        false
      );
    });
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(null));
      fixture.detectChanges();
    });
    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });

  describe('code$', () => {
    it('should emit the current cost center code', () => {
      let result;
      component.code$.subscribe((r) => (result = r));
      expect(result).toBe(costCenterCode);
    });
  });
});
