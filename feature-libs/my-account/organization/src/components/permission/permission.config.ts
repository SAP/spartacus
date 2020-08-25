import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { LimitComponent } from '../shared/property-renderers/limit/limit.component';
import { OrganizationLinkComponent } from '../shared/property-renderers/organization-link.component';
import { StatusComponent } from '../shared/property-renderers/status/status.component';
import { UnitComponent } from '../shared/property-renderers/unit/unit.component';
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
        paths: [listPath],
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
    [OrganizationTableType.PERMISSION]: {
      fields: ['name'],
      options: {
        pagination: {
          sort: 'byCode',
        },
        dataRenderer: OrganizationLinkComponent,
        fields: {
          active: {
            dataRenderer: StatusComponent,
          },
          unit: {
            dataRenderer: UnitComponent,
          },
          limit: {
            dataRenderer: LimitComponent,
          },
        },
      },
      lg: {
        fields: ['code', 'active', 'limit', 'unit'],
      },
    },
  },
};
