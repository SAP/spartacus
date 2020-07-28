import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserListComponent } from './list/user-list.component';
import { UserPermissionListComponent } from './permissions/list/user-permission-list.component';
import { UserAssignPermissionsComponent } from './permissions/assign/user-assign-permission.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

// TODO: this doesn't work with lazy loaded feature
export const userRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      user: {
        paths: ['organization/users'],
      },
      userCreate: {
        paths: ['organization/users/create'],
      },
      userDetails: {
        paths: ['organization/users/:code'],
        paramsMapping: { code: 'customerId' },
      },
      userEdit: {
        paths: ['organization/users/:code/edit'],
        paramsMapping: { code: 'customerId' },
      },
      userApprovers: {
        paths: ['organization/users/:code/approvers'],
        paramsMapping: { code: 'customerId' },
      },
      userAssignApprovers: {
        paths: ['organization/users/:code/approvers/assign'],
        paramsMapping: { code: 'customerId' },
      },
      userPermissions: {
        paths: ['organization/users/:code/purchase-limits'],
        paramsMapping: { code: 'customerId' },
      },
      userAssignPermissions: {
        paths: ['organization/users/:code/purchase-limits/assign'],
        paramsMapping: { code: 'customerId' },
      },
    },
  },
};

export const userCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUsersListComponent: {
      component: UserListComponent,
      childRoutes: [
        {
          path: 'create',
          component: UserCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: UserDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: UserEditComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            // {
            //   path: 'approvers',
            //   component: UserApproverListComponent,
            //   canDeactivate: [SplitViewDeactivateGuard],
            //   children: [
            //     {
            //       path: 'assign',
            //       component: UserAssignApproversComponent,
            //       canDeactivate: [SplitViewDeactivateGuard],
            //     },
            //   ],
            // },
            // {
            //   path: 'user-groups',
            //   component: UserUserGroupsListComponent,
            //   canDeactivate: [SplitViewDeactivateGuard],
            //   children: [
            //     {
            //       path: 'assign',
            //       component: UserAssignUserGroupsComponent,
            //       canDeactivate: [SplitViewDeactivateGuard],
            //     },
            //   ],
            // },
            {
              path: 'purchase-limits',
              component: UserPermissionListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UserAssignPermissionsComponent,
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

export function userTableConfigFactory(): TableConfig {
  return userTableConfig;
}

export const userTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER]: [
      // TODO: consider cascading from smallest size
      {
        headers: [{ key: 'name' }],
        pagination: {
          sort: 'byName',
          // pageSize: 2,
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'uid', sortCode: 'byGroupID' },
          { key: 'orgUnit', sortCode: 'byUnitName' },
        ],
      },
    ],

    [OrganizationTableType.USER_APPROVERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.USER_ASSIGN_APPROVERS]: [
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
          { key: 'uid' },
          { key: 'orgUnit', sortCode: 'byUnitName' },
        ],
      },
    ],
    [OrganizationTableType.USER_PERMISSIONS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.USER_ASSIGN_PERMISSIONS]: [
      {
        pagination: {
          sort: 'byCode',
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
          { key: 'name', sortCode: 'byCode' },
          { key: 'limit' },
          { key: 'orgUnit', sortCode: 'byUnitName' },
        ],
      },
    ],
  },
};
