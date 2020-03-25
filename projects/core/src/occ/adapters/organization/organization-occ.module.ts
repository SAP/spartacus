import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConfigModule } from '../../../config/config.module';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { PermissionAdapter } from '../../../organization/connectors/permission/permission.adapter';
import { PermissionTypeAdapter } from '../../../organization/connectors/permission-type/permission-type.adapter';
import { OrgUnitAdapter } from '../../../organization/connectors/org-unit/org-unit.adapter';
import { CostCenterAdapter } from '../../../organization/connectors/cost-center/cost-center.adapter';
import { OrgUnitUserGroupAdapter } from '../../../organization/connectors/user-group/user-group.adapter';

import {
  BUDGET_NORMALIZER,
  BUDGETS_NORMALIZER,
} from '../../../organization/connectors/budget/converters';
import {
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_NORMALIZER,
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
} from '../../../organization/connectors/org-unit/converters';
import {
  PERMISSION_NORMALIZER,
  PERMISSIONS_NORMALIZER,
} from '../../../organization/connectors/permission/converters';
import {
  PERMISSION_TYPE_NORMALIZER,
  PERMISSION_TYPES_NORMALIZER,
} from '../../../organization/connectors/permission-type/converters';
import {
  COST_CENTER_NORMALIZER,
  COST_CENTERS_NORMALIZER,
} from '../../../organization/connectors/cost-center/converters';
import {
  ORG_UNIT_USER_GROUP_NORMALIZER,
  ORG_UNIT_USER_GROUPS_NORMALIZER,
} from '../../../organization/connectors/user-group/converters';
import { defaultOccOrganizationConfig } from './default-occ-organization-config';
import { OccBudgetAdapter } from './occ-budget.adapter';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';
import { OccPermissionTypeAdapter } from './occ-permission-type.adapter';
import { OccPermissionAdapter } from './occ-permission.adapter';
import { OccCostCenterAdapter } from './occ-cost-center.adapter';
import { OccOrgUnitUserGroupAdapter } from './occ-user-group.adapter';
import {
  OccBudgetNormalizer,
  OccBudgetListNormalizer,
  OccOrgUnitNodeNormalizer,
  OccOrgUnitNodeListNormalizer,
  OccPermissionNormalizer,
  OccPermissionListNormalizer,
  OccCostCenterListNormalizer,
  OccCostCenterNormalizer,
  OccPermissionTypeListNormalizer,
  OccOrgUnitUserGroupNormalizer,
  OccOrgUnitUserGroupListNormalizer,
  OccOrgUnitNormalizer,
  OccOrgUnitApprovalProcessNormalizer,
  OccB2BUserNormalizer,
  OccUserListNormalizer,
} from './converters/index';
import { OccPermissionTypeNormalizer } from './converters/occ-permission-type-normalizer';

import {
  B2BUserAdapter,
  B2B_USER_NORMALIZER,
  B2B_USERS_NORMALIZER,
} from '../../../organization';
import { OccB2BUserAdapter } from './occ-b2b-users.adapter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccOrganizationConfig),
  ],
  providers: [
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
      provide: OrgUnitUserGroupAdapter,
      useClass: OccOrgUnitUserGroupAdapter,
    },
    {
      provide: ORG_UNIT_USER_GROUP_NORMALIZER,
      useClass: OccOrgUnitUserGroupNormalizer,
      multi: true,
    },
    {
      provide: ORG_UNIT_USER_GROUPS_NORMALIZER,
      useClass: OccOrgUnitUserGroupListNormalizer,
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
      provide: PermissionTypeAdapter,
      useClass: OccPermissionTypeAdapter,
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
      provide: COST_CENTER_NORMALIZER,
      useClass: OccCostCenterNormalizer,
      multi: true,
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
  ],
})
export class OrganizationOccModule {}
