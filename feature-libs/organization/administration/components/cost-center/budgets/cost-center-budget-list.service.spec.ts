import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
  CostCenterService,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

const [costCenterCode, budgetCode] = ['costCenterCode', 'budgetCode'];
const mockCostCenterEntities: EntitiesModel<Budget> = {
  values: [
    {
      code: 'first',
      selected: true,
    },
    {
      code: 'second',
      selected: false,
    },
    {
      code: 'third',
      selected: true,
    },
  ],
};

class MockCostCenterService {
  getBudgets(): Observable<EntitiesModel<Budget>> {
    return of(mockCostCenterEntities);
  }
  assignBudget() {}
  unassignBudget() {}
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

@Injectable()
class MockBudgetService {
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return mockItemStatus;
  }
}

describe('CostCenterBudgetListService', () => {
  let service: CostCenterBudgetListService;
  let budgetService: BudgetService;
  let costCenterService: CostCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CostCenterBudgetListService,
        {
          provide: CostCenterService,
          useClass: MockCostCenterService,
        },
        {
          provide: BudgetService,
          useClass: MockBudgetService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(CostCenterBudgetListService);
    budgetService = TestBed.inject(BudgetService);
    costCenterService = TestBed.inject(CostCenterService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected budgets', () => {
    let result: EntitiesModel<Budget>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('second');
    expect(result.values[2].code).toEqual('third');
  });

  it('should assign budget', () => {
    spyOn(costCenterService, 'assignBudget').and.callThrough();
    spyOn(budgetService, 'getLoadingStatus').and.callThrough();

    expect(service.assign(costCenterCode, budgetCode)).toEqual(mockItemStatus);
    expect(costCenterService.assignBudget).toHaveBeenCalledWith(
      costCenterCode,
      budgetCode
    );
    expect(budgetService.getLoadingStatus).toHaveBeenCalledWith(budgetCode);
  });

  it('should unassign budget', () => {
    spyOn(costCenterService, 'unassignBudget').and.callThrough();
    spyOn(budgetService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign(costCenterCode, budgetCode)).toEqual(
      mockItemStatus
    );
    expect(costCenterService.unassignBudget).toHaveBeenCalledWith(
      costCenterCode,
      budgetCode
    );
    expect(budgetService.getLoadingStatus).toHaveBeenCalledWith(budgetCode);
  });
});
