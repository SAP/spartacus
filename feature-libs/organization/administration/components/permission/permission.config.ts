import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { LimitCellComponent } from '../shared/table/limit/limit-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionFormComponent } from './form/permission-form.component';
import { PermissionItemService } from './services/permission-item.service';
import { PermissionListService } from './services/permission-list.service';
import { PermissionRoutePageMetaResolver } from './services/permission-route-page-meta.resolver';

const listPath = `organization/purchase-limits/:${ROUTE_PARAMS.permissionCode}`;
const paramsMapping: ParamsMapping = {
  permissionCode: 'code',
};

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
      component: ListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: PermissionListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: PermissionItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'permission.breadcrumbs.list',
              resolver: PermissionRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: PermissionFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.permissionCode}`,
            component: PermissionDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'permission.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: PermissionFormComponent,
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function permissionTableConfigFactory(): TableConfig {
  return permissionTableConfig;
}

export const permissionTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.PERMISSION]: {
      cells: ['code', 'active', 'limit', 'unit'],
      options: {
        cells: {
          code: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
          limit: {
            dataComponent: LimitCellComponent,
          },
        },
      },
    },
  },
};
