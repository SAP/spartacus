import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  BudgetsState,
  StateWithOrganization,
  OrganizationState,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { Budget } from '../../../model/budget.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { entityValueSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';

export const getBudgetManagmentState: MemoizedSelector<
  StateWithOrganization,
  BudgetsState
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budgetManagment
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagmentState,
  (state: BudgetsState) => state.budgets
);

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, Budget> =>
  createSelector(
    getBudgetsState,
    (state: EntityLoaderState<Budget>) => entityValueSelector(state, budgetCode)
  );
