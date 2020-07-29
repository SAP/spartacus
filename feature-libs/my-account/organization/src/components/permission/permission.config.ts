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
import { PermissionEditComponent } from './edit';

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
      permissionEdit: {
        paths: ['organization/purchase-limits/:code/edit'],
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
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: PermissionEditComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
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
  },
};
