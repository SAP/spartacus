import { CostCenter } from '../../../model/org-unit.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_ACTIVE_COST_CENTERS = "[User] Load Active CostCenters";
export declare const LOAD_ACTIVE_COST_CENTERS_FAIL = "[User] Load Active CostCenters Fail";
export declare const LOAD_ACTIVE_COST_CENTERS_SUCCESS = "[User] Load Active CostCenters Success";
export declare class LoadActiveCostCenters extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load Active CostCenters";
    constructor(payload: string);
}
export declare class LoadActiveCostCentersFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load Active CostCenters Fail";
    constructor(payload: any);
}
export declare class LoadActiveCostCentersSuccess extends StateUtils.LoaderSuccessAction {
    payload: CostCenter[];
    readonly type = "[User] Load Active CostCenters Success";
    constructor(payload: CostCenter[]);
}
export type UserCostCenterAction = LoadActiveCostCenters | LoadActiveCostCentersFail | LoadActiveCostCentersSuccess;
