import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  StateWithOrganization,
  OrganizationState,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';
import { Budget } from '../../../model/budget.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
// import { entityValueSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';

export const getBudgetManagmentState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.budgetManagment
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  LoaderState<Budget>
> = createSelector(
  getBudgetManagmentState,
  (state: EntityLoaderState<Budget>) => state.entities.value
);

// export const getBudgetState = (
//   budgetCode: string
// ): MemoizedSelector<StateWithOrganization, Budget> =>
// createSelector(
// getBudgetsState,
// (state: EntityLoaderState<Budget>) => entityValueSelector(state, budgetCode)
// );
