import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Budget } from '../../../model/budget.model';
import { BudgetActions } from '../actions/index';
import {
  BUDGET_FEATURE,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { BudgetSelectors } from '../selectors/index';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithOrganization>;

  const code = 'testCode';
  const budget: Budget = {
    code,
    name: 'testBudget',
  };
  const state = {
    [ORGANIZATION_FEATURE]: {
      [BUDGET_FEATURE]: { entities: {} },
    },
  };

  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: budget,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(BUDGET_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getBudgetManagmentState', () => {
    it('should return budget by code', () => {
      let result: Budget[];
      store
        .pipe(select(BudgetSelectors.getBudgetManagmentState(state)))
        .subscribe(value => (result = value));

      store.dispatch(new BudgetActions.LoadBudgetSuccess([budget]));

      expect(result).toEqual([entities['testCode'].value]);
    });
  });
});
