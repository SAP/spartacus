import {
  ORG_UNIT_NODE_LIST,
  ORG_UNIT_NODES,
  ORG_UNIT_ENTITIES,
} from '../organization-state';
import { B2BUnit, B2BUnitNode } from '../../../model/org-unit.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { OrgUnitActions } from './index';

const orgUnitId = 'testOrgUnitId';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId };

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

const userId = 'xxx@xxx.xxx';
const error = 'anError';

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

  describe('LoadOrgUnitNodes Actions', () => {
    describe('LoadOrgUnitNodes', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodes({
          userId,
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES,
          payload: { userId },
          meta: StateEntityLoaderActions.entityLoadMeta(
            ORG_UNIT_NODE_LIST,
            ORG_UNIT_NODES
          ),
        });
      });
    });

    describe('LoadOrgUnitNodesFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodesFail({
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES_FAIL,
          payload: { error: { error } },
          meta: StateEntityLoaderActions.entityFailMeta(
            ORG_UNIT_NODE_LIST,
            ORG_UNIT_NODES,
            {
              error,
            }
          ),
        });
      });
    });

    describe('LoadOrgUnitNodesSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodesSuccess(orgUnitList);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES_SUCCESS,
          payload: orgUnitList,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            ORG_UNIT_NODE_LIST,
            ORG_UNIT_NODES
          ),
        });
      });
    });
  });
});
