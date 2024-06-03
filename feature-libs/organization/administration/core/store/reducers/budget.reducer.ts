/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ListModel, StateUtils } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import { BudgetActions, CostCenterActions } from '../actions/index';

export const budgetInitialState: Budget | undefined = undefined;
export const budgetsInitialState: ListModel | undefined = undefined;

export function budgetsEntitiesReducer(
  state = budgetInitialState,
  action: StateUtils.LoaderAction
): Budget | undefined {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGET_SUCCESS:
    case BudgetActions.CREATE_BUDGET_SUCCESS:
    case BudgetActions.UPDATE_BUDGET_SUCCESS:
      return action.payload;
    case CostCenterActions.UNASSIGN_BUDGET_SUCCESS:
    case CostCenterActions.ASSIGN_BUDGET_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
}

export function budgetsListReducer(
  state = budgetsInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case BudgetActions.LOAD_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
