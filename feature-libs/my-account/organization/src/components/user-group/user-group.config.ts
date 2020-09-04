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
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { UserGroupCreateComponent } from './create/user-group-create.component';
import { UserGroupDetailsComponent } from './details/user-group-details.component';
import { UserGroupEditComponent } from './edit/user-group-edit.component';
import { UserGroupAssignPermissionsComponent } from './permissions/assign/user-group-assign-permission.component';
import { UserGroupPermissionListComponent } from './permissions/list/user-group-permission-list.component';
import { UserGroupListService } from './services';
import { UserGroupItemService } from './services/user-group-item.service';
import { UserGroupAssignUsersComponent } from './users/assign/user-group-assign-user.component';
import { UserGroupUserListComponent } from './users/list/user-group-user-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/user-groups/:${ROUTE_PARAMS.userGroupCode}`;
const paramsMapping: ParamsMapping = {
  userGroupCode: 'uid',
};

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
        paths: [listPath],
        paramsMapping,
      },
      userGroupEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      userGroupUsers: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      userGroupAssignUsers: {
        paths: [`${listPath}/users/assign`],
        paramsMapping,
      },
      userGroupPermissions: {
        paths: [`${listPath}/purchase-limits`],
        paramsMapping,
      },
      userGroupAssignPermissions: {
        paths: [`${listPath}/purchase-limits/assign`],
        paramsMapping,
      },
    },
  },
};

export const userGroupCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUserGroupsListComponent: {
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: UserGroupListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: UserGroupItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: UserGroupCreateComponent,
        },
        {
          path: `:${ROUTE_PARAMS.userGroupCode}`,
          component: UserGroupDetailsComponent,
          children: [
            {
              path: 'users',
              component: UserGroupUserListComponent,
              children: [
                {
                  path: 'assign',
                  component: UserGroupAssignUsersComponent,
                },
              ],
            },
            {
              path: 'purchase-limits',
              component: UserGroupPermissionListComponent,
              children: [
                {
                  path: 'assign',
                  component: UserGroupAssignPermissionsComponent,
                },
              ],
            },
          ],
        },
        {
          path: `:${ROUTE_PARAMS.userGroupCode}/edit`,
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
    [OrganizationTableType.USER_GROUP]: {
      cells: ['name', 'unit'],
      options: {
        pagination: {
          sort: 'byName',
        },
        dataComponent: OrganizationCellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.USER_GROUP_USERS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.USER_GROUP_ASSIGN_USERS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        cells: ['name', 'uid', 'roles', 'orgUnit'],
        options: {},
      },
    },
    [OrganizationTableType.USER_GROUP_PERMISSIONS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.USER_GROUP_ASSIGN_PERMISSIONS]: {
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
  },
};
