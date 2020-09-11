import { CostCenter } from '../../../model/org-unit.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_COST_CENTERS } from '../user-state';
import { UserActions } from './index';

const userId = '123';
const mockCostCenters: CostCenter[] = [{ code: 'test' }];

describe('User Cost Centers Actions', () => {
  describe('LoadActiveCostCenters Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadActiveCostCenters(userId);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ACTIVE_COST_CENTERS,
        payload: userId,
        meta: StateUtils.loadMeta(USER_COST_CENTERS),
      });
    });
  });

  describe('LoadActiveCostCentersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadActiveCostCentersFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ACTIVE_COST_CENTERS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_COST_CENTERS, error),
      });
    });
  });

  describe('LoadActiveCostCentersSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadActiveCostCentersSuccess(
        mockCostCenters
      );
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ACTIVE_COST_CENTERS_SUCCESS,
        payload: mockCostCenters,
        meta: StateUtils.successMeta(USER_COST_CENTERS),
      });
    });
  });
});
