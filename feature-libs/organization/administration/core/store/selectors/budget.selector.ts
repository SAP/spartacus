import { createSelector, MemoizedSelector } from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateUtils } from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import {
  BUDGET_FEATURE,
  BudgetManagement,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getBudgetManagementState: MemoizedSelector<
  StateWithOrganization,
  BudgetManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[BUDGET_FEATURE]
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagementState,
  (state: BudgetManagement) => state && state.entities
);

export const getBudget = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<Budget>> =>
  createSelector(
    getBudgetsState,
    (state: StateUtils.EntityLoaderState<Budget>) =>
      StateUtils.entityLoaderStateSelector(state, budgetCode)
  );

export const getBudgetValue = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, Budget> => {
  return createSelector(getBudget(budgetCode), (budgetState) =>
    StateUtils.loaderValueSelector(budgetState)
  );
};

export const getBudgetList = (
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Budget>>
> =>
  createSelector(getBudgetManagementState, (state: BudgetManagement) =>
    StateUtils.denormalizeSearch<Budget>(state, params)
  );
