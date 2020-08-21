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
import { PermissionCreateComponent } from './create/permission-create.component';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionEditComponent } from './edit';
import { PermissionListComponent } from './list/permission-list.component';

const listPath = `organization/purchase-limits/:${ROUTE_PARAMS.permissionCode}`;
const paramsMapping: ParamsMapping = {
  permissionCode: 'code',
};

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
        paths: [`${listPath}`],
        paramsMapping,
      },
      permissionEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
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
          path: `:${ROUTE_PARAMS.permissionCode}`,
          component: PermissionDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: `:${ROUTE_PARAMS.permissionCode}/edit`,
          component: PermissionEditComponent,
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
