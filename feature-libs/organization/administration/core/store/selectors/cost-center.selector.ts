import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  CostCenter,
  EntitiesModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import { Budget } from '../../model/budget.model';
import {
  CostCenterManagement,
  COST_CENTER_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getBudgetsState } from './budget.selector';
import { getOrganizationState } from './feature.selector';

export const getCostCenterManagementState: MemoizedSelector<
  StateWithOrganization,
  CostCenterManagement
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[COST_CENTER_FEATURE]
);

export const getCostCentersState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<CostCenter>
> = createSelector(
  getCostCenterManagementState,
  (state: CostCenterManagement) => state && state.entities
);

export const getCostCenter = (
  costCenterCode: string
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<CostCenter>
> =>
  createSelector(
    getCostCentersState,
    (state: StateUtils.EntityLoaderState<CostCenter>) =>
      StateUtils.entityLoaderStateSelector(state, costCenterCode)
  );

export const getCostCenterValue = (
  costCenterCode: string
): MemoizedSelector<StateWithOrganization, Budget> => {
  return createSelector(getCostCenter(costCenterCode), (costCenterState) =>
    StateUtils.loaderValueSelector(costCenterState)
  );
};

export const getCostCenterList = (
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<CostCenter>>
> =>
  createSelector(getCostCenterManagementState, (state: CostCenterManagement) =>
    StateUtils.denormalizeSearch<CostCenter>(state, params)
  );

export const getAssignedBudgets = (
  code: string,
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<Budget>>
> =>
  createSelector(
    getCostCenterManagementState,
    getBudgetsState,
    (
      state: CostCenterManagement,
      budgets: StateUtils.EntityLoaderState<Budget>
    ) =>
      StateUtils.denormalizeCustomB2BSearch(
        state.budgets,
        budgets,
        params,
        code
      )
  );

export const getCostCenterState = (
  code: string
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<CostCenter>
> =>
  createSelector(
    getCostCentersState,
    (state: StateUtils.EntityLoaderState<CostCenter>) =>
      StateUtils.entityLoaderStateSelector(state, code)
  );
