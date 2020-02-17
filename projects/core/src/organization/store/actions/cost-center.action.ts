import { CostCenter } from '../../../model/cost-center.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import {
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';

export const LOAD_COST_CENTER = '[CostCenter] Load CostCenter Data';
export const LOAD_COST_CENTER_FAIL = '[CostCenter] Load CostCenter Data Fail';
export const LOAD_COST_CENTER_SUCCESS =
  '[CostCenter] Load CostCenter Data Success';

export const LOAD_COST_CENTERS = '[CostCenter] Load CostCenters';
export const LOAD_COST_CENTERS_FAIL = '[CostCenter] Load CostCenters Fail';
export const LOAD_COST_CENTERS_SUCCESS =
  '[CostCenter] Load CostCenters Success';

export const CREATE_COST_CENTER = '[CostCenter] Create CostCenter';
export const CREATE_COST_CENTER_FAIL = '[CostCenter] Create CostCenter Fail';
export const CREATE_COST_CENTER_SUCCESS =
  '[CostCenter] Create CostCenter Success';

export const UPDATE_COST_CENTER = '[CostCenter] Update CostCenter';
export const UPDATE_COST_CENTER_FAIL = '[CostCenter] Update CostCenter Fail';
export const UPDATE_COST_CENTER_SUCCESS =
  '[CostCenter] Update CostCenter Success';

export const LOAD_ASSIGNED_BUDGETS = '[CostCenter] Load assigned Budgets';
export const LOAD_ASSIGNED_BUDGETS_SUCCESS =
  '[CostCenter] Load assigned Budgets success';
export const LOAD_ASSIGNED_BUDGETS_FAIL =
  '[CostCenter] Load assigned Budgets fail';

export class LoadCostCenter extends EntityLoadAction {
  readonly type = LOAD_COST_CENTER;
  constructor(public payload: { userId: string; costCenterCode: string }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode);
  }
}

export class LoadCostCenterFail extends EntityFailAction {
  readonly type = LOAD_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class LoadCostCenterSuccess extends EntitySuccessAction {
  readonly type = LOAD_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter[]) {
    super(COST_CENTER_ENTITIES, payload.map(costCenter => costCenter.code));
  }
}

export class LoadCostCenters extends EntityLoadAction {
  readonly type = LOAD_COST_CENTERS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(COST_CENTER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadCostCentersFail extends EntityFailAction {
  readonly type = LOAD_COST_CENTERS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      COST_CENTER_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadCostCentersSuccess extends EntitySuccessAction {
  readonly type = LOAD_COST_CENTERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(COST_CENTER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class CreateCostCenter extends EntityLoadAction {
  readonly type = CREATE_COST_CENTER;
  constructor(public payload: { userId: string; costCenter: CostCenter }) {
    super(COST_CENTER_ENTITIES, payload.costCenter.code);
  }
}

export class CreateCostCenterFail extends EntityFailAction {
  readonly type = CREATE_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class CreateCostCenterSuccess extends EntitySuccessAction {
  readonly type = CREATE_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter) {
    super(COST_CENTER_ENTITIES, payload.code, payload);
  }
}

export class UpdateCostCenter extends EntityLoadAction {
  readonly type = UPDATE_COST_CENTER;
  constructor(
    public payload: {
      userId: string;
      costCenterCode: string;
      costCenter: CostCenter;
    }
  ) {
    super(COST_CENTER_ENTITIES, payload.costCenter.code);
  }
}

export class UpdateCostCenterFail extends EntityFailAction {
  readonly type = UPDATE_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class UpdateCostCenterSuccess extends EntitySuccessAction {
  readonly type = UPDATE_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter) {
    super(COST_CENTER_ENTITIES, payload.code, payload);
  }
}

export class LoadAssignedBudgets extends EntityLoadAction {
  readonly type = LOAD_ASSIGNED_BUDGETS;
  constructor(
    public payload: {
      userId: string;
      code: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      serializeB2BSearchConfig(payload.params, payload.code)
    );
  }
}

export class LoadAssignedBudgetsFail extends EntityFailAction {
  readonly type = LOAD_ASSIGNED_BUDGETS_FAIL;
  constructor(
    public payload: { code: string; params: B2BSearchConfig; error: any }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      serializeB2BSearchConfig(payload.params, payload.code),
      payload.error
    );
  }
}

export class LoadAssignedBudgetsSuccess extends EntitySuccessAction {
  readonly type = LOAD_ASSIGNED_BUDGETS_SUCCESS;
  constructor(
    public payload: {
      code: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      serializeB2BSearchConfig(payload.params, payload.code)
    );
  }
}

export type CostCenterAction =
  | LoadCostCenter
  | LoadCostCenterFail
  | LoadCostCenterSuccess
  | LoadCostCenters
  | LoadCostCentersFail
  | LoadCostCentersSuccess
  | CreateCostCenter
  | CreateCostCenterFail
  | CreateCostCenterSuccess
  | UpdateCostCenter
  | UpdateCostCenterFail
  | UpdateCostCenterSuccess
  | LoadAssignedBudgets
  | LoadAssignedBudgetsSuccess
  | LoadAssignedBudgetsFail;
