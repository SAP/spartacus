import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { UnitAddressCreateComponent } from './addresses/create/unit-address-create.component';
import { UnitAddressDetailsComponent } from './addresses/details/unit-address-details.component';
import { UnitAddressEditComponent } from './addresses/edit/unit-address-edit.component';
import { UnitAddressListComponent } from './addresses/list/unit-address-list.component';
import { UnitAssignApproversComponent } from './approvers/assign/unit-assign-approvers.component';
import { UnitApproverListComponent } from './approvers/list/unit-approver-list.component';
import { UnitChildrenComponent } from './children/unit-children.component';
import { UnitCostCentersComponent } from './cost-centers/unit-cost-centers.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitFormComponent } from './form';
import { UnitItemService } from './services/unit-item.service';
import { UnitListService } from './services/unit-list.service';
import { UnitUserAssignRolesComponent } from './users/assign-roles/unit-user-assign-roles.component';
import { UnitUserListComponent } from './users/list/unit-user-list.component';
// import { UnitListComponent } from './list/unit-list.component';
import { OrganizationListComponent } from '../shared/organization-list';
import { ToggleLinkCellComponent } from '../shared/organization-table/toggle-link/toggle-link-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnits: {
        paths: ['organization/units'],
      },
      orgUnitCreate: {
        paths: ['organization/units/create'],
      },
      orgUnitDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUnitEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUnitChildren: {
        paths: [`${listPath}/children`],
        paramsMapping,
      },
      orgUnitUsers: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      orgUnitAssignRoles: {
        paths: [`${listPath}/users/roles/assign`],
        paramsMapping,
      },
      orgUnitApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgUnitAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgUnitManageAddresses: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      orgUnitAddressDetails: {
        paths: [`${listPath}/addresses/:id`],
        paramsMapping,
      },
      orgUnitAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      orgUnitAddressEdit: {
        paths: [`${listPath}/addresses/:id/edit`],
        paramsMapping,
      },
      orgUnitCostCenters: {
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
          component: UnitFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}`,
          component: UnitDetailsComponent,
          children: [
            {
              path: 'edit',
              component: UnitFormComponent,
            },

            {
              path: 'children',
              component: UnitChildrenComponent,
            },
            {
              path: 'users',
              component: UnitUserListComponent,
              children: [
                {
                  path: 'roles/assign',
                  component: UnitUserAssignRolesComponent,
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitApproverListComponent,
              children: [
                {
                  path: 'assign',
                  component: UnitAssignApproversComponent,
                },
              ],
            },
            {
              path: 'addresses',
              component: UnitAddressListComponent,
              children: [
                {
                  path: 'create',
                  component: UnitAddressCreateComponent,
                },
                {
                  path: ':id',
                  component: UnitAddressDetailsComponent,
                  children: [
                    {
                      path: 'edit',
                      component: UnitAddressEditComponent,
                    },
                  ],
                },
              ],
            },
            {
              path: 'cost-centers',
              component: UnitCostCentersComponent,
            },
          ],
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
    [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
      cells: ['selected', 'summary', 'link'],
      options: {
        pagination: {
          sort: 'byName',
        },
      },
      lg: {
        cells: ['name', 'email', 'roles', 'orgUnit'],
        options: {},
      },
    },
    [OrganizationTableType.UNIT_ASSIGNED_ROLES]: {
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
