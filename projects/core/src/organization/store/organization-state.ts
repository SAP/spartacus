import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { Budget } from '../../model/budget.model';

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGETS_FEATURE = 'budgetManagment';
export const LOAD_BUDGETS_PROCESS_ID = 'loadBudgets';

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGETS_FEATURE]: EntityLoaderState<Budget>;
}

