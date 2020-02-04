import { COST_CENTER_ENTITIES, COST_CENTER_LIST } from '../organization-state';
import { CostCenter } from '../../../model/cost-center.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { CostCenterActions } from './index';

const costCenterCode = 'testCostCenterId';
const costCenter: CostCenter = {
  code: costCenterCode,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = 'pageSize=&currentPage=2&sort=';

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
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
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
          meta: StateEntityLoaderActions.entityFailMeta(
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            [costCenterCode]
          ),
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
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_LIST,
            query
          ),
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
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_LIST,
            query,
            {
              error,
            }
          ),
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_LIST,
            query
          ),
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
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
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
          meta: StateEntityLoaderActions.entityFailMeta(
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
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
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
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
          meta: StateEntityLoaderActions.entityFailMeta(
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
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });
  });
});
