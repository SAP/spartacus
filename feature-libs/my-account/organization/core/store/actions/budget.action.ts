import { StateUtils, ListModel } from '@spartacus/core';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import { BUDGET_ENTITIES, BUDGET_LIST } from '../organization-state';
import { B2BSearchConfig } from '../../model/search-config';
import { Budget } from '../../model/budget.model';

export const LOAD_BUDGET = '[Budget] Load Budget Data';
export const LOAD_BUDGET_FAIL = '[Budget] Load Budget Data Fail';
export const LOAD_BUDGET_SUCCESS = '[Budget] Load Budget Data Success';

export const LOAD_BUDGETS = '[Budget] Load Budgets';
export const LOAD_BUDGETS_FAIL = '[Budget] Load Budgets Fail';
export const LOAD_BUDGETS_SUCCESS = '[Budget] Load Budgets Success';

export const CREATE_BUDGET = '[Budget] Create Budget';
export const CREATE_BUDGET_FAIL = '[Budget] Create Budget Fail';
export const CREATE_BUDGET_SUCCESS = '[Budget] Create Budget Success';

export const UPDATE_BUDGET = '[Budget] Update Budget';
export const UPDATE_BUDGET_FAIL = '[Budget] Update Budget Fail';
export const UPDATE_BUDGET_SUCCESS = '[Budget] Update Budget Success';

export class LoadBudget extends StateUtils.EntityLoadAction {
  readonly type = LOAD_BUDGET;
  constructor(public payload: { userId: string; budgetCode: string }) {
    super(BUDGET_ENTITIES, payload.budgetCode);
  }
}

export class LoadBudgetFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_BUDGET_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
  }
}

export class LoadBudgetSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_BUDGET_SUCCESS;
  constructor(public payload: Budget[]) {
    super(
      BUDGET_ENTITIES,
      payload.map((budget) => budget.code)
    );
  }
}

export class LoadBudgets extends StateUtils.EntityLoadAction {
  readonly type = LOAD_BUDGETS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(BUDGET_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadBudgetsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_BUDGETS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(BUDGET_LIST, serializeB2BSearchConfig(payload.params), payload.error);
  }
}

export class LoadBudgetsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_BUDGETS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(BUDGET_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class CreateBudget extends StateUtils.EntityLoadAction {
  readonly type = CREATE_BUDGET;
  constructor(public payload: { userId: string; budget: Budget }) {
    super(BUDGET_ENTITIES, payload.budget.code);
  }
}

export class CreateBudgetFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_BUDGET_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
  }
}

export class CreateBudgetSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_BUDGET_SUCCESS;
  constructor(public payload: Budget) {
    super(BUDGET_ENTITIES, payload.code, payload);
  }
}

export class UpdateBudget extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_BUDGET;
  constructor(
    public payload: { userId: string; budgetCode: string; budget: Budget }
  ) {
    super(BUDGET_ENTITIES, payload.budget.code);
  }
}

export class UpdateBudgetFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_BUDGET_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
  }
}

export class UpdateBudgetSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_BUDGET_SUCCESS;
  constructor(public payload: Budget) {
    super(BUDGET_ENTITIES, payload.code, payload);
  }
}

export type BudgetAction =
  | LoadBudget
  | LoadBudgetFail
  | LoadBudgetSuccess
  | LoadBudgets
  | LoadBudgetsFail
  | LoadBudgetsSuccess
  | CreateBudget
  | CreateBudgetFail
  | CreateBudgetSuccess
  | UpdateBudget
  | UpdateBudgetFail
  | UpdateBudgetSuccess;
