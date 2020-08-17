import { TestBed } from '@angular/core/testing';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { BUDGET_CODE } from '../constants';
import { CurrentBudgetService } from './current-budget.service';

export class MockBudgetService implements Partial<BudgetService> {
  get() {
    return of(undefined);
  }
}

const mockParams = new Subject();

class MockRoutingService {
  getParams() {
    return mockParams;
  }
}

describe('CurrentBudgetService', () => {
  let service: CurrentBudgetService;
  let routingService: RoutingService;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentBudgetService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    });

    budgetService = TestBed.inject(BudgetService);
    service = TestBed.inject(CurrentBudgetService);
    routingService = TestBed.inject(RoutingService);
  });

  describe('emit budget code', () => {
    it('should emit budget code from route parameter', async () => {
      let result;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [BUDGET_CODE]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should emit budget code from route parameters', async () => {
      let result;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      mockParams.next({ bar: 'foo' });
      mockParams.next({ [BUDGET_CODE]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should not emit code$ if there is no route parameters for budget code', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ foo: 'bar' });
      expect(result).toBeFalsy();
    });

    it('should no longer emit the previous code', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [BUDGET_CODE]: 'code1' });
      mockParams.next({});
      expect(result).toBeFalsy();
    });

    it('should emit the code after it is changed', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({});
      mockParams.next({ [BUDGET_CODE]: 'code1' });
      expect(result).toEqual('code1');
    });

    it('should update the budget code with next route param value', async () => {
      let result: string;
      service.code$.subscribe((value) => (result = value));
      mockParams.next({ [BUDGET_CODE]: 'code1' });
      mockParams.next({ [BUDGET_CODE]: 'code2' });
      expect(result).toEqual('code2');
    });

    it('should not emit when param `code` did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', [BUDGET_CODE]: 'code' });
      mockParams.next({ name: 'name2', [BUDGET_CODE]: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockBudget: Budget = { name: 'test cost center' };
      spyOn(budgetService, 'get').and.returnValue(of(mockBudget));

      let result;
      service.Budget$.subscribe((value) => (result = value));
      mockParams.next({ [BUDGET_CODE]: '123' });
      expect(budgetService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockBudget);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(budgetService, 'get');

      let result;
      service.Budget$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(budgetService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });

  describe('launch', () => {
    fit('should launch the route with the given params', () => {
      spyOn(routingService, 'go');
      service.launch({ code: '123' });
      expect(routingService.go).toHaveBeenCalledWith('budgetDetails', {
        code: '123',
      });
    });
  });
  '';
});
