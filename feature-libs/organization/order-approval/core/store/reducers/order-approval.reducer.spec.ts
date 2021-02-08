import { OrderApproval } from '../../model/index';
import { OrderApprovalActions } from '../actions/index';
import {
  orderApprovalInitialState,
  orderApprovalsEntitiesReducer,
  orderApprovalsInitialState,
  orderApprovalsListReducer,
} from './order-approval.reducer';

describe('Order Approvals Entities Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = orderApprovalsEntitiesReducer(undefined, action);

      expect(state).toBe(orderApprovalInitialState);
    });
  });

  describe('LOAD_ORDER_APPROVAL_SUCCESS action', () => {
    it('should return the payload', () => {
      const payload: OrderApproval = {
        code: 'orderApproval',
      };

      const action = new OrderApprovalActions.LoadOrderApprovalSuccess(payload);
      const result = orderApprovalsEntitiesReducer(
        orderApprovalInitialState,
        action
      );

      expect(result).toEqual(payload);
    });
  });

  describe('MAKE_DECISION_SUCCESS action', () => {
    it('should return the state', () => {
      const payload = {
        orderApprovalCode: 'orderApproval',
        orderApprovalDecision: null,
      };

      const action = new OrderApprovalActions.MakeDecisionSuccess(payload);
      const result = orderApprovalsEntitiesReducer(
        orderApprovalInitialState,
        action
      );

      expect(result).toEqual(orderApprovalInitialState);
    });
  });
});

describe('Order Approvals List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = orderApprovalsListReducer(undefined, action);

      expect(state).toBe(orderApprovalsInitialState);
    });
  });

  describe('LOAD_ORDER_APPROVALS_SUCCESS action', () => {
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

      const action = new OrderApprovalActions.LoadOrderApprovalsSuccess(
        payload
      );
      const result = orderApprovalsListReducer(
        orderApprovalsInitialState,
        action
      );

      expect(result).toEqual(payload.page);
    });
  });
});
