import { StateUtils } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { BUDGET_ENTITIES, BUDGET_LIST } from '../organization-state';
import { BudgetActions } from './index';

const budgetCode = 'testBudgetId';
const budget: Budget = {
  code: budgetCode,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [budgetCode], pagination, sorts };

describe('Budget Actions', () => {
  describe('LoadBudget Actions', () => {
    describe('LoadBudget', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudget({
          userId,
          budgetCode,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGET,
          payload: { userId, budgetCode },
          meta: StateUtils.entityLoadMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });

    describe('LoadBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetFail({ budgetCode, error });

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGET_FAIL,
          payload: { budgetCode, error },
          meta: StateUtils.entityFailMeta(BUDGET_ENTITIES, budgetCode, error),
        });
      });
    });

    describe('LoadBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetSuccess([budget]);

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGET_SUCCESS,
          payload: [budget],
          meta: StateUtils.entitySuccessMeta(BUDGET_ENTITIES, [budgetCode]),
        });
      });
    });
  });

  describe('LoadBudgets Actions', () => {
    describe('LoadBudgets', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgets({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGETS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(BUDGET_LIST, query),
        });
      });
    });

    describe('LoadBudgetsFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetsFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGETS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(BUDGET_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadBudgetsSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetsSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGETS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(BUDGET_LIST, query),
        });
      });
    });
  });

  describe('CreateBudget Actions', () => {
    describe('CreateBudget', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudget({ userId, budget });

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET,
          payload: { userId, budget },
          meta: StateUtils.entityLoadMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });

    describe('CreateBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudgetFail({
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET_FAIL,
          payload: {
            budgetCode,
            error,
          },
          meta: StateUtils.entityFailMeta(BUDGET_ENTITIES, budgetCode, error),
        });
      });
    });

    describe('CreateBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudgetSuccess(budget);

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET_SUCCESS,
          payload: budget,
          meta: StateUtils.entitySuccessMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });
  });

  describe('UpdateBudget Actions', () => {
    describe('UpdateBudget', () => {
      it('should create the action', () => {
        const action = new BudgetActions.UpdateBudget({
          userId,
          budgetCode,
          budget,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.UPDATE_BUDGET,
          payload: { userId, budgetCode, budget },
          meta: StateUtils.entityLoadMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });

    describe('UpdateBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.UpdateBudgetFail({
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: BudgetActions.UPDATE_BUDGET_FAIL,
          payload: {
            budgetCode,
            error,
          },
          meta: StateUtils.entityFailMeta(BUDGET_ENTITIES, budgetCode, error),
        });
      });
    });

    describe('UpdateBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.UpdateBudgetSuccess(budget);

        expect({ ...action }).toEqual({
          type: BudgetActions.UPDATE_BUDGET_SUCCESS,
          payload: budget,
          meta: StateUtils.entitySuccessMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });
  });
});
