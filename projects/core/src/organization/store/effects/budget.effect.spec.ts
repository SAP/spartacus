import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { PageType } from '../../../model/cms.model';
import { Budget } from '../../../model/budget.model';
import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { RoutingService } from '../../../routing/facade/routing.service';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import * as fromEffects from './budget.effect';
import createSpy = jasmine.createSpy;

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}
const budgetCode = 'testCode';
const userId = 'testUser';
const budget: Budget = {
  code: 'testCode',
  active: false,
  budget: 2,
  currency: {},
  endDate: 'endDate',
  startDate: 'startDate',
  name: 'testName',
  orgUnit: { uid: 'ouid', name: 'ouName' },
  costCenters: [],
};

class MockBudgetConnector {
  get = createSpy().and.returnValue(of(budget));
  getList = createSpy().and.returnValue(of([budget]));
  create = createSpy().and.returnValue(of(budget));
  update = createSpy().and.returnValue(of(budget));
}

describe('Budget Effects', () => {
  let actions$: Observable<BudgetActions.BudgetAction>;
  let budgetConnector: BudgetConnector;
  let effects: fromEffects.BudgetEffects;

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
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    effects = TestBed.get(fromEffects.BudgetEffects as Type<
      fromEffects.BudgetEffects
    >);
    budgetConnector = TestBed.get(BudgetConnector as Type<BudgetConnector>);
  });

  describe('loadBudget$', () => {
    it('should return loadBudgetSuccess action', () => {
      const action = new BudgetActions.LoadBudget({ userId, budgetCode });
      const completion = new BudgetActions.LoadBudgetSuccess([budget]);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadBudget$).toBeObservable(expected);
      expect(budgetConnector.get).toHaveBeenCalledWith(userId, budgetCode);
    });

    it('should return LoadBudgetFail action if budget not loaded', () => {
      const error = 'error';
      budgetConnector.get = createSpy().and.returnValue(throwError(error));

      const action = new BudgetActions.LoadBudget({ userId, budgetCode });
      const completion = new BudgetActions.LoadBudgetFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadBudget$).toBeObservable(expected);
      expect(budgetConnector.get).toHaveBeenCalledWith(userId, budgetCode);
    });
  });

  describe('loadBudgets$', () => {
    it('should return loadBudgetSuccess action', () => {
      const action = new BudgetActions.LoadBudgets({ userId });
      const completion = new BudgetActions.LoadBudgetSuccess([budget]);
      const completion2 = new BudgetActions.LoadBudgetsSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion, c: completion2 });
      expect(effects.loadBudgets$).toBeObservable(expected);
      expect(budgetConnector.getList).toHaveBeenCalledWith(userId, undefined);
    });

    it('should return LoadBudgetsFail action if budgets not loaded', () => {
      const error = 'error';
      budgetConnector.getList = createSpy().and.returnValue(throwError(error));

      const action = new BudgetActions.LoadBudgets({ userId });
      const completion = new BudgetActions.LoadBudgetsFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadBudgets$).toBeObservable(expected);
      expect(budgetConnector.getList).toHaveBeenCalledWith(userId, undefined);
    });
  });

  describe('createBudget$', () => {
    it('should return CreateBudgetSuccess action', () => {
      const action = new BudgetActions.CreateBudget({ userId, budget });
      const completion = new BudgetActions.CreateBudgetSuccess(budget);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createBudget$).toBeObservable(expected);
      expect(budgetConnector.create).toHaveBeenCalledWith(userId, budget);
    });

    it('should return CreateBudgetFail action if budget not created', () => {
      const error = 'error';
      budgetConnector.create = createSpy().and.returnValue(throwError(error));

      const action = new BudgetActions.CreateBudget({ userId, budget });
      const completion = new BudgetActions.CreateBudgetFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createBudget$).toBeObservable(expected);
      expect(budgetConnector.create).toHaveBeenCalledWith(userId, budget);
    });
  });

  describe('updateBudget$', () => {
    it('should return UpdateBudgetSuccess action', () => {
      const action = new BudgetActions.UpdateBudget({ userId, budget });
      const completion = new BudgetActions.UpdateBudgetSuccess(budget);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateBudget$).toBeObservable(expected);
      expect(budgetConnector.update).toHaveBeenCalledWith(userId, budget);
    });

    it('should return UpdateBudgetFail action if budget not created', () => {
      const error = 'error';
      budgetConnector.update = createSpy().and.returnValue(throwError(error));

      const action = new BudgetActions.UpdateBudget({ userId, budget });
      const completion = new BudgetActions.UpdateBudgetFail(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateBudget$).toBeObservable(expected);
      expect(budgetConnector.update).toHaveBeenCalledWith(userId, budget);
    });
  });
});
