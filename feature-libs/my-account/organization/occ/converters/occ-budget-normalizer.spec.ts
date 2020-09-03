import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Budget } from '@spartacus/my-account/organization/core';
import { OccBudgetNormalizer } from './occ-budget-normalizer';
import { Occ, OccConfig } from '@spartacus/core';

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

    service = TestBed.get(OccBudgetNormalizer as Type<OccBudgetNormalizer>);
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
