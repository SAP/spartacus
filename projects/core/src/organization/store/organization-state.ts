import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';
import { Budget } from '../../model/budget.model';

export const ORGANIZATION_FEATURE = 'organization';
export const BUDGET = '[Organization] Budget';
export const BUDGETS = '[Organization] Budgets';


export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  budgetManagment: EntityLoaderState<Budget>;
}

