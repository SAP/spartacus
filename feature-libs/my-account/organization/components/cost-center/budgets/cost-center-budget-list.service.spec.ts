import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  Budget,
  CostCenterService,
} from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

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

describe('CostCenterBudgetListService', () => {
  let service: CostCenterBudgetListService;

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
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(CostCenterBudgetListService);
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
});
