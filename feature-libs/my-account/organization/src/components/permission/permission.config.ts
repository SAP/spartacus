import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  TableConfig,
  SplitViewDeactivateGuard,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { PermissionListComponent } from './list/permission-list.component';
import { PermissionCreateComponent } from './create/permission-create.component';
import { PermissionDetailsComponent } from './details/permission-details.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
// const MAX_OCC_INTEGER_VALUE = 2147483647;

// TODO: this doesn't work with lazy loaded feature
export const permissionRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      permission: {
        paths: ['organization/purchase-limits'],
      },
      permissionCreate: {
        paths: ['organization/purchase-limits/create'],
      },
      permissionDetails: {
        paths: ['organization/purchase-limits/:code'],
      },
      // userGroupEdit: {
      //   paths: ['organization/user-groups/:code/edit'],
      //   paramsMapping: { code: 'uid' },
      // },
      // userGroupUsers: {
      //   paths: ['organization/user-groups/:code/users'],
      //   paramsMapping: { code: 'uid' },
      // },
      // userGroupAssignUsers: {
      //   paths: ['organization/user-groups/:code/users/assign'],
      //   paramsMapping: { code: 'uid' },
      // },
      // userGroupPermissions: {
      //   paths: ['organization/user-groups/:code/purchase-limits'],
      //   paramsMapping: { code: 'uid' },
      // },
      // userGroupAssignPermissions: {
      //   paths: ['organization/user-groups/:code/purchase-limits/assign'],
      //   paramsMapping: { code: 'uid' },
      // },
    },
  },
};

export const permissionCmsConfig: CmsConfig = {
  cmsComponents: {
    ManagePermissionsListComponent: {
      component: PermissionListComponent,
      childRoutes: [
        {
          path: 'create',
          component: PermissionCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':code',
          component: PermissionDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          //     children: [
          //       {
          //         path: 'edit',
          //         component: UserGroupEditComponent,
          //         canDeactivate: [SplitViewDeactivateGuard],
          //       },
          //       {
          //         path: 'users',
          //         component: UserGroupUserListComponent,
          //         canDeactivate: [SplitViewDeactivateGuard],
          //         children: [
          //           {
          //             path: 'assign',
          //             component: UserGroupAssignUsersComponent,
          //             canDeactivate: [SplitViewDeactivateGuard],
          //           },
          //         ],
          //       },
          //       {
          //         path: 'purchase-limits',
          //         component: UserGroupPermissionListComponent,
          //         canDeactivate: [SplitViewDeactivateGuard],
          //         children: [
          //           {
          //             path: 'assign',
          //             component: UserGroupAssignPermissionsComponent,
          //             canDeactivate: [SplitViewDeactivateGuard],
          //           },
          //         ],
          //       },
          //     ],
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export function permissionTableConfigFactory(): TableConfig {
  return permissionTableConfig;
}

export const permissionTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.PERMISSION]: [
      // TODO: consider cascading from smallest size
      {
        headers: [{ key: 'code' }],
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
          { key: 'code' },
          { key: 'orderApprovalPermissionType' },
          { key: 'threshold' },
          { key: 'periodRange' },
          { key: 'orgUnit' },
        ],
      },
    ],

    // [OrganizationTableType.USER_GROUP_USERS]: [
    //   {
    //     headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
    //     hideHeader: true,
    //     pagination: {
    //       pageSize: MAX_OCC_INTEGER_VALUE,
    //     },
    //   },
    // ],
    // [OrganizationTableType.USER_GROUP_ASSIGN_USER]: [
    //   {
    //     pagination: {
    //       sort: 'byName',
    //     },
    //   },
    //   {
    //     breakpoint: BREAKPOINT.xs,
    //     headers: [{ key: 'selected' }, { key: 'summary' }, { key: 'link' }],
    //     hideHeader: true,
    //   },
    //   {
    //     breakpoint: BREAKPOINT.lg,
    //     headers: [
    //       { key: 'name', sortCode: 'byName' },
    //       { key: 'uid' },
    //       { key: 'orgUnit', sortCode: 'byUnitName' },
    //     ],
    //   },
    // ],
    // [OrganizationTableType.USER_GROUP_PERMISSIONS]: [
    //   {
    //     headers: [{ key: 'summary' }, { key: 'link' }, { key: 'unassign' }],
    //     hideHeader: true,
    //     pagination: {
    //       pageSize: MAX_OCC_INTEGER_VALUE,
    //     },
    //   },
    // ],
    // [OrganizationTableType.USER_GROUP_ASSIGN_PERMISSIONS]: [
    //   {
    //     pagination: {
    //       sort: 'byCode',
    //     },
    //   },
    //   {
    //     breakpoint: BREAKPOINT.xs,
    //     headers: [{ key: 'selected' }, { key: 'summary' }, { key: 'link' }],
    //     hideHeader: true,
    //   },
    //   {
    //     breakpoint: BREAKPOINT.lg,
    //     headers: [
    //       { key: 'name', sortCode: 'byCode' },
    //       { key: 'limit' },
    //       { key: 'orgUnit', sortCode: 'byUnitName' },
    //     ],
    //   },
    // ],
  },
};
