import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { AssignCellComponent } from '../shared/organization-sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/organization-table/active-link/active-link-cell.component';
import { OrganizationCellComponent } from '../shared/organization-table/organization-cell.component';
import { RolesCellComponent } from '../shared/organization-table/roles/roles-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import {
  UserApproverListComponent,
  UserAssignedApproverListComponent,
} from './approvers';
import { ChangePasswordFormComponent } from './change-password-form';
import { UserDetailsComponent } from './details/user-details.component';
import { UserFormComponent } from './form';
import { ActiveUserGuard } from './guards/active-user.guard';
import { ExistUserGuard } from './guards/exist-user.guard';
import { UserAssignedPermissionListComponent } from './permissions';
import { UserPermissionListComponent } from './permissions/user-permission-list.component';
import { UserItemService } from './services/user-item.service';
import { UserListService } from './services/user-list.service';
import { UserUserGroupListComponent } from './user-groups';
import { UserAssignedUserGroupListComponent } from './user-groups/assigned/user-assigned-user-group-list.component';

const listPath = `organization/users/:${ROUTE_PARAMS.userCode}`;
const paramsMapping: ParamsMapping = {
  userCode: 'customerId',
};

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
          component: UserFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.userCode}`,
          component: UserDetailsComponent,
          canActivate: [ExistUserGuard],
          children: [
            {
              path: `edit`,
              component: UserFormComponent,
              canActivate: [ActiveUserGuard],
            },
            {
              path: `change-password`,
              component: ChangePasswordFormComponent,
            },

            {
              path: 'user-groups',
              component: UserAssignedUserGroupListComponent,
            },
            {
              path: 'user-groups/assign',
              component: UserUserGroupListComponent,
            },
            {
              path: 'approvers',
              component: UserAssignedApproverListComponent,
            },
            {
              path: 'approvers/assign',
              component: UserApproverListComponent,
            },
            {
              path: 'purchase-limits',
              component: UserAssignedPermissionListComponent,
            },
            {
              path: 'purchase-limits/assign',
              component: UserPermissionListComponent,
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

const cells = {
  actions: {
    dataComponent: AssignCellComponent,
  },
};
const pagination = {
  pageSize: MAX_OCC_INTEGER_VALUE,
};

export const userTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER]: {
      cells: ['name', 'active', 'uid', 'roles', 'unit'],
      options: {
        pagination: {
          sort: 'byName',
        },
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          uid: {
            dataComponent: OrganizationCellComponent,
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
      cells: ['name', 'actions'],
      options: {
        cells,
      },
    },
    [OrganizationTableType.USER_ASSIGNED_APPROVERS]: {
      cells: ['name', 'actions'],
      options: {
        cells,
        pagination,
      },
    },
    [OrganizationTableType.USER_USER_GROUPS]: {
      cells: ['uid', 'actions'],
      options: {
        cells,
      },
    },
    [OrganizationTableType.USER_ASSIGNED_USER_GROUPS]: {
      cells: ['uid', 'actions'],
      options: {
        cells,
        pagination,
      },
    },
    [OrganizationTableType.USER_PERMISSIONS]: {
      cells: ['code', 'actions'],
      options: {
        cells,
      },
    },
    [OrganizationTableType.USER_ASSIGNED_PERMISSIONS]: {
      cells: ['code', 'actions'],
      options: {
        cells,
        pagination,
      },
    },
  },
};
