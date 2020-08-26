import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { Budget } from '../../../../core/model/budget.model';
import { CostCenterService } from '../../../../core/services/cost-center.service';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budgets.service';

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
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('CostCenterAssignBudgetListService', () => {
  let service: CostCenterAssignBudgetListService;
  let costCenterService: CostCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CostCenterAssignBudgetListService,
        {
          provide: CostCenterService,
          useClass: MockCostCenterService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(CostCenterAssignBudgetListService);
    costCenterService = TestBed.inject(CostCenterService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected budgets', () => {
    let result: Table<Budget>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('second');
    expect(result.data[2].code).toEqual('third');
  });

  it('should assign budget', () => {
    spyOn(costCenterService, 'assignBudget');
    service.toggleAssign('costCenterCode', 'budgetCode');
    expect(costCenterService.assignBudget).toHaveBeenCalledWith(
      'costCenterCode',
      'budgetCode'
    );
  });

  it('should unassign budget', () => {
    spyOn(costCenterService, 'unassignBudget');
    service.toggleAssign('costCenterCode', 'budgetCode', false);
    expect(costCenterService.unassignBudget).toHaveBeenCalledWith(
      'costCenterCode',
      'budgetCode'
    );
  });
});
