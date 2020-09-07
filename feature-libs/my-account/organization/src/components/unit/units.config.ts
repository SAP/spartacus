import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { ActiveUnitGuard } from './active-unit.guard';
import { UnitAddressCreateComponent } from './addresses/create/unit-address-create.component';
import { UnitAddressDetailsComponent } from './addresses/details/unit-address-details.component';
import { UnitAddressEditComponent } from './addresses/edit/unit-address-edit.component';
import { UnitAddressListComponent } from './addresses/list/unit-address-list.component';
import { UnitAssignApproversComponent } from './approvers/assign/unit-assign-approvers.component';
import { UnitApproverListComponent } from './approvers/list/unit-approver-list.component';
import { UnitChildrenComponent } from './children/unit-children.component';
import { UnitCostCentersComponent } from './cost-centers/unit-cost-centers.component';
import { UnitCreateComponent } from './create/unit-create.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitEditComponent } from './edit/unit-edit.component';
import { ExistUnitGuard } from './exist-unit.guard';
import { UnitListComponent } from './list/unit-list.component';
import { UnitUserAssignRolesComponent } from './users/assign-roles/unit-user-assign-roles.component';
import { UnitUserListComponent } from './users/list/unit-user-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnits: {
        paths: ['organization/units'],
      },
      orgUnitCreate: {
        paths: ['organization/units/create'],
      },
      orgUnitDetails: {
        paths: ['organization/units/:code'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitEdit: {
        paths: ['organization/units/:code/edit'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitChildren: {
        paths: ['organization/units/:code/children'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitUsers: {
        paths: ['organization/units/:code/users'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAssignRoles: {
        paths: ['organization/units/:code/users/roles/assign'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitApprovers: {
        paths: ['organization/units/:code/approvers'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAssignApprovers: {
        paths: ['organization/units/:code/approvers/assign'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitManageAddresses: {
        paths: ['organization/units/:code/addresses'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAddressDetails: {
        paths: ['organization/units/:code/addresses/:id'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAddressCreate: {
        paths: ['organization/units/:code/addresses/create'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAddressEdit: {
        paths: ['organization/units/:code/addresses/:id/edit'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitCostCenters: {
        paths: ['organization/units/:code/cost-centers'],
        paramsMapping: { code: 'uid' },
      },
    },
  },
};

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: UnitListComponent,
      childRoutes: [
        {
          path: 'create',
          component: UnitCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: UnitDetailsComponent,
          canActivate: [ExistUnitGuard],
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'children',
              component: UnitChildrenComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'users',
              component: UnitUserListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'roles/assign',
                  component: UnitUserAssignRolesComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitApproverListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UnitAssignApproversComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'addresses',
              component: UnitAddressListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'create',
                  component: UnitAddressCreateComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
                {
                  path: ':id',
                  component: UnitAddressDetailsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                  children: [
                    {
                      path: 'edit',
                      component: UnitAddressEditComponent,
                      canDeactivate: [SplitViewDeactivateGuard],
                    },
                  ],
                },
              ],
            },
            {
              path: 'cost-centers',
              component: UnitCostCentersComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
        },
        {
          path: ':code/edit',
          component: UnitEditComponent,
          canActivate: [ActiveUnitGuard],
        },
      ],

      guards: [AuthGuard],
    },
  },
};

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT_USERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.UNIT_CHILDREN]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.UNIT_APPROVERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.UNIT_ASSIGN_APPROVERS]: [
      {
        pagination: {
          sort: 'byName',
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        headers: [{ key: 'selected' }, { key: 'summary' }, { key: 'link' }],
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'email', sortCode: 'byEmail' },
          { key: 'roles' },
          { key: 'orgUnit' },
        ],
      },
    ],
    [OrganizationTableType.UNIT_ASSIGN_ROLES]: [
      {
        pagination: {
          sort: 'byName',
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'email', sortCode: 'byEmail' },
          { key: 'roleCustomer' },
          { key: 'roleApprover' },
          { key: 'roleManager' },
          { key: 'roleAdministrator' },
        ],
      },
    ],
    [OrganizationTableType.UNIT_MANAGE_ADDRESSES]: [
      {
        headers: [{ key: 'summary' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.UNIT_COST_CENTERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
  },
};
