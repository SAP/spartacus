import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SearchConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { CostCenterAdapter } from './cost-center.adapter';
import { CostCenterConnector } from './cost-center.connector';

const userId = 'userId';
const costCenterCode = 'costCenterCode';

const costCenter = {
  code: costCenterCode,
};

const budgetCode = 'budgetCode';
const budget = {
  code: budgetCode,
};

class MockCostCenterAdapter implements CostCenterAdapter {
  load = vi.fn().mockReturnValue(of(costCenter));
  loadList = vi.fn().mockReturnValue(of([costCenter]));
  create = vi.fn().mockReturnValue(of(costCenter));
  update = vi.fn().mockReturnValue(of(costCenter));
  loadBudgets = vi.fn().mockReturnValue(of([budget]));
  assignBudget = vi.fn();
  unassignBudget = vi.fn();
}

describe('CostCenterConnector', () => {
  let service: CostCenterConnector;
  let adapter: CostCenterAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CostCenterConnector,
        { provide: CostCenterAdapter, useClass: MockCostCenterAdapter },
      ],
    });

    service = TestBed.inject(CostCenterConnector);
    adapter = TestBed.inject(CostCenterAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load costCenter', () => {
    service.get(userId, costCenterCode);
    expect(adapter.load).toHaveBeenCalledWith(userId, costCenterCode);
  });

  it('should load costCenters', () => {
    const params: SearchConfig = { sort: 'code' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should create costCenter', () => {
    service.create(userId, costCenter);
    expect(adapter.create).toHaveBeenCalledWith(userId, costCenter);
  });

  it('should update costCenter', () => {
    service.update(userId, costCenterCode, costCenter);
    expect(adapter.update).toHaveBeenCalledWith(
      userId,
      costCenterCode,
      costCenter
    );
  });

  it('should load budgets assigned to costCenter', () => {
    const params: SearchConfig = { sort: 'code' };
    service.getBudgets(userId, costCenterCode, params);
    expect(adapter.loadBudgets).toHaveBeenCalledWith(
      userId,
      costCenterCode,
      params
    );
  });

  it('should assign budget to costCenter', () => {
    service.assignBudget(userId, costCenterCode, budgetCode);
    expect(adapter.assignBudget).toHaveBeenCalledWith(
      userId,
      costCenterCode,
      budgetCode
    );
  });

  it('should unassign budget from costCenter', () => {
    service.unassignBudget(userId, costCenterCode, budgetCode);
    expect(adapter.unassignBudget).toHaveBeenCalledWith(
      userId,
      costCenterCode,
      budgetCode
    );
  });
});
