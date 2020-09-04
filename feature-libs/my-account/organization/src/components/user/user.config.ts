import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { ActiveLinkCellComponent } from '../shared';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { OrganizationCellComponent } from '../shared/organization-table/organization-cell.component';
import { RolesCellComponent } from '../shared/organization-table/roles/roles-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { UserAssignApproversComponent } from './approvers/assign/user-assign-approvers.component';
import { UserApproverListComponent } from './approvers/list/user-approver-list.component';
import { UserChangePasswordComponent } from './change-password/user-change-password.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserAssignPermissionsComponent } from './permissions/assign/user-assign-permissions.component';
import { UserPermissionListComponent } from './permissions/list/user-permission-list.component';
import { UserItemService } from './services/user-item.service';
import { UserListService } from './services/user-list.service';
import { UserAssignUserGroupsComponent } from './user-groups/assign/user-assign-user-groups.component';
import { UserUserGroupListComponent } from './user-groups/list/user-user-group-list.component';

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
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: UserListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: UserItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: UserCreateComponent,
        },
        {
          path: `:${ROUTE_PARAMS.userCode}`,
          component: UserDetailsComponent,
          children: [
            {
              path: 'approvers',
              component: UserApproverListComponent,
              children: [
                {
                  path: 'assign',
                  component: UserAssignApproversComponent,
                },
              ],
            },
            {
              path: 'user-groups',
              component: UserUserGroupListComponent,
              children: [
                {
                  path: 'assign',
                  component: UserAssignUserGroupsComponent,
                },
              ],
            },
            {
              path: 'purchase-limits',
              component: UserPermissionListComponent,
              children: [
                {
                  path: 'assign',
                  component: UserAssignPermissionsComponent,
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
      guards: [AuthGuard],
    },
  },
};

export function userTableConfigFactory(): TableConfig {
  return userTableConfig;
}

export const userTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER]: {
      cells: ['name', 'active', 'uid', 'roles', 'unit'],
      options: {
        pagination: {
          sort: 'byName',
        },
        dataComponent: OrganizationCellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          roles: {
            dataComponent: RolesCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.USER_APPROVERS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.USER_ASSIGN_APPROVERS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        cells: ['name', 'email', 'roles', 'orgUnit'],
        options: {},
      },
    },
    [OrganizationTableType.USER_PERMISSIONS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.USER_ASSIGN_PERMISSIONS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byCode',
        },
      },
      lg: {
        cells: ['name', 'limit', 'orgUnit'],
      },
    },
    [OrganizationTableType.USER_USER_GROUPS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.USER_ASSIGN_USER_GROUPS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byCode',
        },
      },
      lg: {
        cells: ['name', 'uid', 'orgUnit'],
      },
    },
  },
};
