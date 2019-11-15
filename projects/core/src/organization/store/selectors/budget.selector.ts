import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Budget, BudgetListModel } from '../../../model/budget.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { BudgetSearchConfig } from '../../model/search-config';
import { serializeBudgetSearchConfig } from '../../utils/budgets';
import {
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
  (state: OrganizationState) => state.budget
);

export const getBudgetsState: MemoizedSelector<
  StateWithOrganization,
  EntityLoaderState<Budget>
> = createSelector(
  getBudgetManagementState,
  (state: BudgetManagement) => state && state['budget-entities']
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
  params: BudgetSearchConfig
): MemoizedSelector<StateWithOrganization, LoaderState<BudgetListModel>> =>
  createSelector(
    getBudgetManagementState,
    (state: BudgetManagement) => {
      const list: any = entityStateSelector(
        state['budget-lists'],
        serializeBudgetSearchConfig(params)
      );
      if (!list.value || !list.value.ids) {
        return list;
      }
      const res: LoaderState<BudgetListModel> = Object.assign({}, list, {
        value: {
          budgets: list.value.ids.map(
            code => entityStateSelector(state['budget-entities'], code).value
          ),
          pagination: list.value.pagination,
          sorts: list.value.sorts,
        },
      });
      return res;
    }
  );
