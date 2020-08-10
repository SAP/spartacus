import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { BudgetActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  BudgetManagement,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { BudgetSelectors } from '../selectors/index';
import { Budget } from '../../model/budget.model';

describe('Budget Selectors', () => {
  let store: Store<StateWithOrganization>;

  const code = 'testCode';
  const budget: Budget = {
    code,
    name: 'testBudget',
  };
  const budget2: Budget = {
    code: 'testCode2',
    name: 'testBudget2',
  };

  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: budget,
    },
    testCode2: {
      loading: false,
      error: false,
      success: true,
      value: budget2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getBudgetManagementState ', () => {
    it('should return budgets state', () => {
      let result: BudgetManagement;
      store
        .pipe(select(BudgetSelectors.getBudgetManagementState))
        .subscribe((value) => (result = value));

      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
      });
    });
  });

  describe('getBudgets', () => {
    it('should return budgets', () => {
      let result: StateUtils.EntityLoaderState<Budget>;
      store
        .pipe(select(BudgetSelectors.getBudgetsState))
        .subscribe((value) => (result = value));

      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      expect(result).toEqual({ entities });
    });
  });

  describe('getBudget', () => {
    it('should return budget by id', () => {
      let result: StateUtils.LoaderState<Budget>;
      store
        .pipe(select(BudgetSelectors.getBudget(code)))
        .subscribe((value) => (result = value));

      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget, budget2]));
      expect(result).toEqual(entities.testCode);
    });
  });
});
