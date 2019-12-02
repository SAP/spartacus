import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { ListModel } from '../../model/misc.model';
import { Budget } from '../../model/budget.model';

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGET_FEATURE = 'budget';
export const BUDGET_ENTITIES = 'budget-entities';
export const BUDGET_LISTS = 'budget-lists';

export interface BudgetManagement {
  [BUDGET_ENTITIES]?: EntityLoaderState<Budget>;
  [BUDGET_LISTS]?: EntityLoaderState<ListModel>;
}

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: BudgetManagement;
}
