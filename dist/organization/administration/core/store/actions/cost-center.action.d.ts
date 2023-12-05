import { CostCenter, ListModel, SearchConfig, StateUtils } from '@spartacus/core';
export declare const LOAD_COST_CENTER = "[CostCenter] Load CostCenter Data";
export declare const LOAD_COST_CENTER_FAIL = "[CostCenter] Load CostCenter Data Fail";
export declare const LOAD_COST_CENTER_SUCCESS = "[CostCenter] Load CostCenter Data Success";
export declare const LOAD_COST_CENTERS = "[CostCenter] Load CostCenters";
export declare const LOAD_COST_CENTERS_FAIL = "[CostCenter] Load CostCenters Fail";
export declare const LOAD_COST_CENTERS_SUCCESS = "[CostCenter] Load CostCenters Success";
export declare const CREATE_COST_CENTER = "[CostCenter] Create CostCenter";
export declare const CREATE_COST_CENTER_FAIL = "[CostCenter] Create CostCenter Fail";
export declare const CREATE_COST_CENTER_SUCCESS = "[CostCenter] Create CostCenter Success";
export declare const UPDATE_COST_CENTER = "[CostCenter] Update CostCenter";
export declare const UPDATE_COST_CENTER_FAIL = "[CostCenter] Update CostCenter Fail";
export declare const UPDATE_COST_CENTER_SUCCESS = "[CostCenter] Update CostCenter Success";
export declare const LOAD_ASSIGNED_BUDGETS = "[CostCenter] Load Budgets";
export declare const LOAD_ASSIGNED_BUDGETS_SUCCESS = "[CostCenter] Load Budgets success";
export declare const LOAD_ASSIGNED_BUDGETS_FAIL = "[CostCenter] Load Budgets fail";
export declare const ASSIGN_BUDGET = "[CostCenter] Assign Budget";
export declare const ASSIGN_BUDGET_SUCCESS = "[CostCenter] Assign Budget success";
export declare const ASSIGN_BUDGET_FAIL = "[CostCenter] Assign Budget fail";
export declare const UNASSIGN_BUDGET = "[CostCenter] Unassign Budget";
export declare const UNASSIGN_BUDGET_SUCCESS = "[CostCenter] Unassign Budget success";
export declare const UNASSIGN_BUDGET_FAIL = "[CostCenter] Unassign Budget fail";
export declare class LoadCostCenter extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenterCode: string;
    };
    readonly type = "[CostCenter] Load CostCenter Data";
    constructor(payload: {
        userId: string;
        costCenterCode: string;
    });
}
export declare class LoadCostCenterFail extends StateUtils.EntityFailAction {
    payload: {
        costCenterCode: string;
        error: any;
    };
    readonly type = "[CostCenter] Load CostCenter Data Fail";
    constructor(payload: {
        costCenterCode: string;
        error: any;
    });
}
export declare class LoadCostCenterSuccess extends StateUtils.EntitySuccessAction {
    payload: CostCenter | CostCenter[];
    readonly type = "[CostCenter] Load CostCenter Data Success";
    constructor(payload: CostCenter | CostCenter[]);
}
export declare class LoadCostCenters extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[CostCenter] Load CostCenters";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadCostCentersFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[CostCenter] Load CostCenters Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadCostCentersSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[CostCenter] Load CostCenters Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class CreateCostCenter extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenter: CostCenter;
    };
    readonly type = "[CostCenter] Create CostCenter";
    constructor(payload: {
        userId: string;
        costCenter: CostCenter;
    });
}
export declare class CreateCostCenterFail extends StateUtils.EntityFailAction {
    payload: {
        costCenterCode: string;
        error: any;
    };
    readonly type = "[CostCenter] Create CostCenter Fail";
    constructor(payload: {
        costCenterCode: string;
        error: any;
    });
}
export declare class CreateCostCenterSuccess extends StateUtils.EntitySuccessAction {
    payload: CostCenter;
    readonly type = "[CostCenter] Create CostCenter Success";
    constructor(payload: CostCenter);
}
export declare class UpdateCostCenter extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenterCode: string;
        costCenter: CostCenter;
    };
    readonly type = "[CostCenter] Update CostCenter";
    constructor(payload: {
        userId: string;
        costCenterCode: string;
        costCenter: CostCenter;
    });
}
export declare class UpdateCostCenterFail extends StateUtils.EntityFailAction {
    payload: {
        costCenterCode: string;
        error: any;
    };
    readonly type = "[CostCenter] Update CostCenter Fail";
    constructor(payload: {
        costCenterCode: string;
        error: any;
    });
}
export declare class UpdateCostCenterSuccess extends StateUtils.EntitySuccessAction {
    payload: CostCenter;
    readonly type = "[CostCenter] Update CostCenter Success";
    constructor(payload: CostCenter);
}
export declare class LoadAssignedBudgets extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenterCode: string;
        params: SearchConfig;
    };
    readonly type = "[CostCenter] Load Budgets";
    constructor(payload: {
        userId: string;
        costCenterCode: string;
        params: SearchConfig;
    });
}
export declare class LoadAssignedBudgetsFail extends StateUtils.EntityFailAction {
    payload: {
        costCenterCode: string;
        params: SearchConfig;
        error: any;
    };
    readonly type = "[CostCenter] Load Budgets fail";
    constructor(payload: {
        costCenterCode: string;
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadAssignedBudgetsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        costCenterCode: string;
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[CostCenter] Load Budgets success";
    constructor(payload: {
        costCenterCode: string;
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class AssignBudget extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenterCode: string;
        budgetCode: string;
    };
    readonly type = "[CostCenter] Assign Budget";
    constructor(payload: {
        userId: string;
        costCenterCode: string;
        budgetCode: string;
    });
}
export declare class AssignBudgetFail extends StateUtils.EntityFailAction {
    payload: {
        budgetCode: string;
        error: any;
    };
    readonly type = "[CostCenter] Assign Budget fail";
    constructor(payload: {
        budgetCode: string;
        error: any;
    });
}
export declare class AssignBudgetSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        code: string;
        selected: boolean;
    };
    readonly type = "[CostCenter] Assign Budget success";
    constructor(payload: {
        code: string;
        selected: boolean;
    });
}
export declare class UnassignBudget extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        costCenterCode: string;
        budgetCode: string;
    };
    readonly type = "[CostCenter] Unassign Budget";
    constructor(payload: {
        userId: string;
        costCenterCode: string;
        budgetCode: string;
    });
}
export declare class UnassignBudgetFail extends StateUtils.EntityFailAction {
    payload: {
        budgetCode: string;
        error: any;
    };
    readonly type = "[CostCenter] Unassign Budget fail";
    constructor(payload: {
        budgetCode: string;
        error: any;
    });
}
export declare class UnassignBudgetSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        code: string;
        selected: boolean;
    };
    readonly type = "[CostCenter] Unassign Budget success";
    constructor(payload: {
        code: string;
        selected: boolean;
    });
}
export type CostCenterAction = LoadCostCenter | LoadCostCenterFail | LoadCostCenterSuccess | LoadCostCenters | LoadCostCentersFail | LoadCostCentersSuccess | CreateCostCenter | CreateCostCenterFail | CreateCostCenterSuccess | UpdateCostCenter | UpdateCostCenterFail | UpdateCostCenterSuccess | LoadAssignedBudgets | LoadAssignedBudgetsSuccess | LoadAssignedBudgetsFail | AssignBudget | AssignBudgetFail | AssignBudgetSuccess | UnassignBudget | UnassignBudgetFail | UnassignBudgetSuccess;
