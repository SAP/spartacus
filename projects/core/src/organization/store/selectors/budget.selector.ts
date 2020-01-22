import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Budget, BudgetListModel } from '../../../model/budget.model';
import { entityStateSelector } from '../../../state/utils/entity-loader/entity-loader.selectors';
import { EntityLoaderState } from '../../../state/utils/entity-loader/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeBudgetSearchConfig } from '../../utils/budgets';
import {
  BUDGET_ENTITIES,
  BUDGET_FEATURE,
  BUDGET_LISTS,
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
): MemoizedSelector<StateWithOrganization, LoaderState<BudgetListModel>> =>
  createSelector(
    getBudgetManagementState,
    (state: BudgetManagement) => {
      const list: any = entityStateSelector(
        state[BUDGET_LISTS],
        serializeBudgetSearchConfig(params)
      );
      if (!list.value || !list.value.ids) {
        return list;
      }
      const res: LoaderState<BudgetListModel> = Object.assign({}, list, {
        value: {
          budgets: list.value.ids.map(
            code => entityStateSelector(state[BUDGET_ENTITIES], code).value
          ),
          pagination: list.value.pagination,
          sorts: list.value.sorts,
        },
      });
      return res;
    }
  );
