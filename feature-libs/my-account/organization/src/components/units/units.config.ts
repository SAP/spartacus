import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import { ManageUnitsListComponent } from './unit-list';
import { UnitCreateComponent } from './unit-create';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { UnitDetailsComponent } from './unit-details';
import { UnitEditComponent } from './unit-edit';
import { UnitUsersComponent } from './unit-users';
import { OrganizationTableType } from '../shared';
import { UnitChildrenComponent } from './unit-children';
import { UnitApproversComponent } from './unit-approvers';
import { UnitAssignApproversComponent } from './unit-assign-approvers';

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
      // orgUnitAssignRoles: {
      //   paths: ['organization/unit/assign-roles/:code/:roleId'],
      // },
      orgUnitApprovers: {
        paths: ['organization/units/:code/approvers'],
        paramsMapping: { code: 'uid' },
      },
      orgUnitAssignApprovers: {
        paths: ['organization/units/:code/approvers/assign'],
        paramsMapping: { code: 'uid' },
      },

      // orgUnitAddressDetails: {
      //   paths: ['organization/unit/address/:code/:id'],
      // },

      // orgUnitAddressCreate: {
      //   paths: ['organization/unit/addresses/create/:code'],
      // },

      // orgUnitAddressEdit: {
      //   paths: ['organization/unit/address/edit/:code/:id'],
      // },

      // orgUnitManageAddresses: {
      //   paths: ['organization/unit/addresses/:code'],
      // },

      // orgUnitCostCenters: {
      //   paths: ['organization/unit/cost-centers/:code'],
      // },
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
          ],
        },
      ],

      guards: [AuthGuard],
    },
  },
};

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT_USERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
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
  },
};
