import { BudgetActions, CostCenterActions } from '../actions/index';
import {
  budgetInitialState,
  budgetsInitialState,
  budgetsEntitiesReducer,
  budgetsListReducer,
} from './budget.reducer';
import { Budget } from '../../model/index';

const payloadBudget: Budget = {
  code: 'testCode',
  name: 'testBudget',
};

describe('Budget Entities Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = budgetsEntitiesReducer(undefined, action);

      expect(state).toBe(budgetInitialState);
    });
  });

  describe('LOAD_BUDGET_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new BudgetActions.LoadBudgetSuccess(payloadBudget);
      const result = budgetsEntitiesReducer(budgetInitialState, action);

      expect(result).toEqual(payloadBudget);
    });
  });

  describe('CREATE_BUDGET_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new BudgetActions.CreateBudgetSuccess(payloadBudget);
      const result = budgetsEntitiesReducer(budgetInitialState, action);

      expect(result).toEqual(payloadBudget);
    });
  });

  describe('UPDATE_BUDGET_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new BudgetActions.UpdateBudgetSuccess(payloadBudget);
      const result = budgetsEntitiesReducer(budgetInitialState, action);

      expect(result).toEqual(payloadBudget);
    });
  });

  describe('UNASSIGN_BUDGET_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          code: 'testCode',
          selected: true,
        };

        const action = new CostCenterActions.UnassignBudgetSuccess(payload);
        const result = budgetsEntitiesReducer(budgetInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          code: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadBudget,
          ...payload,
        };

        const action = new CostCenterActions.UnassignBudgetSuccess(payload);
        const result = budgetsEntitiesReducer(payloadBudget, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('ASSIGN_BUDGET_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          code: 'testCode',
          selected: true,
        };

        const action = new CostCenterActions.AssignBudgetSuccess(payload);
        const result = budgetsEntitiesReducer(budgetInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          code: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadBudget,
          ...payload,
        };

        const action = new CostCenterActions.AssignBudgetSuccess(payload);
        const result = budgetsEntitiesReducer(payloadBudget, action);

        expect(result).toEqual(expected);
      });
    });
  });
});

describe('Budget List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = budgetsListReducer(undefined, action);

      expect(state).toBe(budgetsInitialState);
    });
  });

  describe('LOAD_BUDGETS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new BudgetActions.LoadBudgetsSuccess(payload);
      const result = budgetsListReducer(budgetsInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});
