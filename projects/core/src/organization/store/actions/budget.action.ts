import { StateEntityLoaderActions } from '../../../state/utils/index';
import { BUDGET, BUDGETS, ORGANIZATION_FEATURE } from '../organization-state';

import { Budget } from '../../../model/budget.model';

export const LOAD_BUDGET = '[Budget] Load Budget Data';
export const LOAD_BUDGET_FAIL = '[Budget] Load Budget Data Fail';
export const LOAD_BUDGET_SUCCESS = '[Budget] Load Budget Data Success';

export const LOAD_BUDGETS = '[Budget] Load Budgets';
export const LOAD_BUDGETS_FAIL = '[Budget] Load Budgets Fail';
export const LOAD_BUDGETS_SUCCESS = '[Budget] Load Budgets Success';

export class LoadBudget extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_BUDGET;
  constructor(public payload: {uid: string, budgetCode: string}) {
    super(ORGANIZATION_FEATURE, BUDGET);
  }
}

export class LoadBudgetFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_BUDGET_FAIL;
  constructor(public payload: any) {
    super(ORGANIZATION_FEATURE, BUDGET, payload);
  }
}

export class LoadBudgetSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_BUDGET_SUCCESS;
  constructor(public payload: Budget) {
    super(ORGANIZATION_FEATURE, BUDGET, payload);
  }
}

export class LoadBudgets extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_BUDGETS;
  constructor(public payload: string) {
    super(ORGANIZATION_FEATURE, BUDGETS);
  }
}

export class LoadBudgetsFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_BUDGETS_FAIL;
  constructor(public payload: any) {
    super(ORGANIZATION_FEATURE, BUDGETS, payload);
  }
}

export class LoadBudgetsSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_BUDGETS_SUCCESS;
  constructor(public payload: Budget[]) {
    super(ORGANIZATION_FEATURE, BUDGETS, payload);
  }
}

export type BudgetAction =
  | LoadBudget
  | LoadBudgetFail
  | LoadBudgetSuccess
  | LoadBudgets
  | LoadBudgetsFail
  | LoadBudgetsSuccess;
