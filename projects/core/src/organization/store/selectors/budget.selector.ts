import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithOrganization,
  OrganizationState,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { Budget } from '../../../model/budget.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';

export const getBudgetManagmentState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budget
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  LoaderState<Budget>
> = createSelector(
  getBudgetManagmentState,
  (state: EntityLoaderState<Budget>) => state.entities
);

export const getBudgetState = (
  budgetCode: string
): MemoizedSelector<StateWithOrganization, LoaderState<Budget>> =>
  createSelector(
    getBudgetManagmentState,
    (state: EntityLoaderState<Budget>) => entityStateSelector(state, budgetCode)
  );
