import { ListModel, StateUtils } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
export declare const budgetInitialState: Budget | undefined;
export declare const budgetsInitialState: ListModel | undefined;
export declare function budgetsEntitiesReducer(state: Budget | undefined, action: StateUtils.LoaderAction): Budget | undefined;
export declare function budgetsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
