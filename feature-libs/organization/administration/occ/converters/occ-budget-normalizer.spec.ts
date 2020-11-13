import { inject, TestBed } from '@angular/core/testing';
import { Budget, Occ, OccConfig } from '@spartacus/core';
import { OccBudgetNormalizer } from './occ-budget-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

function fakeDateTimezoneOffset(offset: number, callback: Function): any {
  const original = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = () => offset;
  callback();
  Date.prototype.getTimezoneOffset = original;
}

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

  it('should convert with start date and end date', () => {
    fakeDateTimezoneOffset(-120, () => {
      const result = service.convert({
        startDate: `2021-05-31T22:00:00+02:00`,
        endDate: `2021-06-11T21:59:59+02:00`,
      });

      expect(result.startDate).toEqual('2021-06-01');
      expect(result.endDate).toEqual('2021-06-11');
    });
  });
});
