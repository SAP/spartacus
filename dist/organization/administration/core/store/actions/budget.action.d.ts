import { ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
export declare const LOAD_BUDGET = "[Budget] Load Budget Data";
export declare const LOAD_BUDGET_FAIL = "[Budget] Load Budget Data Fail";
export declare const LOAD_BUDGET_SUCCESS = "[Budget] Load Budget Data Success";
export declare const LOAD_BUDGETS = "[Budget] Load Budgets";
export declare const LOAD_BUDGETS_FAIL = "[Budget] Load Budgets Fail";
export declare const LOAD_BUDGETS_SUCCESS = "[Budget] Load Budgets Success";
export declare const CREATE_BUDGET = "[Budget] Create Budget";
export declare const CREATE_BUDGET_FAIL = "[Budget] Create Budget Fail";
export declare const CREATE_BUDGET_SUCCESS = "[Budget] Create Budget Success";
export declare const UPDATE_BUDGET = "[Budget] Update Budget";
export declare const UPDATE_BUDGET_FAIL = "[Budget] Update Budget Fail";
export declare const UPDATE_BUDGET_SUCCESS = "[Budget] Update Budget Success";
export declare class LoadBudget extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        budgetCode: string;
    };
    readonly type = "[Budget] Load Budget Data";
    constructor(payload: {
        userId: string;
        budgetCode: string;
    });
}
export declare class LoadBudgetFail extends StateUtils.EntityFailAction {
    payload: {
        budgetCode: string;
        error: any;
    };
    readonly type = "[Budget] Load Budget Data Fail";
    constructor(payload: {
        budgetCode: string;
        error: any;
    });
}
export declare class LoadBudgetSuccess extends StateUtils.EntitySuccessAction {
    payload: Budget | Budget[];
    readonly type = "[Budget] Load Budget Data Success";
    constructor(payload: Budget | Budget[]);
}
export declare class LoadBudgets extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[Budget] Load Budgets";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadBudgetsFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[Budget] Load Budgets Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadBudgetsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[Budget] Load Budgets Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class CreateBudget extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        budget: Budget;
    };
    readonly type = "[Budget] Create Budget";
    constructor(payload: {
        userId: string;
        budget: Budget;
    });
}
export declare class CreateBudgetFail extends StateUtils.EntityFailAction {
    payload: {
        budgetCode: string;
        error: any;
    };
    readonly type = "[Budget] Create Budget Fail";
    constructor(payload: {
        budgetCode: string;
        error: any;
    });
}
export declare class CreateBudgetSuccess extends StateUtils.EntitySuccessAction {
    payload: Budget;
    readonly type = "[Budget] Create Budget Success";
    constructor(payload: Budget);
}
export declare class UpdateBudget extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        budgetCode: string;
        budget: Budget;
    };
    readonly type = "[Budget] Update Budget";
    constructor(payload: {
        userId: string;
        budgetCode: string;
        budget: Budget;
    });
}
export declare class UpdateBudgetFail extends StateUtils.EntityFailAction {
    payload: {
        budgetCode: string;
        error: any;
    };
    readonly type = "[Budget] Update Budget Fail";
    constructor(payload: {
        budgetCode: string;
        error: any;
    });
}
export declare class UpdateBudgetSuccess extends StateUtils.EntitySuccessAction {
    payload: Budget;
    readonly type = "[Budget] Update Budget Success";
    constructor(payload: Budget);
}
export type BudgetAction = LoadBudget | LoadBudgetFail | LoadBudgetSuccess | LoadBudgets | LoadBudgetsFail | LoadBudgetsSuccess | CreateBudget | CreateBudgetFail | CreateBudgetSuccess | UpdateBudget | UpdateBudgetFail | UpdateBudgetSuccess;
