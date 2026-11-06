import { CostCenter } from '../../../model/org-unit.model';
import { UserActions } from '../actions/index';
import * as fromUserCostCenterReducer from './user-cost-center.reducer';

describe('User Cost Centers Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserCostCenterReducer;
      const action = {} as UserActions.UserCostCenterAction;
      const state = fromUserCostCenterReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ACTIVE_COST_CENTERS_SUCCESS action', () => {
    it('should populate the user cost centers data', () => {
      const costCenters: CostCenter[] = [{ code: 'test' }];

      const { initialState } = fromUserCostCenterReducer;
      const action = new UserActions.LoadActiveCostCentersSuccess(costCenters);
      const state = fromUserCostCenterReducer.reducer(initialState, action);

      expect(state).toEqual(costCenters);
    });
  });

  describe('LOAD_ACTIVE_COST_CENTERS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserCostCenterReducer;
      const action = new UserActions.LoadActiveCostCentersFail({});
      const state = fromUserCostCenterReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
