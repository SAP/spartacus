import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { BudgetAdapter } from './budget.adapter';
import { BudgetConnector } from './budget.connector';
import createSpy = jasmine.createSpy;

class MockBudgetAdapter implements BudgetAdapter {
  load = createSpy('BudgetAdapter.load').and.callFake(code =>
    of('product' + code)
  );
  loadList = createSpy('BudgetAdapter.loadList').and.callFake(code =>
    of('product' + code)
  );
  create = createSpy('BudgetAdapter.create').and.callFake(code =>
    of('product' + code)
  );
  update = createSpy('BudgetAdapter.update').and.callFake(code =>
    of('product' + code)
  );
}

describe('BudgetConnector', () => {
  let service: BudgetConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BudgetAdapter, useClass: MockBudgetAdapter }],
    });

    service = TestBed.get(BudgetConnector as Type<BudgetConnector>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
