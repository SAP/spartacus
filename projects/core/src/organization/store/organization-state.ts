import {
  Budget,
  CostCenter,
  ListModel,
  B2BUnitNode,
  Permission,
  OrgUnitUserGroup,
} from '../../model';
import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const ORGANIZATION_FEATURE = 'organization';

export const BUDGET_FEATURE = 'budget';
export const BUDGET_ENTITIES = 'budget-entities';
export const BUDGET_LIST = 'budget-list';

export const COST_CENTER_FEATURE = 'costCenter';
export const COST_CENTER_ENTITIES = 'costCenter-entities';
export const COST_CENTER_LIST = 'costCenter-list';
export const COST_CENTER_ASSIGNED_BUDGETS = 'costCenter-assigned-budgets';

export const PERMISSION_FEATURE = 'permission';
export const PERMISSION_ENTITIES = 'permission-entities';
export const PERMISSION_LIST = 'permission-list';

export const ORG_UNIT_FEATURE = 'orgUnit';
export const ORG_UNIT_ENTITIES = 'orgUnit-entities';
export const ORG_UNIT_LIST = 'orgUnit-list';

export const ORG_UNIT_USER_GROUP_FEATURE = 'orgUnitUserGroup';
export const ORG_UNIT_USER_GROUP_ENTITIES = 'orgUnitUserGroup-entities';
export const ORG_UNIT_USER_GROUP_LIST = 'orgUnitUserGroup-list';

export interface Management<Type> {
  list: EntityLoaderState<ListModel>;
  entities: EntityLoaderState<Type>;
}

export interface BudgetManagement extends Management<Budget> {}

export interface OrgUnits extends Management<B2BUnitNode> {}

export interface OrgUnitUserGroupManagement
  extends Management<OrgUnitUserGroup> {}

export interface PermissionManagement extends Management<Permission> {}

export interface CostCenterManagement extends Management<CostCenter> {
  budgets: EntityLoaderState<ListModel>;
}

export interface StateWithOrganization {
  [ORGANIZATION_FEATURE]: OrganizationState;
}

export interface OrganizationState {
  [BUDGET_FEATURE]: BudgetManagement;
  [ORG_UNIT_FEATURE]: OrgUnits;
  [ORG_UNIT_USER_GROUP_FEATURE]: OrgUnitUserGroupManagement;
  [PERMISSION_FEATURE]: PermissionManagement;
  [COST_CENTER_FEATURE]: CostCenterManagement;
}
