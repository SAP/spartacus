import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Budget } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrganizationTestingModule } from '../../../shared/testing/organization-testing.module';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budget.component';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budget.service';

const costCenterCode = 'costCenterCode';

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

class MockActivatedRoute {
  parent = {
    parent: {
      params: of({ code: costCenterCode }),
    },
  };
  snapshot = {};
}

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
      imports: [OrganizationTestingModule],
      declarations: [CostCenterAssignBudgetsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        {
          provide: CostCenterAssignBudgetListService,
          useClass: MockCostCenterBudgetListService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(CostCenterAssignBudgetListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterAssignBudgetsComponent);
    component = fixture.componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
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
});
