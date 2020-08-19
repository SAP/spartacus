import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentBudgetService } from './current-budget.service';
import { Budget } from '../../core/model/budget.model';
import { BudgetService } from '../../core/services/budget.service';

export class MockBudgetService implements Partial<BudgetService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentBudgetService', () => {
  let service: CurrentBudgetService;
  let budgetService: BudgetService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentBudgetService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    });

    budgetService = TestBed.inject(BudgetService);
    service = TestBed.inject(CurrentBudgetService);
  });

  describe('code$', () => {
    it('should return undefined when route param `code` is undefined', async () => {
      const results = [];
      service.code$.pipe(take(2)).subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should expose route param `code` from activated route', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should not emit when param `code` did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', code: 'code' });
      mockParams.next({ name: 'name2', code: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockBudget: Budget = { name: 'test cost center' };
      spyOn(budgetService, 'get').and.returnValue(of(mockBudget));

      let result;
      service.Budget$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
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
});
