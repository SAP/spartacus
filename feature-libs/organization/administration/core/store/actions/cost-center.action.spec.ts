import {
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
  BUDGET_ENTITIES,
} from '../organization-state';
import { CostCenter, StateUtils } from '@spartacus/core';
import { CostCenterActions } from './index';

const costCenterCode = 'testCostCenterId';
const budgetCode = 'testBudgetCode';
const costCenter: CostCenter = {
  code: costCenterCode,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [costCenterCode], pagination, sorts };

describe('CostCenter Actions', () => {
  describe('LoadCostCenter Actions', () => {
    describe('LoadCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenter({
          userId,
          costCenterCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER,
          payload: { userId, costCenterCode },
          meta: StateUtils.entityLoadMeta(COST_CENTER_ENTITIES, costCenterCode),
        });
      });
    });

    describe('LoadCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER_FAIL,
          payload: { costCenterCode, error },
          meta: StateUtils.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('LoadCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenterSuccess([
          costCenter,
        ]);

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER_SUCCESS,
          payload: [costCenter],
          meta: StateUtils.entitySuccessMeta(COST_CENTER_ENTITIES, [
            costCenterCode,
          ]),
        });
      });
    });
  });

  describe('LoadCostCenters Actions', () => {
    describe('LoadCostCenters', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenters({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(COST_CENTER_LIST, query),
        });
      });
    });

    describe('LoadCostCentersFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCentersFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(COST_CENTER_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadCostCentersSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCentersSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(COST_CENTER_LIST, query),
        });
      });
    });
  });

  describe('CreateCostCenter Actions', () => {
    describe('CreateCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenter({
          userId,
          costCenter,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER,
          payload: { userId, costCenter },
          meta: StateUtils.entityLoadMeta(COST_CENTER_ENTITIES, costCenterCode),
        });
      });
    });

    describe('CreateCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER_FAIL,
          payload: {
            costCenterCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('CreateCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenterSuccess(
          costCenter
        );

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER_SUCCESS,
          payload: costCenter,
          meta: StateUtils.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });
  });

  describe('UpdateCostCenter Actions', () => {
    describe('UpdateCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER,
          payload: { userId, costCenterCode, costCenter },
          meta: StateUtils.entityLoadMeta(COST_CENTER_ENTITIES, costCenterCode),
        });
      });
    });

    describe('UpdateCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER_FAIL,
          payload: {
            costCenterCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('UpdateCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenterSuccess(
          costCenter
        );

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER_SUCCESS,
          payload: costCenter,
          meta: StateUtils.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });
  });

  describe('LoadAssignedBudgets Actions', () => {
    describe('LoadAssignedBudgets', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgets({
          userId,
          costCenterCode,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS,
          payload: { userId, costCenterCode, params },
          meta: StateUtils.entityLoadMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query
          ),
        });
      });
    });

    describe('LoadAssignedBudgetsFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgetsFail({
          costCenterCode,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS_FAIL,
          payload: {
            costCenterCode,
            params,
            error,
          },
          meta: StateUtils.entityFailMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query,
            error
          ),
        });
      });
    });

    describe('LoadAssignedBudgetsSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgetsSuccess({
          costCenterCode,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS_SUCCESS,
          payload: {
            costCenterCode,
            page,
            params,
          },
          meta: StateUtils.entitySuccessMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query
          ),
        });
      });
    });
  });

  describe('AssignBudget Actions', () => {
    describe('AssignBudget', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudget({
          userId,
          costCenterCode,
          budgetCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET,
          payload: { userId, costCenterCode, budgetCode },
          meta: StateUtils.entityLoadMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });

    describe('AssignBudgetFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudgetFail({
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET_FAIL,
          payload: {
            budgetCode,
            error,
          },
          meta: StateUtils.entityFailMeta(BUDGET_ENTITIES, budgetCode, error),
        });
      });
    });

    describe('AssignBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudgetSuccess({
          code: budgetCode,
          selected: true,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET_SUCCESS,
          payload: { code: budgetCode, selected: true },
          meta: StateUtils.entitySuccessMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });
  });

  describe('UnassignBudget Actions', () => {
    describe('UnassignBudget', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudget({
          userId,
          costCenterCode,
          budgetCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET,
          payload: { userId, costCenterCode, budgetCode },
          meta: StateUtils.entityLoadMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });

    describe('UnassignBudgetFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudgetFail({
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET_FAIL,
          payload: {
            budgetCode,
            error,
          },
          meta: StateUtils.entityFailMeta(BUDGET_ENTITIES, budgetCode, error),
        });
      });
    });

    describe('UnassignBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudgetSuccess({
          code: budgetCode,
          selected: false,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET_SUCCESS,
          payload: { code: budgetCode, selected: false },
          meta: StateUtils.entitySuccessMeta(BUDGET_ENTITIES, budgetCode),
        });
      });
    });
  });
});
