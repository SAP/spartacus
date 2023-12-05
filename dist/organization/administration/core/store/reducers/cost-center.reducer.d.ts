import { CostCenter, ListModel, StateUtils } from '@spartacus/core';
export declare const costCenterInitialState: CostCenter | undefined;
export declare const costCentersInitialState: ListModel | undefined;
export declare function costCentersEntitiesReducer(state: CostCenter | undefined, action: StateUtils.LoaderAction): CostCenter | undefined;
export declare function costCentersListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
export declare function costCenterAssignedBudgetsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
