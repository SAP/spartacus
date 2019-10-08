import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
// import { LoaderState } from '../../state/utils/loader/loader-state';
import { Budget } from '../../model/budget.model';

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGETS_FEATURE = 'budgetManagment';

export const LOAD_BUDGETS_PROCESS_ID = 'budgets';
export const LOAD_BUDGET_PROCESS_ID = 'budget';

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGETS_FEATURE]: EntityLoaderState<Budget>;
}

