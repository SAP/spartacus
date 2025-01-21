/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { AuthGuard, CmsConfig, FeatureToggles } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { PermissionDetailsCellComponent } from '../permission/details-cell/permission-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserDetailsCellComponent } from '../user/details-cell/user-details-cell.component';
import { UserGroupDetailsComponent } from './details/user-group-details.component';
import { UserGroupFormComponent } from './form/user-group-form.component';
import { UserGroupAssignedPermissionListComponent } from './permissions/assigned/user-group-assigned-permission-list.component';
import { UserGroupPermissionListComponent } from './permissions/user-group-permission-list.component';
import { UserGroupItemService } from './services/user-group-item.service';
import { UserGroupListService } from './services/user-group-list.service';
import { UserGroupRoutePageMetaResolver } from './services/user-group-route-page-meta.resolver';
import { UserGroupAssignedUserListComponent } from './users/assigned/user-group-assigned-user-list.component';
import { UserGroupUserListComponent } from './users/user-group-user-list.component';

export const userGroupCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUserGroupsListComponent: {
      component: ListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: UserGroupListService,
        },
        {
          provide: ItemService,
          useExisting: UserGroupItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUserGroup.breadcrumbs.list',
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
            data: {
              cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: UserGroupFormComponent,
              },
              {
                path: 'users',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.users' },
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
                    breadcrumb: 'orgUserGroup.breadcrumbs.permissions',
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
  // TODO: (CXSPA-7155) - Remove feature flag and legacy config next major release
  const featureToggles = inject(FeatureToggles);
  if (featureToggles.a11yOrganizationLinkableCells) {
    return newUserGroupTableConfig;
  }
  return userGroupTableConfig;
}

export const newUserGroupTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER_GROUP]: {
      cells: ['name', 'uid', 'unit'],
      options: {
        dataComponent: CellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
            linkable: true,
          },
          uid: {
            dataComponent: CellComponent,
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
          name: {
            dataComponent: UserDetailsCellComponent,
          },
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
          name: {
            dataComponent: UserDetailsCellComponent,
          },
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
          code: {
            dataComponent: PermissionDetailsCellComponent,
          },
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
          code: {
            dataComponent: PermissionDetailsCellComponent,
          },
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

export const userGroupTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER_GROUP]: {
      cells: ['name', 'uid', 'unit'],
      options: {
        dataComponent: CellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          uid: {
            dataComponent: CellComponent,
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
          name: {
            dataComponent: UserDetailsCellComponent,
          },
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
          name: {
            dataComponent: UserDetailsCellComponent,
          },
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
          code: {
            dataComponent: PermissionDetailsCellComponent,
          },
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
          code: {
            dataComponent: PermissionDetailsCellComponent,
          },
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
