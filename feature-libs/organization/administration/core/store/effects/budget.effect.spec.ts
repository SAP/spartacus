import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { normalizeHttpError, OccConfig, SearchConfig } from '@spartacus/core';
import {
  Budget,
  BudgetConnector,
  OrganizationActions,
} from '@spartacus/organization/administration/core';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';
import { defaultOccOrganizationConfig } from '../../../occ/config/default-occ-organization-config';
import { BudgetActions } from '../actions/index';
import * as fromEffects from './budget.effect';

import createSpy = jasmine.createSpy;

const httpErrorResponse = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});
const error = normalizeHttpError(httpErrorResponse);
const budgetCode = 'testCode';
const userId = 'testUser';
const budget: Budget = {
  code: budgetCode,
  active: false,
  budget: 2,
  currency: {},
  endDate: 'endDate',
  startDate: 'startDate',
  name: 'testName',
  orgUnit: { uid: 'ouid', name: 'ouName' },
  costCenters: [],
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];

class MockBudgetConnector {
  get = createSpy().and.returnValue(of(budget));
  getList = createSpy().and.returnValue(
    of({ values: [budget], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(budget));
  update = createSpy().and.returnValue(of(budget));
}

describe('Budget Effects', () => {
  let actions$: Observable<BudgetActions.BudgetAction>;
  let budgetConnector: BudgetConnector;
  let effects: fromEffects.BudgetEffects;
  let expected: TestColdObservable;

  const mockBudgetState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: budget },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ budget: () => mockBudgetState }),
      ],
      providers: [
        { provide: BudgetConnector, useClass: MockBudgetConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.BudgetEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.BudgetEffects);
    budgetConnector = TestBed.inject(BudgetConnector);
    expected = null;
  });

  describe('loadBudget$', () => {
    it('should return LoadBudgetSuccess action', () => {
      const action = new BudgetActions.LoadBudget({ userId, budgetCode });
      const completion = new BudgetActions.LoadBudgetSuccess([budget]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadBudget$).toBeObservable(expected);
      expect(budgetConnector.get).toHaveBeenCalledWith(userId, budgetCode);
    });

    it('should return LoadBudgetFail action if budget not updated', () => {
      budgetConnector.get = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new BudgetActions.LoadBudget({ userId, budgetCode });
      const completion = new BudgetActions.LoadBudgetFail({
        budgetCode,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadBudget$).toBeObservable(expected);
      expect(budgetConnector.get).toHaveBeenCalledWith(userId, budgetCode);
    });
  });

  describe('loadBudgets$', () => {
    const params: SearchConfig = { sort: 'code' };

    it('should return LoadBudgetSuccess action', () => {
      const action = new BudgetActions.LoadBudgets({ userId, params });
      const completion = new BudgetActions.LoadBudgetSuccess([budget]);
      const completion2 = new BudgetActions.LoadBudgetsSuccess({
        page: { ids: [budgetCode], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadBudgets$).toBeObservable(expected);
      expect(budgetConnector.getList).toHaveBeenCalledWith(userId, params);
    });

    it('should return LoadBudgetsFail action if budgets not loaded', () => {
      budgetConnector.getList = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new BudgetActions.LoadBudgets({ userId, params });
      const completion = new BudgetActions.LoadBudgetsFail({ error, params });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadBudgets$).toBeObservable(expected);
      expect(budgetConnector.getList).toHaveBeenCalledWith(userId, params);
    });
  });

  describe('createBudget$', () => {
    it('should return CreateBudgetSuccess action', () => {
      const action = new BudgetActions.CreateBudget({ userId, budget });
      const completion1 = new BudgetActions.CreateBudgetSuccess(budget);
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createBudget$).toBeObservable(expected);
      expect(budgetConnector.create).toHaveBeenCalledWith(userId, budget);
    });

    it('should return CreateBudgetFail action if budget not created', () => {
      budgetConnector.create = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new BudgetActions.CreateBudget({ userId, budget });
      const completion1 = new BudgetActions.CreateBudgetFail({
        budgetCode,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createBudget$).toBeObservable(expected);
      expect(budgetConnector.create).toHaveBeenCalledWith(userId, budget);
    });
  });

  describe('updateBudget$', () => {
    it('should return UpdateBudgetSuccess action', () => {
      const action = new BudgetActions.UpdateBudget({
        userId,
        budgetCode,
        budget,
      });
      const completion1 = new BudgetActions.UpdateBudgetSuccess(budget);
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updateBudget$).toBeObservable(expected);
      expect(budgetConnector.update).toHaveBeenCalledWith(
        userId,
        budgetCode,
        budget
      );
    });

    it('should return UpdateBudgetFail action if budget not created', () => {
      budgetConnector.update = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new BudgetActions.UpdateBudget({
        userId,
        budgetCode,
        budget,
      });
      const completion1 = new BudgetActions.UpdateBudgetFail({
        budgetCode,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updateBudget$).toBeObservable(expected);
      expect(budgetConnector.update).toHaveBeenCalledWith(
        userId,
        budgetCode,
        budget
      );
    });
  });
});
