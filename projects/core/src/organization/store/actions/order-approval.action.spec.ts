import {
  OrderApproval,
  OrderApprovalDecision,
} from '../../../model/order-approval.model';
import { StateUtils } from '../../../state/utils/index';
import {
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_LIST,
} from '../organization-state';
import { OrderApprovalActions } from './index';

const orderApprovalCode = 'testOrderApprovalId';
const orderApproval: OrderApproval = {
  code: orderApprovalCode,
};

const orderApprovalDecision: OrderApprovalDecision = {
  decision: 'APPROVE',
  comment: 'yeah',
};

const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [orderApprovalCode], pagination, sorts };

describe('OrderApproval Actions', () => {
  describe('LoadOrderApproval Actions', () => {
    describe('LoadOrderApproval', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApproval({
          userId,
          orderApprovalCode,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVAL,
          payload: { userId, orderApprovalCode },
          meta: StateUtils.entityLoadMeta(
            ORDER_APPROVAL_ENTITIES,
            orderApprovalCode
          ),
        });
      });
    });

    describe('LoadOrderApprovalFail', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApprovalFail({
          orderApprovalCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVAL_FAIL,
          payload: {
            orderApprovalCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            ORDER_APPROVAL_ENTITIES,
            orderApprovalCode,
            error
          ),
        });
      });
    });

    describe('LoadOrderApprovalSuccess', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApprovalSuccess([
          orderApproval,
        ]);

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVAL_SUCCESS,
          payload: [orderApproval],
          meta: StateUtils.entitySuccessMeta(ORDER_APPROVAL_ENTITIES, [
            orderApprovalCode,
          ]),
        });
      });
    });
  });

  describe('LoadOrderApprovals Actions', () => {
    describe('LoadOrderApprovals', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApprovals({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVALS,
          payload: { userId, params },
          meta: StateUtils.entityLoadMeta(ORDER_APPROVAL_LIST, query),
        });
      });
    });

    describe('LoadOrderApprovalsFail', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApprovalsFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVALS_FAIL,
          payload: { params, error: { error } },
          meta: StateUtils.entityFailMeta(ORDER_APPROVAL_LIST, query, {
            error,
          }),
        });
      });
    });

    describe('LoadOrderApprovalsSuccess', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.LoadOrderApprovalsSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.LOAD_ORDER_APPROVALS_SUCCESS,
          payload: { page, params },
          meta: StateUtils.entitySuccessMeta(ORDER_APPROVAL_LIST, query),
        });
      });
    });
  });

  describe('MakeDecision Actions', () => {
    describe('MakeDecision', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.MakeDecision({
          userId,
          orderApprovalCode,
          orderApprovalDecision,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.MAKE_DECISION,
          payload: { userId, orderApprovalCode, orderApprovalDecision },
          meta: StateUtils.entityLoadMeta(
            ORDER_APPROVAL_ENTITIES,
            orderApprovalCode
          ),
        });
      });
    });

    describe('MakeDecisionFail', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.MakeDecisionFail({
          orderApprovalCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.MAKE_DECISION_FAIL,
          payload: {
            orderApprovalCode,
            error,
          },
          meta: StateUtils.entityFailMeta(
            ORDER_APPROVAL_ENTITIES,
            orderApprovalCode,
            error
          ),
        });
      });
    });

    describe('MakeDecisionSuccess', () => {
      it('should create the action', () => {
        const action = new OrderApprovalActions.MakeDecisionSuccess(
          orderApprovalDecision
        );

        expect({ ...action }).toEqual({
          type: OrderApprovalActions.MAKE_DECISION_SUCCESS,
          payload: orderApprovalDecision,
          meta: StateUtils.entitySuccessMeta(ORDER_APPROVAL_ENTITIES, null),
        });
      });
    });
  });
});
