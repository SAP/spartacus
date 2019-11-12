import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithOrganization,
  OrganizationState,
  BudgetsList,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { Budget } from '../../../model/budget.model';

export const getBudgetManagementState: MemoizedSelector<
  StateWithOrganization,
  BudgetsList
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budget
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagementState,
  (state: BudgetsList) => state && state.budgets
);

// export const getBudgetsValuesState: MemoizedSelector<
//   StateWithOrganization,
//   { [id: string]: LoaderState<Budget> }
// > = createSelector(
//   getBudgetsState,
//   (state: EntityLoaderState<Budget>) => state && state.entities
// );

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Budget>> =>
  createSelector(
    getBudgetsState,
    (state: EntityLoaderState<Budget>) => entityStateSelector(state, budgetCode)
  );
