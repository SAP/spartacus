import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { ActiveLinkCellComponent } from '../shared/organization-table/active-link/active-link-cell.component';
import { LimitCellComponent } from '../shared/organization-table/limit/limit-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionFormComponent } from './form/permission-form.component';
import { ActivePermissionGuard } from './guards/active-permission.guard';
import { ExistPermissionGuard } from './guards/exist-permission.guard';
import { PermissionItemService } from './services/permission-item.service';
import { PermissionListService } from './services/permission-list.service';

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
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: PermissionListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: PermissionItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: PermissionFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.permissionCode}`,
          component: PermissionDetailsComponent,
          canActivate: [ExistPermissionGuard],
          children: [
            {
              path: 'edit',
              component: PermissionFormComponent,
              canActivate: [ActivePermissionGuard],
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
