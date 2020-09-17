import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/my-account/organization/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
// import { OrganizationItemService } from '../shared/organization-item.service';
// import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { AssignCellComponent } from '../shared/organization-sub-list/assign-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitFormComponent } from './form/unit-form.component';
import { ActiveUnitGuard } from './guards/active-unit.guard';
import { ExistUnitGuard } from './guards/exist-unit.guard';
import {
  UnitAddressDetailsComponent,
  UnitAddressListComponent,
  UnitCostCenterListComponent,
} from './links';
import { UnitAddressFormComponent } from './links/addresses/form';
import { LinkCellComponent } from './links/addresses/list/link-cell.component';
import { UnitApproverListComponent } from './links/approvers';
import { UnitAssignedApproverListComponent } from './links/approvers/assigned';
import { UnitChildrenComponent } from './links/children/unit-children.component';
import { ToggleUserRoleCellComponent } from './links/users/toggle-user-role/toggle-user-role.component';
import { UnitUserListComponent } from './links/users/unit-user-list.component';
// import { UnitItemService } from './services/unit-item.service';
// import { UnitListService } from './services/unit-list.service';
// import { OrganizationListComponent } from '../shared/organization-list';
import { ToggleLinkCellComponent } from '../shared/organization-table/toggle-link/toggle-link-cell.component';
import { UnitListComponent } from './list/unit-list.component';

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
  addressId: 'id',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnits: {
        paths: ['organization/units'],
      },
      unitCreate: {
        paths: ['organization/units/create'],
      },
      unitDetails: {
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
      orgUnitCreateChild: {
        paths: [`${listPath}/children/create`],
        paramsMapping,
      },
      orgUnitUsers: {
        paths: [`${listPath}/users`],
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

      unitAddressList: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      orgUnitAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      unitAddressDetails: {
        paths: [`${listPath}/addresses/:addressId`],
        paramsMapping,
      },
      unitAddressEdit: {
        paths: [`${listPath}/addresses/:addressId/edit`],
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
      component: UnitListComponent,
      // component: OrganizationListComponent,
      // providers: [
      //   {
      //     provide: OrganizationListService,
      //     useExisting: UnitListService,
      //   },
      //   {
      //     provide: OrganizationItemService,
      //     useExisting: UnitItemService,
      //   },
      // ],
      childRoutes: [
        {
          path: 'create',
          component: UnitFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.unitCode}`,
          component: UnitDetailsComponent,
          canActivate: [ExistUnitGuard],
          children: [
            {
              path: 'edit',
              component: UnitFormComponent,
              canActivate: [ActiveUnitGuard],
            },
            {
              path: 'children',
              component: UnitChildrenComponent,
              children: [
                {
                  path: 'create',
                  component: UnitFormComponent,
                },
              ],
            },
            {
              path: 'approvers',
              component: UnitAssignedApproverListComponent,
            },
            {
              path: 'approvers/assign',
              component: UnitApproverListComponent,
            },
            {
              path: 'users',
              component: UnitUserListComponent,
            },
            {
              path: 'cost-centers',
              component: UnitCostCenterListComponent,
            },
            {
              path: 'addresses',
              component: UnitAddressListComponent,
              children: [
                {
                  path: 'create',
                  component: UnitAddressFormComponent,
                },
                {
                  path: ':addressId',
                  component: UnitAddressDetailsComponent,
                },
                {
                  path: ':addressId/edit',
                  component: UnitAddressFormComponent,
                },
              ],
            },
          ],
        },
      ],

      guards: [AuthGuard, AdminGuard],
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
      cells: ['name', 'roles'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          roles: {
            dataComponent: ToggleUserRoleCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_CHILDREN]: {
      cells: ['name', 'active'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          active: {
            dataComponent: StatusCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_APPROVERS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
      cells: ['name', 'actions'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_COST_CENTERS]: {
      cells: ['name'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },

    [OrganizationTableType.UNIT_ADDRESS]: {
      cells: ['formattedAddress'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          formattedAddress: {
            dataComponent: LinkCellComponent,
          },
        },
      },
    },
  },
};
