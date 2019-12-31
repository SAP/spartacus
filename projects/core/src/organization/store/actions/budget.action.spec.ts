import { BUDGET_FEATURE } from '../organization-state';
import { Budget } from '../../../model/budget.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { BudgetActions } from './index';

const budgetCode = 'testBudgetId';
const budget: Budget = {
  code: budgetCode,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';

// const params = {};

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
          meta: StateEntityLoaderActions.entityLoadMeta(
            BUDGET_FEATURE,
            budgetCode
          ),
        });
      });
    });

    describe('LoadBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetFail(budgetCode, error);

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGET_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            BUDGET_FEATURE,
            budgetCode,
            error
          ),
        });
      });
    });

    describe('LoadBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.LoadBudgetSuccess([budget]);

        expect({ ...action }).toEqual({
          type: BudgetActions.LOAD_BUDGET_SUCCESS,
          payload: [budget],
          meta: StateEntityLoaderActions.entitySuccessMeta(BUDGET_FEATURE, [
            budgetCode,
          ]),
        });
      });
    });
  });

  describe('LoadBudgets Actions', () => {
    // describe('LoadBudgets', () => {
    //   it('should create the action', () => {
    //     const action = new BudgetActions.LoadBudgets({
    //       userId,
    //       params,
    //     });
    //
    //     expect({ ...action }).toEqual({
    //       type: BudgetActions.LOAD_BUDGETS,
    //       payload: { userId, params },
    //       meta: StateEntityLoaderActions.entityLoadMeta(
    //         PROCESS_FEATURE,
    //         LOAD_BUDGETS_PROCESS_ID
    //       ),
    //     });
    //   });
    // });
    //
    // describe('LoadBudgetsFail', () => {
    //   it('should create the action', () => {
    //     const action = new BudgetActions.LoadBudgetsFail(error);
    //
    //     expect({ ...action }).toEqual({
    //       type: BudgetActions.LOAD_BUDGETS_FAIL,
    //       payload: error,
    //       meta: StateEntityLoaderActions.entityFailMeta(
    //         PROCESS_FEATURE,
    //         LOAD_BUDGETS_PROCESS_ID,
    //         error
    //       ),
    //     });
    //   });
    // });
    //
    // describe('LoadBudgetsSuccess', () => {
    //   it('should create the action', () => {
    //     const action = new BudgetActions.LoadBudgetsSuccess(params);
    //
    //     expect({ ...action }).toEqual({
    //       type: BudgetActions.LOAD_BUDGETS_SUCCESS,
    //       payload: undefined,
    //       meta: StateEntityLoaderActions.entitySuccessMeta(
    //         PROCESS_FEATURE,
    //         LOAD_BUDGETS_PROCESS_ID
    //       ),
    //     });
    //   });
    // });
  });

  describe('CreateBudget Actions', () => {
    describe('CreateBudget', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudget({ userId, budget });

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET,
          payload: { userId, budget },
          meta: StateEntityLoaderActions.entityLoadMeta(
            BUDGET_FEATURE,
            budgetCode
          ),
        });
      });
    });

    describe('CreateBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudgetFail(budgetCode, error);

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            BUDGET_FEATURE,
            budgetCode,
            error
          ),
        });
      });
    });

    describe('CreateBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.CreateBudgetSuccess(budget);

        expect({ ...action }).toEqual({
          type: BudgetActions.CREATE_BUDGET_SUCCESS,
          payload: budget,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            BUDGET_FEATURE,
            budgetCode
          ),
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
          meta: StateEntityLoaderActions.entityLoadMeta(
            BUDGET_FEATURE,
            budgetCode,
          ),
        });
      });
    });

    describe('UpdateBudgetFail', () => {
      it('should create the action', () => {
        const action = new BudgetActions.UpdateBudgetFail(budgetCode, error);

        expect({ ...action }).toEqual({
          type: BudgetActions.UPDATE_BUDGET_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            BUDGET_FEATURE,
            budgetCode,
            error
          ),
        });
      });
    });

    describe('UpdateBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new BudgetActions.UpdateBudgetSuccess(budget);

        expect({ ...action }).toEqual({
          type: BudgetActions.UPDATE_BUDGET_SUCCESS,
          payload: budget,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            BUDGET_FEATURE,
            budgetCode
          ),
        });
      });
    });
  });
});
