import { StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import { OrderApprovalActions } from '../actions/index';

export const orderApprovalInitialState = undefined;
export const orderApprovalsInitialState = undefined;

export function orderApprovalsEntitiesReducer(
  state: OrderApproval = orderApprovalInitialState,
  action: StateUtils.LoaderAction
): OrderApproval {
  switch (action.type) {
    case OrderApprovalActions.LOAD_ORDER_APPROVAL_SUCCESS:
      return action.payload;
    case OrderApprovalActions.MAKE_DECISION_SUCCESS:
      return state;
  }
  return state;
}

export function orderApprovalsListReducer(
  state = orderApprovalsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case OrderApprovalActions.LOAD_ORDER_APPROVALS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
