import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { PaginationModel, SortModel } from '../../model/misc.model';
import { Budget } from '../../model/budget.model';

export interface BudgetsList {
  budgets?: EntityLoaderState<Budget>;
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGET_FEATURE = 'budget';

export const LOAD_BUDGETS_PROCESS_ID = 'budgets';

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: BudgetsList;
}
