import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { ActivePermissionGuard } from './active-permission.guard';
import { PermissionCreateComponent } from './create/permission-create.component';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionEditComponent } from './edit';
import { ExistPermissionGuard } from './exist-permission.guard';
import { PermissionListComponent } from './list/permission-list.component';

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
      permissionEdit: {
        paths: ['organization/purchase-limits/edit/:code'],
      },
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
          canActivate: [ExistPermissionGuard],
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: 'edit/:code',
          component: PermissionEditComponent,
          canActivate: [ActivePermissionGuard],
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
      {
        pagination: {
          sort: 'byCode',
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        headers: [{ key: 'name' }],
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
