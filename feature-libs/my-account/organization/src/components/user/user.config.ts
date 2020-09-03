import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { UserAssignApproversComponent } from './approvers/assign/user-assign-approvers.component';
import { UserApproverListComponent } from './approvers/list/user-approver-list.component';
import { UserChangePasswordComponent } from './change-password/user-change-password.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserListComponent } from './list/user-list.component';
import { UserAssignPermissionsComponent } from './permissions/assign/user-assign-permissions.component';
import { UserPermissionListComponent } from './permissions/list/user-permission-list.component';
import { UserAssignUserGroupsComponent } from './user-groups/assign/user-assign-user-groups.component';
import { UserUserGroupListComponent } from './user-groups/list/user-user-group-list.component';
import { AdminGuard } from '../../core/guards/admin.guard';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/users/:${ROUTE_PARAMS.userCode}`;
const paramsMapping: ParamsMapping = {
  userCode: 'customerId',
};

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
        paths: [listPath],
        paramsMapping,
      },
      userEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      userChangePassword: {
        paths: [`${listPath}/change-password`],
        paramsMapping,
      },
      userApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      userAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      userPermissions: {
        paths: [`${listPath}/purchase-limits`],
        paramsMapping,
      },
      userAssignPermissions: {
        paths: [`${listPath}/purchase-limits/assign`],
        paramsMapping,
      },
      userUserGroups: {
        paths: [`${listPath}/user-groups`],
        paramsMapping,
      },
      userAssignUserGroups: {
        paths: [`${listPath}/user-groups/assign`],
        paramsMapping,
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
          path: `:${ROUTE_PARAMS.userCode}`,
          component: UserDetailsComponent,
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
          path: `:${ROUTE_PARAMS.userCode}/edit`,
          component: UserEditComponent,
        },
        {
          path: `:${ROUTE_PARAMS.userCode}/change-password`,
          component: UserChangePasswordComponent,
        },
      ],
      guards: [AuthGuard, AdminGuard],
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
