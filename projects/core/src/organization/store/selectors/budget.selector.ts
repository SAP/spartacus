import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithOrganization,
  OrganizationState,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { BudgetsList } from '../../../model/budget.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';

export const getBudgetManagementState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<BudgetsList>
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budget
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  { [id: string]: LoaderState<BudgetsList> }
> = createSelector(
  getBudgetManagementState,
  (state: EntityLoaderState<BudgetsList>) => state.entities
);

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<BudgetsList>> =>
  createSelector(
    getBudgetManagementState,
    (state: EntityLoaderState<BudgetsList>) => entityStateSelector(state, budgetCode)
  );
