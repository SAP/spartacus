import { MemoizedSelector } from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateUtils } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import { BudgetManagement, StateWithOrganization } from '../organization-state';
export declare const getBudgetManagementState: MemoizedSelector<StateWithOrganization, BudgetManagement>;
export declare const getBudgetsState: MemoizedSelector<StateWithOrganization, StateUtils.EntityLoaderState<Budget>>;
export declare const getBudget: (budgetCode: string) => MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<Budget>>;
export declare const getBudgetValue: (budgetCode: string) => MemoizedSelector<StateWithOrganization, Budget>;
export declare const getBudgetList: (params: SearchConfig) => MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<EntitiesModel<Budget>>>;
