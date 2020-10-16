import { inject, TestBed } from '@angular/core/testing';
import { Occ, OccConfig } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { OccBudgetNormalizer } from './occ-budget-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('BudgetNormalizer', () => {
  let service: OccBudgetNormalizer;

  const budget: Occ.Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  const convertedBudget: Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccBudgetNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccBudgetNormalizer);
  });

  it('should inject OccBudgetNormalizer', inject(
    [OccBudgetNormalizer],
    (budgetNormalizer: OccBudgetNormalizer) => {
      expect(budgetNormalizer).toBeTruthy();
    }
  ));

  it('should convert budget', () => {
    const result = service.convert(budget);
    expect(result).toEqual(convertedBudget);
  });

  it('should convert budget with applied target', () => {
    const result = service.convert(budget, {});
    expect(result).toEqual({});
  });
});
