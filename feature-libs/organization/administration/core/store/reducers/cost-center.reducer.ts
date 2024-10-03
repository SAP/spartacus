/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CostCenter, ListModel, StateUtils } from '@spartacus/core';
import { CostCenterActions } from '../actions/index';

export const costCenterInitialState: CostCenter | undefined = undefined;
export const costCentersInitialState: ListModel | undefined = undefined;

export function costCentersEntitiesReducer(
  state = costCenterInitialState,
  action: StateUtils.LoaderAction
): CostCenter | undefined {
  switch (action.type) {
    case CostCenterActions.LOAD_COST_CENTER_SUCCESS:
    case CostCenterActions.CREATE_COST_CENTER_SUCCESS:
    case CostCenterActions.UPDATE_COST_CENTER_SUCCESS:
      return action.payload;
  }
  return state;
}

export function costCentersListReducer(
  state = costCentersInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case CostCenterActions.LOAD_COST_CENTERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function costCenterAssignedBudgetsListReducer(
  state = costCentersInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case CostCenterActions.LOAD_ASSIGNED_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
