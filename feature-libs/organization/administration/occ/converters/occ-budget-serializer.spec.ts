import { inject, TestBed } from '@angular/core/testing';
import { Occ, OccConfig, TimeUtils } from '@spartacus/core';
import { TestingTimeUtils } from '../../../../../projects/core/src/util/testing-time-utils';
import { Budget } from '../../core/model/budget.model';
import { OccBudgetSerializer } from './occ-budget-serializer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const mockTime = '10:00';
const mockStartDate = '2021-06-01';
const mockEndDate = '2021-06-11';

describe('BudgetSerializer', () => {
  let serializer: OccBudgetSerializer;

  const budget: Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  const convertedBudget: Occ.Budget = {
    name: 'Budget1',
    code: 'testCode',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccBudgetSerializer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    serializer = TestBed.inject(OccBudgetSerializer);
  });

  it('should inject OccBudgetSerializer', inject(
    [OccBudgetSerializer],
    (budgetNormalizer: OccBudgetSerializer) => {
      expect(budgetNormalizer).toBeTruthy();
    }
  ));

  it('should convert budget', () => {
    const result = serializer.convert(budget);
    expect(result).toEqual(convertedBudget);
  });

  it('should convert budget with applied target', () => {
    const result = serializer.convert(budget, {});
    expect(result).toEqual({});
  });

  it('should convert with start date and end date', () => {
    TestingTimeUtils.fakeToLocaleTimeString(mockTime, () => {
      TestingTimeUtils.fakeDateTimezoneOffset(-120, () => {
        const mockModelStartValue = `${mockStartDate}T00:00:00${TimeUtils.getLocalTimezoneOffset()}`;
        const mockModelEndValue = `${mockEndDate}T23:59:59${TimeUtils.getLocalTimezoneOffset()}`;

        const result = serializer.convert({
          startDate: mockStartDate,
          endDate: mockEndDate,
        });

        expect(result.startDate).toEqual(mockModelStartValue);
        expect(result.endDate).toEqual(mockModelEndValue);
      });
    });
  });
});
