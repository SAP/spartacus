import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils, EntitiesModel, CostCenter } from '@spartacus/core';
import { B2BSearchConfig } from '../../model/search-config';
import {
  denormalizeB2BSearch,
  denormalizeCustomB2BSearch,
} from '../../utils/serializer';
import {
  CostCenterManagement,
  COST_CENTER_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { getBudgetsState } from './budget.selector';
import { Budget } from '../../model/budget.model';

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

export const getCostCenterList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<CostCenter>>
> =>
  createSelector(getCostCenterManagementState, (state: CostCenterManagement) =>
    denormalizeB2BSearch<CostCenter>(state, params)
  );

export const getAssignedBudgets = (
  code: string,
  params: B2BSearchConfig
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
    ) => denormalizeCustomB2BSearch(state.budgets, budgets, params, code)
  );
