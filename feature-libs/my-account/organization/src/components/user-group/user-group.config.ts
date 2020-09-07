import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { UserGroupCreateComponent } from './create/user-group-create.component';
import { UserGroupDetailsComponent } from './details/user-group-details.component';
import { UserGroupEditComponent } from './edit/user-group-edit.component';
import { ExistUserGroupGuard } from './exist-user-group.guard';
import { UserGroupListComponent } from './list/user-group-list.component';
import { UserGroupAssignPermissionsComponent } from './permissions/assign/user-group-assign-permission.component';
import { UserGroupPermissionListComponent } from './permissions/list/user-group-permission-list.component';
import { UserGroupAssignUsersComponent } from './users/assign/user-group-assign-user.component';
import { UserGroupUserListComponent } from './users/list/user-group-user-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

// TODO: this doesn't work with lazy loaded feature
export const userGroupRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      userGroup: {
        paths: ['organization/user-groups'],
      },
      userGroupCreate: {
        paths: ['organization/user-groups/create'],
      },
      userGroupDetails: {
        paths: ['organization/user-groups/:code'],
        paramsMapping: { code: 'uid' },
      },
      userGroupEdit: {
        paths: ['organization/user-groups/edit/:code'],
        paramsMapping: { code: 'uid' },
      },
      userGroupUsers: {
        paths: ['organization/user-groups/:code/users'],
        paramsMapping: { code: 'uid' },
      },
      userGroupAssignUsers: {
        paths: ['organization/user-groups/:code/users/assign'],
        paramsMapping: { code: 'uid' },
      },
      userGroupPermissions: {
        paths: ['organization/user-groups/:code/purchase-limits'],
        paramsMapping: { code: 'uid' },
      },
      userGroupAssignPermissions: {
        paths: ['organization/user-groups/:code/purchase-limits/assign'],
        paramsMapping: { code: 'uid' },
      },
    },
  },
};

export const userGroupCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUserGroupsListComponent: {
      component: UserGroupListComponent,
      childRoutes: [
        {
          path: 'create',
          component: UserGroupCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: UserGroupDetailsComponent,
          canActivate: [ExistUserGroupGuard],
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'users',
              component: UserGroupUserListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UserGroupAssignUsersComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'purchase-limits',
              component: UserGroupPermissionListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UserGroupAssignPermissionsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
          ],
        },
        {
          path: 'edit/:code',
          component: UserGroupEditComponent,
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export function userGroupTableConfigFactory(): TableConfig {
  return userGroupTableConfig;
}

export const userGroupTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER_GROUP]: [
      {
        headers: [{ key: 'name' }],
        pagination: {
          sort: 'byName',
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

    [OrganizationTableType.USER_GROUP_USERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.USER_GROUP_ASSIGN_USERS]: [
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
          { key: 'roles' },
          { key: 'orgUnit', sortCode: 'byUnitName' },
        ],
      },
    ],
    [OrganizationTableType.USER_GROUP_PERMISSIONS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
    [OrganizationTableType.USER_GROUP_ASSIGN_PERMISSIONS]: [
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
