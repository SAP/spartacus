import {
  LOAD_BUDGETS_PROCESS_ID,
  BUDGETS_FEATURE,
} from '../organization-state';

import { Budget } from '../../../model/budget.model';
import {
  EntityLoadAction,
  EntityFailAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';

export const LOAD_BUDGET = '[Budget] Load Budget Data';
export const LOAD_BUDGET_FAIL = '[Budget] Load Budget Data Fail';
export const LOAD_BUDGET_SUCCESS = '[Budget] Load Budget Data Success';

export const LOAD_BUDGETS = '[Budget] Load Budgets';
export const LOAD_BUDGETS_FAIL = '[Budget] Load Budgets Fail';
export const LOAD_BUDGETS_SUCCESS = '[Budget] Load Budgets Success';

export class LoadBudget extends EntityLoadAction {
  readonly type = LOAD_BUDGET;
  constructor(public payload: { uid: string; budgetCode: string }) {
    super(BUDGETS_FEATURE, payload.budgetCode);
  }
}

export class LoadBudgetFail extends EntityFailAction {
  readonly type = LOAD_BUDGET_FAIL;
  constructor(public payload: any) {
    super(BUDGETS_FEATURE, payload.code, payload);
  }
}

export class LoadBudgetSuccess extends EntitySuccessAction {
  readonly type = LOAD_BUDGET_SUCCESS;
  constructor(public payload: Budget[]) {
    super(BUDGETS_FEATURE, payload.map(budget => budget.code), payload);
  }
}

export class LoadBudgets extends EntityLoadAction {
  readonly type = LOAD_BUDGETS;
  constructor(public payload: string) {
    super(BUDGETS_FEATURE, LOAD_BUDGETS_PROCESS_ID);
  }
}

export class LoadBudgetsFail extends EntityFailAction {
  readonly type = LOAD_BUDGETS_FAIL;
  constructor(public payload: any) {
    super(BUDGETS_FEATURE, LOAD_BUDGETS_PROCESS_ID, payload);
  }
}

export class LoadBudgetsSuccess extends EntitySuccessAction {
  readonly type = LOAD_BUDGETS_SUCCESS;
  constructor() {
    super(BUDGETS_FEATURE, LOAD_BUDGETS_PROCESS_ID );
  }
}

export type BudgetAction =
  | LoadBudget
  | LoadBudgetFail
  | LoadBudgetSuccess
  | LoadBudgets
  | LoadBudgetsFail
  | LoadBudgetsSuccess;
