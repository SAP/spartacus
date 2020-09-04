import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { BudgetService } from '../../../core';
import { ROUTE_PARAMS } from '../../constants';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetItemService } from './budget-item.service';
import { CurrentBudgetService } from './current-budget.service';

const mockParams = new Subject();

class MockRoutingService {
  getParams() {
    return mockParams;
  }

  getRouterState() {
    return of();
  }
}

class MockBudgetService {
  get() {
    return of();
  }
  loadBudget() {}
}

class MockBudgetFormService {}
class MockCurrentBudgetService {}

describe('BudgetItemService', () => {
  let service: BudgetItemService;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetItemService,
        { provide: CurrentBudgetService, useClass: MockCurrentBudgetService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetFormService, useClass: MockBudgetFormService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    });

    service = TestBed.inject(BudgetItemService);
    budgetService = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load()', () => {
    it('should load budget', () => {
      spyOn(budgetService, 'get').and.callThrough();
      service.load('123').subscribe();
      mockParams.next({ [ROUTE_PARAMS.budgetCode]: '123' });
      expect(budgetService.get).toHaveBeenCalledWith('123');
    });
  });
});
