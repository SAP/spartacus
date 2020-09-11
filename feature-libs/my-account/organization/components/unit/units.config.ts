import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
import { StatusCellComponent } from '../shared';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { AssignCellComponent } from '../shared/organization-sub-list/assign-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
// import { UnitAddressCreateComponent } from './addresses/create/unit-address-create.component';
// import { UnitAddressDetailsComponent } from './addresses/details/unit-address-details.component';
// import { UnitAddressEditComponent } from './addresses/edit/unit-address-edit.component';
// import { UnitAddressListComponent } from './addresses/list/unit-address-list.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitFormComponent } from './form/unit-form.component';
import { UnitCostCenterListComponent } from './links';
import { UnitApproverListComponent } from './links/approvers';
import { UnitAssignedApproverListComponent } from './links/approvers/assigned';
import { UnitChildrenComponent } from './links/children/unit-children.component';
import { ToggleUserRoleCellComponent } from './links/users/toggle-user-role/toggle-user-role.component';
import { UnitUserListComponent } from './links/users/unit-user-list.component';
import { UnitListComponent } from './list/unit-list.component';
import { UnitItemService } from './services/unit-item.service';
import { UnitListService } from './services/unit-list.service';

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
      component: UnitListComponent,
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

            // {
            //   path: 'addresses',
            //   component: UnitAddressListComponent,
            //   children: [
            //     {
            //       path: 'create',
            //       component: UnitAddressCreateComponent,
            //     },
            //     {
            //       path: ':id',
            //       component: UnitAddressDetailsComponent,
            //       children: [
            //         {
            //           path: 'edit',
            //           component: UnitAddressEditComponent,
            //         },
            //       ],
            //     },
            //   ],
            // },
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

    [OrganizationTableType.UNIT_MANAGE_ADDRESSES]: {
      cells: ['summary'],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
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
  },
};
