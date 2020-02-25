import { CostCenter } from '../../../model/cost-center.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import * as CostCenterActions from '../actions/cost-center.action';

export const costCenterInitialState = {};
export const costCentersInitialState = undefined;

export function costCentersEntitiesReducer(
  state: CostCenter = costCenterInitialState,
  action: LoaderAction
): CostCenter {
  switch (action.type) {
  }
  return state;
}

export function costCentersListReducer(
  state = costCentersInitialState,
  action: LoaderAction
): any {
  switch (action.type) {
    case CostCenterActions.LOAD_COST_CENTERS_SUCCESS:
    case CostCenterActions.LOAD_ASSIGNED_BUDGETS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
