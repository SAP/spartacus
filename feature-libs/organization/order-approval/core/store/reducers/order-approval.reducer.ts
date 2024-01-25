/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ListModel, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import { OrderApprovalActions } from '../actions/index';

export const orderApprovalInitialState: OrderApproval | undefined = undefined;
export const orderApprovalsInitialState: ListModel | undefined = undefined;

export function orderApprovalsEntitiesReducer(
  state = orderApprovalInitialState,
  action: StateUtils.LoaderAction
): OrderApproval | undefined {
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
): ListModel | undefined {
  switch (action.type) {
    case OrderApprovalActions.LOAD_ORDER_APPROVALS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
