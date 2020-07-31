import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { ManageUnitsListComponent } from './unit-list/unit-list.component';
import { UnitCreateComponent } from './unit-create/unit-create.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitUsersComponent } from './unit-users/unit-users.component';
import { OrganizationTableType } from '../shared/organization.model';
import { UnitChildrenComponent } from './unit-children/unit-children.component';
import { UnitApproversComponent } from './unit-approvers/unit-approvers.component';
import { UnitAssignApproversComponent } from './unit-assign-approvers/unit-assign-approvers.component';
import { UnitAssignRolesComponent } from './unit-assign-roles/unit-assign-roles.component';
import { UnitManageAddressesComponent } from './unit-manage-addresses/unit-manage-addresses.component';
import { UnitAddressDetailsComponent } from './unit-address-details/unit-address-details.component';
import { UnitAddressCreateComponent } from './unit-address-create/unit-address-create.component';
import { UnitAddressEditComponent } from './unit-address-edit/unit-address-edit.component';
import { UnitCostCentersComponent } from './unit-cost-centers/unit-cost-centers.component';

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
      component: ManageUnitsListComponent,
      childRoutes: [
        {
          path: 'create',
          component: UnitCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: UnitDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: UnitEditComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'children',
              component: UnitChildrenComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'users',
              component: UnitUsersComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'roles/assign',
                  component: UnitAssignRolesComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitApproversComponent,
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
              component: UnitManageAddressesComponent,
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
        headers: [{ key: 'summary' }, { key: 'link' }],
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
