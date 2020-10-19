import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { BudgetService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

const mockCostCenterEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'first',
      active: true,
    },
    {
      code: 'second',
      active: true,
    },
    {
      code: 'third',
      active: true,
    },
  ],
};

const mockCostCenterEntities2: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'first',
      active: true,
    },
    {
      code: 'second',
    },
    {
      code: 'third',
      active: true,
    },
  ],
};

class MockBudgetService {
  getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return of(mockCostCenterEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('BudgetCostCenterListService', () => {
  let service: BudgetCostCenterListService;
  let budgetService: BudgetService;

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
    budgetService = TestBed.inject(BudgetService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should have all cost-centers', () => {
    let result: EntitiesModel<CostCenter>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('second');
    expect(result.values[2].code).toEqual('third');
  });

  it('should filter selected cost-centers', () => {
    spyOn(budgetService, 'getCostCenters').and.returnValue(
      of(mockCostCenterEntities2)
    );
    let result: EntitiesModel<CostCenter>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(2);
    expect(result.values).not.toContain({
      code: 'second',
    });
  });
});
