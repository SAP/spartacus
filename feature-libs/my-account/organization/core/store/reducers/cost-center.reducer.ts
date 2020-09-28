import { CostCenter, StateUtils } from '@spartacus/core';
import { CostCenterActions } from '../actions/index';

export const costCenterInitialState = {};
export const costCentersInitialState = undefined;

export function costCentersEntitiesReducer(
  state: CostCenter = costCenterInitialState,
  action: StateUtils.LoaderAction
): CostCenter {
  switch (action.type) {
  }
  return state;
}

export function costCentersListReducer(
  state = costCentersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case CostCenterActions.LOAD_COST_CENTERS_SUCCESS:
      return action.payload.page;
  }
  return state;
}

export function costCenterAssignedBudgetsListReducer(
  state = costCentersInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case CostCenterActions.LOAD_ASSIGNED_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
