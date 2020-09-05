import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { BudgetService } from '../../../core';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetItemService } from './budget-item.service';
import { CurrentBudgetService } from './current-budget.service';

class MockRoutingService {
  go() {}
}

class MockBudgetService {
  get() {
    return of();
  }
  loadBudget() {}
  update() {}
  create() {}
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

  it('should load budget', () => {
    spyOn(budgetService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(budgetService.get).toHaveBeenCalledWith('123');
  });

  it('should get budget from facade', () => {
    spyOn(budgetService, 'get').and.callThrough();
    service.load('123').subscribe();
    expect(budgetService.get).toHaveBeenCalledWith('123');
  });

  it('should load budget on each request', () => {
    spyOn(budgetService, 'loadBudget').and.callThrough();
    service.load('123').subscribe();
    expect(budgetService.loadBudget).toHaveBeenCalledWith('123');
  });

  it('should update existing budget', () => {
    spyOn(budgetService, 'update').and.callThrough();
    const form = new FormGroup({});
    form.addControl('name', new FormControl('foo bar'));
    service.save(form, 'existingCode');
    expect(budgetService.update).toHaveBeenCalledWith('existingCode', {
      name: 'foo bar',
    });
  });

  it('should create new budget', () => {
    spyOn(budgetService, 'create').and.callThrough();
    const form = new FormGroup({});
    form.addControl('name', new FormControl('foo bar'));
    service.save(form);
    expect(budgetService.create).toHaveBeenCalledWith({
      name: 'foo bar',
    });
  });

  it('should launch budget detail route', () => {
    const routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    service.launchDetails({ name: 'foo bar' });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'budgetDetails',
      params: { name: 'foo bar' },
    });
  });
});
