import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConverterService, provideDefaultConfig } from '@spartacus/core';
import {
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NORMALIZER,
  B2BUserAdapter,
  B2B_ADDRESS_LIST_NORMALIZER,
  B2B_ADDRESS_NORMALIZER,
  B2B_USERS_NORMALIZER,
  B2B_USER_NORMALIZER,
  BudgetAdapter,
  BUDGETS_NORMALIZER,
  BUDGET_NORMALIZER,
  CostCenterAdapter,
  COST_CENTERS_NORMALIZER,
  OrderApprovalAdapter,
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
  OrgUnitAdapter,
  PermissionAdapter,
  PERMISSIONS_NORMALIZER,
  PERMISSION_NORMALIZER,
  PERMISSION_TYPES_NORMALIZER,
  PERMISSION_TYPE_NORMALIZER,
  UserGroupAdapter,
  USER_GROUPS_NORMALIZER,
  USER_GROUP_NORMALIZER,
} from '@spartacus/my-account/organization/core';
import { OccB2BUserAdapter } from './adapters/occ-b2b-users.adapter';
import { OccBudgetAdapter } from './adapters/occ-budget.adapter';
import { OccCostCenterAdapter } from './adapters/occ-cost-center.adapter';
import { OccOrderApprovalAdapter } from './adapters/occ-order-approval.adapter';
import { OccOrgUnitAdapter } from './adapters/occ-org-unit.adapter';
import { OccPermissionAdapter } from './adapters/occ-permission.adapter';
import { OccUserGroupAdapter } from './adapters/occ-user-group.adapter';
import { defaultOccOrganizationConfig } from './config/default-occ-organization-config';
import { OccB2BUserNormalizer } from './converters/occ-b2b-user-normalizer';
import { OccBudgetListNormalizer } from './converters/occ-budget-list-normalizer';
import { OccBudgetNormalizer } from './converters/occ-budget-normalizer';
import { OccCostCenterListNormalizer } from './converters/occ-cost-center-list-normalizer';
import { OccOrderApprovalDecisionNormalizer } from './converters/occ-order-approval-decision-normalizer';
import { OccOrderApprovalListNormalizer } from './converters/occ-order-approval-list-normalizer';
import { OccOrderApprovalNormalizer } from './converters/occ-order-approval-normalizer';
import { OccOrgUnitAddressListNormalizer } from './converters/occ-org-unit-address-list-normalizer';
import { OccOrgUnitAddressNormalizer } from './converters/occ-org-unit-address-normalizer';
import { OccOrgUnitApprovalProcessNormalizer } from './converters/occ-org-unit-approval-processes-normalizer';
import { OccOrgUnitNodeListNormalizer } from './converters/occ-org-unit-node-list-normalizer';
import { OccOrgUnitNodeNormalizer } from './converters/occ-org-unit-node-normalizer';
import { OccOrgUnitNormalizer } from './converters/occ-org-unit-normalizer';
import { OccPermissionListNormalizer } from './converters/occ-permission-list-normalizer';
import { OccPermissionNormalizer } from './converters/occ-permission-normalizer';
import { OccPermissionTypeListNormalizer } from './converters/occ-permission-type-list.normalizer';
import { OccPermissionTypeNormalizer } from './converters/occ-permission-type-normalizer';
import { OccUserGroupListNormalizer } from './converters/occ-user-group-list-normalizer';
import { OccUserGroupNormalizer } from './converters/occ-user-group-normalizer';
import { OccUserListNormalizer } from './converters/occ-user-list-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrganizationConfig),
    {
      provide: BudgetAdapter,
      useClass: OccBudgetAdapter,
    },
    { provide: BUDGET_NORMALIZER, useClass: OccBudgetNormalizer, multi: true },
    {
      provide: BUDGETS_NORMALIZER,
      useClass: OccBudgetListNormalizer,
      multi: true,
    },
    {
      provide: OrgUnitAdapter,
      useClass: OccOrgUnitAdapter,
    },
    {
      provide: B2BUNIT_NORMALIZER,
      useClass: OccOrgUnitNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_NODE_NORMALIZER,
      useClass: OccOrgUnitNodeNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_NODE_LIST_NORMALIZER,
      useClass: OccOrgUnitNodeListNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
      useClass: OccOrgUnitApprovalProcessNormalizer,
      multi: true,
    },
    {
      provide: UserGroupAdapter,
      useClass: OccUserGroupAdapter,
    },
    {
      provide: USER_GROUP_NORMALIZER,
      useClass: OccUserGroupNormalizer,
      multi: true,
    },
    {
      provide: USER_GROUPS_NORMALIZER,
      useClass: OccUserGroupListNormalizer,
      multi: true,
    },
    {
      provide: PermissionAdapter,
      useClass: OccPermissionAdapter,
    },
    {
      provide: PERMISSION_NORMALIZER,
      useClass: OccPermissionNormalizer,
      multi: true,
    },
    {
      provide: PERMISSIONS_NORMALIZER,
      useClass: OccPermissionListNormalizer,
      multi: true,
    },
    {
      provide: PERMISSION_TYPE_NORMALIZER,
      useClass: OccPermissionTypeNormalizer,
      multi: true,
    },
    {
      provide: PERMISSION_TYPES_NORMALIZER,
      useClass: OccPermissionTypeListNormalizer,
      multi: true,
    },
    {
      provide: CostCenterAdapter,
      useClass: OccCostCenterAdapter,
    },
    {
      provide: COST_CENTERS_NORMALIZER,
      useClass: OccCostCenterListNormalizer,
      multi: true,
    },
    {
      provide: B2BUserAdapter,
      useClass: OccB2BUserAdapter,
    },
    {
      provide: B2B_USER_NORMALIZER,
      useClass: OccB2BUserNormalizer,
      multi: true,
    },
    {
      provide: B2B_USERS_NORMALIZER,
      useClass: OccUserListNormalizer,
      multi: true,
    },
    {
      provide: B2B_ADDRESS_NORMALIZER,
      useClass: OccOrgUnitAddressNormalizer,
      multi: true,
    },
    {
      provide: B2B_ADDRESS_LIST_NORMALIZER,
      useClass: OccOrgUnitAddressListNormalizer,
      multi: true,
    },
    {
      provide: OrderApprovalAdapter,
      useClass: OccOrderApprovalAdapter,
    },
    {
      provide: ORDER_APPROVAL_NORMALIZER,
      useClass: OccOrderApprovalNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVALS_NORMALIZER,
      useClass: OccOrderApprovalListNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVAL_DECISION_NORMALIZER,
      useClass: OccOrderApprovalDecisionNormalizer,
      multi: true,
    },
    ConverterService,
  ],
})
export class OrganizationOccModule {}
