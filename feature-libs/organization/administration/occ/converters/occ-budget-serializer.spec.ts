import { inject, TestBed } from '@angular/core/testing';
import { Budget, Occ, OccConfig } from '@spartacus/core';
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
const mockModelStartValue = `${mockStartDate}T00:00:00+02:00`;
const mockModelEndValue = `${mockEndDate}T23:59:59+02:00`;

function fakeToLocalTimeString(callback: Function): any {
  const original = Date.prototype.toLocaleTimeString;
  Date.prototype.toLocaleTimeString = () => mockTime;
  callback();
  Date.prototype.toLocaleTimeString = original;
}

function fakeDateTimezoneOffset(offset: number, callback: Function): any {
  const original = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = () => offset;
  callback();
  Date.prototype.getTimezoneOffset = original;
}

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
    fakeToLocalTimeString(() => {
      fakeDateTimezoneOffset(-120, () => {
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
