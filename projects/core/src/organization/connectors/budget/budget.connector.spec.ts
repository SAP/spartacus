import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { BudgetAdapter } from './budget.adapter';
import { BudgetConnector } from './budget.connector';
import createSpy = jasmine.createSpy;

const userId = 'userId';
const budgetCode = 'budgetCode';

const budget = {
  code: budgetCode
};

class MockBudgetAdapter implements BudgetAdapter {
  load = createSpy('BudgetAdapter.load').and.callFake(() =>
    of(budget)
  );
  loadList = createSpy('BudgetAdapter.loadList').and.callFake(() =>
    of([budget])
  );
  create = createSpy('BudgetAdapter.create').and.callFake(() =>
    of(budget)
  );
  update = createSpy('BudgetAdapter.update').and.callFake(() =>
    of(budget)
  );
}

describe('BudgetConnector', () => {
  let service: BudgetConnector;
  let adapter: BudgetAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BudgetAdapter, useClass: MockBudgetAdapter }],
    });

    service = TestBed.get(BudgetConnector as Type<BudgetConnector>);
    adapter = TestBed.get(BudgetAdapter as Type<BudgetAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load budget', () => {
    service.get(userId, budgetCode);
    expect(adapter.load).toHaveBeenCalledWith(userId, budgetCode);
  });

  it('should load budgets', () => {
    service.getList(userId);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, undefined);
  });

  it('should create budget', () => {
    service.create(userId, budget);
    expect(adapter.create).toHaveBeenCalledWith(userId, budget);
  });

  it('should update budget', () => {
    service.update(userId, budget);
    expect(adapter.update).toHaveBeenCalledWith(userId, budget);
  });
});
