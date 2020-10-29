import {
  CostCenter,
  ListModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import {
  BUDGET_ENTITIES,
  COST_CENTER_ASSIGNED_BUDGETS,
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
} from '../organization-state';

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

export const LOAD_ASSIGNED_BUDGETS = '[CostCenter] Load Budgets';
export const LOAD_ASSIGNED_BUDGETS_SUCCESS =
  '[CostCenter] Load Budgets success';
export const LOAD_ASSIGNED_BUDGETS_FAIL = '[CostCenter] Load Budgets fail';

export const ASSIGN_BUDGET = '[CostCenter] Assign Budget';
export const ASSIGN_BUDGET_SUCCESS = '[CostCenter] Assign Budget success';
export const ASSIGN_BUDGET_FAIL = '[CostCenter] Assign Budget fail';

export const UNASSIGN_BUDGET = '[CostCenter] Unassign Budget';
export const UNASSIGN_BUDGET_SUCCESS = '[CostCenter] Unassign Budget success';
export const UNASSIGN_BUDGET_FAIL = '[CostCenter] Unassign Budget fail';

export class LoadCostCenter extends StateUtils.EntityLoadAction {
  readonly type = LOAD_COST_CENTER;
  constructor(public payload: { userId: string; costCenterCode: string }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode);
  }
}

export class LoadCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class LoadCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter | CostCenter[]) {
    super(
      COST_CENTER_ENTITIES,
      Array.isArray(payload)
        ? payload.map((costCenter) => costCenter?.code)
        : payload?.code
    );
  }
}

export class LoadCostCenters extends StateUtils.EntityLoadAction {
  readonly type = LOAD_COST_CENTERS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(COST_CENTER_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class LoadCostCentersFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_COST_CENTERS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(
      COST_CENTER_LIST,
      StateUtils.serializeSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadCostCentersSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_COST_CENTERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(COST_CENTER_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class CreateCostCenter extends StateUtils.EntityLoadAction {
  readonly type = CREATE_COST_CENTER;
  constructor(public payload: { userId: string; costCenter: CostCenter }) {
    super(COST_CENTER_ENTITIES, payload.costCenter.code);
  }
}

export class CreateCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class CreateCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter) {
    super(COST_CENTER_ENTITIES, payload.code, payload);
  }
}

export class UpdateCostCenter extends StateUtils.EntityLoadAction {
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

export class UpdateCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_COST_CENTER_FAIL;
  constructor(public payload: { costCenterCode: string; error: any }) {
    super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
  }
}

export class UpdateCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_COST_CENTER_SUCCESS;
  constructor(public payload: CostCenter) {
    super(COST_CENTER_ENTITIES, payload.code, payload);
  }
}

export class LoadAssignedBudgets extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ASSIGNED_BUDGETS;
  constructor(
    public payload: {
      userId: string;
      costCenterCode: string;
      params: SearchConfig;
    }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode)
    );
  }
}

export class LoadAssignedBudgetsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ASSIGNED_BUDGETS_FAIL;
  constructor(
    public payload: {
      costCenterCode: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode),
      payload.error
    );
  }
}

export class LoadAssignedBudgetsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ASSIGNED_BUDGETS_SUCCESS;
  constructor(
    public payload: {
      costCenterCode: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      COST_CENTER_ASSIGNED_BUDGETS,
      StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode)
    );
  }
}

export class AssignBudget extends StateUtils.EntityLoadAction {
  readonly type = ASSIGN_BUDGET;
  constructor(
    public payload: {
      userId: string;
      costCenterCode: string;
      budgetCode: string;
    }
  ) {
    super(BUDGET_ENTITIES, payload.budgetCode);
  }
}

export class AssignBudgetFail extends StateUtils.EntityFailAction {
  readonly type = ASSIGN_BUDGET_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
  }
}

export class AssignBudgetSuccess extends StateUtils.EntitySuccessAction {
  readonly type = ASSIGN_BUDGET_SUCCESS;
  constructor(public payload: { code: string; selected: boolean }) {
    super(BUDGET_ENTITIES, payload.code, payload);
  }
}

export class UnassignBudget extends StateUtils.EntityLoadAction {
  readonly type = UNASSIGN_BUDGET;
  constructor(
    public payload: {
      userId: string;
      costCenterCode: string;
      budgetCode: string;
    }
  ) {
    super(BUDGET_ENTITIES, payload.budgetCode);
  }
}

export class UnassignBudgetFail extends StateUtils.EntityFailAction {
  readonly type = UNASSIGN_BUDGET_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
  }
}

export class UnassignBudgetSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UNASSIGN_BUDGET_SUCCESS;
  constructor(public payload: { code: string; selected: boolean }) {
    super(BUDGET_ENTITIES, payload.code, payload);
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
  | LoadAssignedBudgetsFail
  | AssignBudget
  | AssignBudgetFail
  | AssignBudgetSuccess
  | UnassignBudget
  | UnassignBudgetFail
  | UnassignBudgetSuccess;
