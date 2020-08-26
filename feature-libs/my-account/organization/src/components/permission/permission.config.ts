import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { BaseOrganizationListService } from '../shared/base-organization-list.service';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { LimitCellComponent } from '../shared/organization-table/limit/limit-cell.component';
import { OrganizationCellComponent } from '../shared/organization-table/organization-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { PermissionCreateComponent } from './create/permission-create.component';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionEditComponent } from './edit';
import { CurrentPermissionService } from './services/current-permission.service';
import { PermissionListService } from './services/permission-list.service';

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
      component: OrganizationListComponent,
      providers: [
        {
          provide: BaseOrganizationListService,
          useExisting: PermissionListService,
        },
        {
          provide: CurrentOrganizationItemService,
          useExisting: CurrentPermissionService,
        },
      ],
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
        dataComponent: OrganizationCellComponent,
        fields: {
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
      lg: {
        fields: ['code', 'active', 'limit', 'unit'],
      },
    },
  },
};
