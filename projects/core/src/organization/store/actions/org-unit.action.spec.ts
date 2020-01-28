import { ORG_UNIT_ENTITIES, ORG_UNIT_LIST } from '../organization-state';
import { B2BUnitNode } from '../../../model/org-unit.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { ALL } from '../../model/search-config';
import { OrgUnitActions } from './index';

const orgUnitId = 'testOrgUnitId';
const orgUnit: B2BUnitNode = {
  id: orgUnitId,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [orgUnitId], pagination, sorts };

describe('OrgUnit Actions', () => {
  describe('LoadOrgUnit Actions', () => {
    describe('LoadOrgUnit', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnit({
          userId,
          orgUnitId,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT,
          payload: { userId, orgUnitId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_ENTITIES,
            orgUnitId
          ),
        });
      });
    });

    describe('LoadOrgUnitFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitFail({ orgUnitId, error });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_FAIL,
          payload: { orgUnitId, error },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_ENTITIES,
            orgUnitId,
            error
          ),
        });
      });
    });

    describe('LoadOrgUnitSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_SUCCESS,
          payload: [orgUnit],
          meta: StateEntityLoaderActions.entitySuccessMeta(ORG_UNIT_ENTITIES, [
            orgUnitId,
          ]),
        });
      });
    });
  });

  describe('LoadOrgUnits Actions', () => {
    describe('LoadOrgUnits', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnits({
          userId,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNITS,
          payload: { userId },
          meta: StateEntityLoaderActions.entityLoadMeta(ORG_UNIT_LIST, ALL),
        });
      });
    });

    describe('LoadOrgUnitsFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitsFail({
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNITS_FAIL,
          payload: { error: { error } },
          meta: StateEntityLoaderActions.entityFailMeta(ORG_UNIT_LIST, ALL, {
            error,
          }),
        });
      });
    });

    describe('LoadOrgUnitsSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitsSuccess({
          page,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNITS_SUCCESS,
          payload: { page },
          meta: StateEntityLoaderActions.entitySuccessMeta(ORG_UNIT_LIST, ALL),
        });
      });
    });
  });
});
