import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { ActiveUserGuard } from './active-user.guard';
import { UserAssignApproversComponent } from './approvers/assign/user-assign-approvers.component';
import { UserApproverListComponent } from './approvers/list/user-approver-list.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { ExistUserGuard } from './exist-user.guard';
import { UserListComponent } from './list/user-list.component';
import { UserAssignPermissionsComponent } from './permissions/assign/user-assign-permissions.component';
import { UserPermissionListComponent } from './permissions/list/user-permission-list.component';
import { UserAssignUserGroupsComponent } from './user-groups/assign/user-assign-user-groups.component';
import { UserUserGroupListComponent } from './user-groups/list/user-user-group-list.component';

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
      userUserGroups: {
        paths: ['organization/users/:code/user-groups'],
        paramsMapping: { code: 'customerId' },
      },
      userAssignUserGroups: {
        paths: ['organization/users/:code/user-groups/assign'],
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
          canActivate: [ExistUserGuard],
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'approvers',
              component: UserApproverListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UserAssignApproversComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'user-groups',
              component: UserUserGroupListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UserAssignUserGroupsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
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
        {
          path: ':code/edit',
          component: UserEditComponent,
          canActivate: [ActiveUserGuard],
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
          { key: 'roles' },
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
          { key: 'email', sortCode: 'byEmail' },
          { key: 'roles' },
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
    [OrganizationTableType.USER_USER_GROUPS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.USER_ASSIGN_USER_GROUPS]: [
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
          { key: 'name', sortCode: 'byName' },
          { key: 'uid', sortCode: 'byGroupID' },
          { key: 'orgUnit', sortCode: 'byUnitName' },
        ],
      },
    ],
  },
};
