import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Budget } from '../../../model/budget.model';
import { EntitiesModel } from '../../../model/misc.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import {
  denormalizeB2BSearch,
  serializeB2BSearchConfig,
} from '../../utils/serializer';
import {
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LISTS,
  BudgetManagement,
  OrganizationState,
  PERMISSION_ENTITIES,
  PERMISSION_LISTS,
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
  EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagementState,
  (state: BudgetManagement) => state && state[BUDGET_ENTITIES]
);

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Budget>> =>
  createSelector(
    getBudgetsState,
    (state: EntityLoaderState<Budget>) => entityStateSelector(state, budgetCode)
  );

// TODO: better mechanism for denormalization
// create service encapsulating denormalization

export const getBudgetList = (
  params: B2BSearchConfig
): MemoizedSelector<
  StateWithOrganization,
  LoaderState<EntitiesModel<Budget>>
> =>
  createSelector(
    getBudgetManagementState,
    (state: BudgetManagement) =>
      denormalizeB2BSearch(state, BUDGET_LISTS, BUDGET_ENTITIES, params)
  );
