import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { BudgetService } from '../../core';
import { ROUTE_PARAMS } from '../constants';
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
}

describe('CurrentBudgetService', () => {
  let service: CurrentBudgetService;
  let budgetService: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentBudgetService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    });

    service = TestBed.inject(CurrentBudgetService);
    budgetService = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('model$', () => {
    it('should load budget', () => {
      spyOn(budgetService, 'get').and.callThrough();
      service.item$.subscribe();
      mockParams.next({ [ROUTE_PARAMS.budgetCode]: '123' });
      expect(budgetService.get).toHaveBeenCalledWith('123');
    });

    it('should not load budget', () => {
      spyOn(budgetService, 'get').and.callThrough();
      service.item$.subscribe();
      mockParams.next({ foo: 'bar' });
      expect(budgetService.get).not.toHaveBeenCalled();
    });
  });
});
