import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel, CostCenter } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';
import { BudgetService } from '../../../../core/services/budget.service';

const mockCostCenterEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'first',
    },
    {
      code: 'second',
    },
    {
      code: 'third',
    },
  ],
};

class MockBudgetService {
  getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return of(mockCostCenterEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('BudgetCostCenterListService', () => {
  let service: BudgetCostCenterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BudgetCostCenterListService,
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
    service = TestBed.inject(BudgetCostCenterListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected cost-centers', () => {
    let result: Table<CostCenter>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[2].code).toEqual('third');
  });
});
