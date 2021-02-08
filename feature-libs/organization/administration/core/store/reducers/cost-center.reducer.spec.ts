import { CostCenterActions } from '../actions/index';
import {
  costCenterAssignedBudgetsListReducer,
  costCentersInitialState,
  costCentersListReducer,
} from './cost-center.reducer';

describe('Cost Centers List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = costCentersListReducer(undefined, action);

      expect(state).toBe(costCentersInitialState);
    });
  });

  describe('LOAD_COST_CENTERS_SUCCESS action', () => {
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

      const action = new CostCenterActions.LoadCostCentersSuccess(payload);
      const result = costCentersListReducer(costCentersInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('Cost Center Assigned Budgets List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = costCenterAssignedBudgetsListReducer(undefined, action);

      expect(state).toBe(costCentersInitialState);
    });
  });

  describe('LOAD_ASSIGNED_BUDGETS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        costCenterCode: 'centerCode',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new CostCenterActions.LoadAssignedBudgetsSuccess(payload);
      const result = costCenterAssignedBudgetsListReducer(
        costCentersInitialState,
        action
      );

      expect(result).toEqual(payload.page);
    });
  });
});
