import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
} from '../../../model/org-unit.model';
import { StateUtils } from '../../../state/utils/index';
import {
  ORG_UNIT_APPROVAL_PROCESSES,
  ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
  ORG_UNIT_ENTITIES,
  ORG_UNIT_NODES,
  ORG_UNIT_NODE_LIST,
} from '../organization-state';
import { OrgUnitActions } from './index';

const orgUnitId = 'testOrgUnitId';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId };

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

const approvalProcesses: B2BApprovalProcess[] = [
  { code: 'testAprovalProcessCode', name: 'testAprovalProcessName' },
];

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
          meta: StateUtils.entityLoadMeta(ORG_UNIT_ENTITIES, orgUnitId),
        });
      });
    });

    describe('LoadOrgUnitFail', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitFail({ orgUnitId, error });

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_FAIL,
          payload: { orgUnitId, error },
          meta: StateUtils.entityFailMeta(ORG_UNIT_ENTITIES, orgUnitId, error),
        });
      });
    });

    describe('LoadOrgUnitSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_ORG_UNIT_SUCCESS,
          payload: [orgUnit],
          meta: StateUtils.entitySuccessMeta(ORG_UNIT_ENTITIES, [orgUnitId]),
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
          meta: StateUtils.entityLoadMeta(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES),
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
          meta: StateUtils.entityFailMeta(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES, {
            error,
          }),
        });
      });
    });

    describe('LoadOrgUnitNodesSuccess', () => {
      it('should create the action', () => {
        const action = new OrgUnitActions.LoadOrgUnitNodesSuccess(orgUnitList);

        expect({ ...action }).toEqual({
          type: OrgUnitActions.LOAD_UNIT_NODES_SUCCESS,
          payload: orgUnitList,
          meta: StateUtils.entitySuccessMeta(
            ORG_UNIT_NODE_LIST,
            ORG_UNIT_NODES
          ),
        });
      });
    });
  });

  describe('LoadApprovalProcesses Actions', () => {
    it('should execute LoadApprovalProcesses action', () => {
      const action = new OrgUnitActions.LoadApprovalProcesses({
        userId,
      });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES,
        payload: { userId },
        meta: StateUtils.entityLoadMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES
        ),
      });
    });

    it('should execute LoadApprovalProcessesFail action', () => {
      const action = new OrgUnitActions.LoadApprovalProcessesFail({ error });

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES_FAIL,
        payload: { error },
        meta: StateUtils.entityFailMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES,
          error
        ),
      });
    });

    it('should execute LoadApprovalProcessesSuccess action', () => {
      const action = new OrgUnitActions.LoadApprovalProcessesSuccess(
        approvalProcesses
      );

      expect({ ...action }).toEqual({
        type: OrgUnitActions.LOAD_APPROVAL_PROCESSES_SUCCESS,
        payload: approvalProcesses,
        meta: StateUtils.entitySuccessMeta(
          ORG_UNIT_APPROVAL_PROCESSES_ENTITIES,
          ORG_UNIT_APPROVAL_PROCESSES
        ),
      });
    });
  });
});
