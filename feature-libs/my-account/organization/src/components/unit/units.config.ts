import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { UnitAddressCreateComponent } from './addresses/create/unit-address-create.component';
import { UnitAddressDetailsComponent } from './addresses/details/unit-address-details.component';
import { UnitAddressEditComponent } from './addresses/edit/unit-address-edit.component';
import { UnitAddressListComponent } from './addresses/list/unit-address-list.component';
import { UnitAssignApproversComponent } from './approvers/assign/unit-assign-approvers.component';
import { UnitApproverListComponent } from './approvers/list/unit-approver-list.component';
import { UnitChildrenComponent } from './children/unit-children.component';
import { UnitCostCentersComponent } from './cost-centers/unit-cost-centers.component';
import { UnitCreateComponent } from './create/unit-create.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitEditComponent } from './edit/unit-edit.component';
import { UnitUserAssignRolesComponent } from './users/assign-roles/unit-user-assign-roles.component';
import { UnitUserListComponent } from './users/list/unit-user-list.component';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { UnitListService } from './services/unit-list.service';
import { OrganizationItemService } from '../shared/organization-item.service';
import { UnitItemService } from './services/unit-item.service';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { ToggleLinkCellComponent } from '../shared/organization-table/toggle-link/toggle-link-cell.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      unit: {
        paths: ['organization/units'],
      },
      unitCreate: {
        paths: ['organization/units/create'],
      },
      unitDetails: {
        paths: [listPath],
        paramsMapping,
      },
      unitEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      unitChildren: {
        paths: [`${listPath}/children`],
        paramsMapping,
      },
      unitUsers: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      unitAssignRoles: {
        paths: [`${listPath}/users/roles/assign`],
        paramsMapping,
      },
      unitApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      unitAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      unitManageAddresses: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      unitAddressDetails: {
        paths: [`${listPath}/addresses/:id`],
        paramsMapping,
      },
      unitAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      unitAddressEdit: {
        paths: [`${listPath}/addresses/:id/edit`],
        paramsMapping,
      },
      unitCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
    },
  },
};

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: UnitListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: UnitItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: UnitCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}`,
          component: UnitDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'children',
              component: UnitChildrenComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'users',
              component: UnitUserListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'roles/assign',
                  component: UnitUserAssignRolesComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitApproverListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: UnitAssignApproversComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
            {
              path: 'addresses',
              component: UnitAddressListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'create',
                  component: UnitAddressCreateComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
                {
                  path: ':id',
                  component: UnitAddressDetailsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                  children: [
                    {
                      path: 'edit',
                      component: UnitAddressEditComponent,
                      canDeactivate: [SplitViewDeactivateGuard],
                    },
                  ],
                },
              ],
            },
            {
              path: 'cost-centers',
              component: UnitCostCentersComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}/edit`,
          component: UnitEditComponent,
        },
      ],

      guards: [AuthGuard],
    },
  },
};

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT]: {
      cells: ['name', 'active', 'uid'],
      options: {
        cells: {
          name: {
            dataComponent: ToggleLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.UNIT_USERS]: {
      cells: ['summary', 'link'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_CHILDREN]: {
      cells: ['summary', 'link'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_APPROVERS]: {
      cells: ['summary', 'link', 'unassign'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_ASSIGN_APPROVERS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        cells: ['name', 'email', 'roles', 'unit'],
        options: {},
      },
    },
    [OrganizationTableType.UNIT_ASSIGN_ROLES]: {
      cells: ['summary', 'link'],
      options: {
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        cells: [
          'name',
          'email',
          'roleCustomer',
          'roleApprover',
          'roleManager',
          'roleAdministrator',
        ],
        options: {},
      },
    },
    [OrganizationTableType.UNIT_MANAGE_ADDRESSES]: {
      cells: ['summary'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.UNIT_COST_CENTERS]: {
      cells: ['summary', 'link'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
