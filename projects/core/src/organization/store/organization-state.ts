import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { BudgetsList } from '../../model/budget.model';

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGET_FEATURE = 'budget';

export const LOAD_BUDGETS_PROCESS_ID = 'budgets';

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: EntityLoaderState<BudgetsList>;
}
