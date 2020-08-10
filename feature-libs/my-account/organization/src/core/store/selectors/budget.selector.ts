import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils, EntitiesModel } from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';
import { denormalizeB2BSearch } from '../../utils/serializer';
import {
  BudgetManagement,
  BUDGET_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { Budget } from '../../model/budget.model';

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

export const getBudgetList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Budget>>
> =>
  createSelector(getBudgetManagementState, (state: BudgetManagement) =>
    denormalizeB2BSearch<Budget>(state, params)
  );
