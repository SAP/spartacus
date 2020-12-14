import { inject, TestBed } from '@angular/core/testing';
import { EntitiesModel, Occ, OccConfig } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { OccBudgetListNormalizer } from './occ-budget-list-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('BudgetListNormalizer', () => {
  let service: OccBudgetListNormalizer;

  const budget: Occ.Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  const budgetList: Occ.BudgetsList = {
    budgets: [budget],
  };

  const targetBudget: Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  const targetBudgetList: EntitiesModel<Budget> = {
    values: [targetBudget],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccBudgetListNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccBudgetListNormalizer);
  });

  it('should inject OccBudgetListNormalizer', inject(
    [OccBudgetListNormalizer],
    (budgetListNormalizer: OccBudgetListNormalizer) => {
      expect(budgetListNormalizer).toBeTruthy();
    }
  ));

  it('should convert budget list', () => {
    const result = service.convert(budgetList);
    expect(result.values).toEqual(targetBudgetList.values);
  });

  it('should convert budget list with applied target', () => {
    const result = service.convert(budgetList, targetBudgetList);
    expect(result).toEqual(targetBudgetList);
  });
});
