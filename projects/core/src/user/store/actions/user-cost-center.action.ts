import { CostCenter } from '../../../model/org-unit.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_COST_CENTERS } from '../user-state';

export const LOAD_ACTIVE_COST_CENTERS = '[User] Load Active CostCenters';
export const LOAD_ACTIVE_COST_CENTERS_FAIL =
  '[User] Load Active CostCenters Fail';
export const LOAD_ACTIVE_COST_CENTERS_SUCCESS =
  '[User] Load Active CostCenters Success';

export class LoadActiveCostCenters extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_ACTIVE_COST_CENTERS;
  constructor(public payload: string) {
    super(USER_COST_CENTERS);
  }
}

export class LoadActiveCostCentersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_ACTIVE_COST_CENTERS_FAIL;
  constructor(public payload: any) {
    super(USER_COST_CENTERS, payload);
  }
}

export class LoadActiveCostCentersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_ACTIVE_COST_CENTERS_SUCCESS;
  constructor(public payload: CostCenter[]) {
    super(USER_COST_CENTERS);
  }
}

export type UserCostCenterAction =
  | LoadActiveCostCenters
  | LoadActiveCostCentersFail
  | LoadActiveCostCentersSuccess;
