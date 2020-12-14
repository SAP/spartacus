import { TestBed } from '@angular/core/testing';
import { SearchConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { CostCenterAdapter } from './cost-center.adapter';
import { CostCenterConnector } from './cost-center.connector';
import createSpy = jasmine.createSpy;

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
  load = createSpy('CostCenterAdapter.load').and.returnValue(of(costCenter));
  loadList = createSpy('CostCenterAdapter.loadList').and.returnValue(
    of([costCenter])
  );
  create = createSpy('CostCenterAdapter.create').and.returnValue(
    of(costCenter)
  );
  update = createSpy('CostCenterAdapter.update').and.returnValue(
    of(costCenter)
  );
  loadBudgets = createSpy('CostCenterAdapter.loadBudgets').and.returnValue(
    of([budget])
  );
  assignBudget = createSpy('CostCenterAdapter.assignBudget');
  unassignBudget = createSpy('CostCenterAdapter.unassignBudget');
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
