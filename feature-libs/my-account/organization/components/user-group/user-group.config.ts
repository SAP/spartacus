import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/my-account/organization/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { AssignCellComponent } from '../shared/organization-sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/organization-table/active-link/active-link-cell.component';
import { OrganizationCellComponent } from '../shared/organization-table/organization-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { UserGroupDetailsComponent } from './details/user-group-details.component';
import { UserGroupFormComponent } from './form/user-group-form.component';
import { ExistUserGroupGuard } from './guards/exist-user-group.guard';
import { UserGroupAssignedPermissionListComponent } from './permissions/assigned/user-group-assigned-permission-list.component';
import { UserGroupPermissionListComponent } from './permissions/user-group-permission-list.component';
import { UserGroupItemService } from './services/user-group-item.service';
import { UserGroupListService } from './services/user-group-list.service';
import { UserGroupRoutePageMetaResolver } from './services/user-group-route-page-meta.resolver';
import { UserGroupAssignedUserListComponent } from './users/assigned/user-group-assigned-user-list.component';
import { UserGroupUserListComponent } from './users/user-group-user-list.component';

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
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'userGroup.breadcrumbs.list',
              resolver: UserGroupRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: UserGroupFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.userGroupCode}`,
            component: UserGroupDetailsComponent,
            canActivate: [ExistUserGroupGuard],
            data: {
              cxPageMeta: { breadcrumb: 'userGroup.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: UserGroupFormComponent,
              },
              {
                path: 'users',
                data: {
                  cxPageMeta: { breadcrumb: 'userGroup.breadcrumbs.users' },
                },
                children: [
                  {
                    path: '',
                    component: UserGroupAssignedUserListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserGroupUserListComponent,
                  },
                ],
              },
              {
                path: 'purchase-limits',
                data: {
                  cxPageMeta: {
                    breadcrumb: 'userGroup.breadcrumbs.permissions',
                  },
                },
                children: [
                  {
                    path: '',
                    component: UserGroupAssignedPermissionListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserGroupPermissionListComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function userGroupTableConfigFactory(): TableConfig {
  return userGroupTableConfig;
}

export const userGroupTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER_GROUP]: {
      cells: ['name', 'uid', 'unit'],
      options: {
        dataComponent: OrganizationCellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          uid: {
            dataComponent: OrganizationCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.USER_GROUP_ASSIGNED_USERS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },

    [OrganizationTableType.USER_GROUP_USERS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.USER_GROUP_PERMISSIONS]: {
      cells: ['code', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS]: {
      cells: ['code', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
