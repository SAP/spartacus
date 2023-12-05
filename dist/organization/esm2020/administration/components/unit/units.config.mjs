/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard, OrgUnitGuard, UserGuard, } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { BREAKPOINT, TableLayout } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { CostCenterDetailsCellComponent } from '../cost-center/details-cell/cost-center-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserDetailsCellComponent } from '../user/details-cell/user-details-cell.component';
import { UnitDetailsCellComponent } from './details-cell/unit-details-cell.component';
import { UnitDetailsComponent } from './details/unit-details.component';
import { UnitFormComponent } from './form/unit-form.component';
import { UnitAddressDetailsComponent } from './links/addresses/details/unit-address-details.component';
import { UnitAddressFormComponent } from './links/addresses/form/unit-address-form.component';
import { LinkCellComponent } from './links/addresses/list/link-cell.component';
import { UnitAddressListComponent } from './links/addresses/list/unit-address-list.component';
import { UnitAssignedApproverListComponent } from './links/approvers/assigned/unit-assigned-approver-list.component';
import { UnitApproverListComponent } from './links/approvers/unit-approver-list.component';
import { UnitChildCreateComponent } from './links/children/create/unit-child-create.component';
import { UnitChildrenComponent } from './links/children/unit-children.component';
import { UnitCostCenterListComponent } from './links/cost-centers/unit-cost-centers.component';
import { UnitCostCenterCreateComponent, UnitUserCreateComponent, } from './links/index';
import { UnitUserRolesCellComponent } from './links/users/list/unit-user-link-cell.component';
import { UnitUserListComponent } from './links/users/list/unit-user-list.component';
import { UnitUserRolesFormComponent } from './links/users/roles/unit-user-roles.component';
import { ToggleLinkCellComponent } from './list/toggle-link/toggle-link-cell.component';
import { UnitListComponent } from './list/unit-list.component';
import { UnitAddressRoutePageMetaResolver } from './services/unit-address-route-page-meta.resolver';
import { UnitItemService } from './services/unit-item.service';
import { UnitListService } from './services/unit-list.service';
import { UnitRoutePageMetaResolver } from './services/unit-route-page-meta.resolver';
export const unitsCmsConfig = {
    cmsComponents: {
        ManageUnitsListComponent: {
            component: UnitListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UnitListService,
                },
                {
                    provide: ItemService,
                    useExisting: UnitItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUnit.breadcrumbs.list',
                            resolver: UnitRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UnitFormComponent,
                        canActivate: [OrgUnitGuard],
                    },
                    {
                        path: `:${ROUTE_PARAMS.unitCode}`,
                        component: UnitDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: UnitFormComponent,
                                canActivate: [OrgUnitGuard],
                            },
                            {
                                path: 'children',
                                component: UnitChildrenComponent,
                                canActivate: [OrgUnitGuard],
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.children' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitChildCreateComponent,
                                    },
                                ],
                            },
                            {
                                path: 'approvers',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.approvers' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UnitAssignedApproverListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UnitApproverListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'users',
                                component: UnitUserListComponent,
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.users' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitUserCreateComponent,
                                        canActivate: [UserGuard],
                                    },
                                    {
                                        path: `:${ROUTE_PARAMS.userCode}/roles`,
                                        component: UnitUserRolesFormComponent,
                                        canActivate: [UserGuard],
                                    },
                                ],
                            },
                            {
                                path: 'cost-centers',
                                component: UnitCostCenterListComponent,
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.costCenters' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitCostCenterCreateComponent,
                                    },
                                ],
                            },
                            {
                                path: 'addresses',
                                component: UnitAddressListComponent,
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgUnit.breadcrumbs.addresses',
                                        resolver: UnitAddressRoutePageMetaResolver,
                                    },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitAddressFormComponent,
                                    },
                                    {
                                        path: `:${ROUTE_PARAMS.addressCode}`,
                                        data: {
                                            cxPageMeta: {
                                                breadcrumb: 'orgUnit.breadcrumbs.addressDetails',
                                            },
                                        },
                                        children: [
                                            {
                                                path: '',
                                                component: UnitAddressDetailsComponent,
                                            },
                                            {
                                                path: 'edit',
                                                component: UnitAddressFormComponent,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
export function unitsTableConfigFactory() {
    return unitsTableConfig;
}
export const unitsTableConfig = {
    table: {
        [OrganizationTableType.UNIT]: {
            cells: ['name'],
            options: {
                layout: TableLayout.VERTICAL,
                cells: {
                    name: {
                        dataComponent: ToggleLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                },
            },
            [BREAKPOINT.lg]: {
                cells: ['name', 'active', 'uid'],
            },
        },
        [OrganizationTableType.UNIT_USERS]: {
            cells: ['name', 'roles'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    roles: {
                        dataComponent: UnitUserRolesCellComponent,
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
                    name: {
                        dataComponent: UnitDetailsCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_APPROVERS]: {
            cells: ['name', 'orgUnit', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                    orgUnit: {
                        dataComponent: UnitCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
            cells: ['name', 'orgUnit', 'actions'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                    orgUnit: {
                        dataComponent: UnitCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_COST_CENTERS]: {
            cells: ['name'],
            options: {
                cells: {
                    name: {
                        dataComponent: CostCenterDetailsCellComponent,
                    },
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvdW5pdHMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUNMLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxHQUNWLE1BQU0sNkNBQTZDLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQWUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxv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aUI7d0JBQ2hDLFFBQVEsRUFBRSxLQUFLO3FCQUNoQjtpQkFDRjthQUNGO1NBQ0Y7UUFFRCxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDL0MsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDckMsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRTtvQkFDVixRQUFRLEVBQUUscUJBQXFCO2lCQUNoQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSx3QkFBd0I7cUJBQ3hDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxhQUFhLEVBQUUsbUJBQW1CO3FCQUNuQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYSxFQUFFLGlCQUFpQjt3QkFDaEMsUUFBUSxFQUFFLEtBQUs7cUJBQ2hCO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN6QyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsOEJBQThCO3FCQUM5QztpQkFDRjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7YUFDRjtTQUNGO1FBRUQsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNwQyxLQUFLLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFO29CQUNWLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDO2dCQUNELEtBQUssRUFBRTtvQkFDTCxnQkFBZ0IsRUFBRTt3QkFDaEIsYUFBYSxFQUFFLGlCQUFpQjtxQkFDakM7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWRtaW5HdWFyZCxcbiAgT3JnVW5pdEd1YXJkLFxuICBVc2VyR3VhcmQsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBCUkVBS1BPSU5ULCBUYWJsZUNvbmZpZywgVGFibGVMYXlvdXQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgTUFYX09DQ19JTlRFR0VSX1ZBTFVFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENvc3RDZW50ZXJEZXRhaWxzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL2Nvc3QtY2VudGVyL2RldGFpbHMtY2VsbC9jb3N0LWNlbnRlci1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFzc2lnbkNlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvc3ViLWxpc3QvYXNzaWduLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhdHVzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9zdGF0dXMvc3RhdHVzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3VuaXQvdW5pdC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyRGV0YWlsc0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi91c2VyL2RldGFpbHMtY2VsbC91c2VyLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdERldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWxzLWNlbGwvdW5pdC1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXREZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWxzL3VuaXQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vdW5pdC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0QWRkcmVzc0RldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2FkZHJlc3Nlcy9kZXRhaWxzL3VuaXQtYWRkcmVzcy1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0QWRkcmVzc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2FkZHJlc3Nlcy9mb3JtL3VuaXQtYWRkcmVzcy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vbGlua3MvYWRkcmVzc2VzL2xpc3QvbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0QWRkcmVzc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2FkZHJlc3Nlcy9saXN0L3VuaXQtYWRkcmVzcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0QXNzaWduZWRBcHByb3Zlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2FwcHJvdmVycy9hc3NpZ25lZC91bml0LWFzc2lnbmVkLWFwcHJvdmVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRBcHByb3Zlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2FwcHJvdmVycy91bml0LWFwcHJvdmVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDaGlsZENyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vbGlua3MvY2hpbGRyZW4vY3JlYXRlL3VuaXQtY2hpbGQtY3JlYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0Q2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL2xpbmtzL2NoaWxkcmVuL3VuaXQtY2hpbGRyZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDb3N0Q2VudGVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlua3MvY29zdC1jZW50ZXJzL3VuaXQtY29zdC1jZW50ZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBVbml0Q29zdENlbnRlckNyZWF0ZUNvbXBvbmVudCxcbiAgVW5pdFVzZXJDcmVhdGVDb21wb25lbnQsXG59IGZyb20gJy4vbGlua3MvaW5kZXgnO1xuaW1wb3J0IHsgVW5pdFVzZXJSb2xlc0NlbGxDb21wb25lbnQgfSBmcm9tICcuL2xpbmtzL3VzZXJzL2xpc3QvdW5pdC11c2VyLWxpbmstY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdFVzZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saW5rcy91c2Vycy9saXN0L3VuaXQtdXNlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0VXNlclJvbGVzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vbGlua3MvdXNlcnMvcm9sZXMvdW5pdC11c2VyLXJvbGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC90b2dnbGUtbGluay90b2dnbGUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC91bml0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRBZGRyZXNzUm91dGVQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy91bml0LWFkZHJlc3Mtcm91dGUtcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7IFVuaXRJdGVtU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdW5pdC1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdExpc3RTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91bml0LWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBVbml0Um91dGVQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy91bml0LXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5cbmV4cG9ydCBjb25zdCB1bml0c0Ntc0NvbmZpZzogQ21zQ29uZmlnID0ge1xuICBjbXNDb21wb25lbnRzOiB7XG4gICAgTWFuYWdlVW5pdHNMaXN0Q29tcG9uZW50OiB7XG4gICAgICBjb21wb25lbnQ6IFVuaXRMaXN0Q29tcG9uZW50LFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogVW5pdExpc3RTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IFVuaXRJdGVtU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjaGlsZFJvdXRlczoge1xuICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdVbml0LmJyZWFkY3J1bWJzLmxpc3QnLFxuICAgICAgICAgICAgICByZXNvbHZlcjogVW5pdFJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogVW5pdEZvcm1Db21wb25lbnQsXG4gICAgICAgICAgICBjYW5BY3RpdmF0ZTogW09yZ1VuaXRHdWFyZF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLnVuaXRDb2RlfWAsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFVuaXREZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVbml0LmJyZWFkY3J1bWJzLmRldGFpbHMnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdlZGl0JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbT3JnVW5pdEd1YXJkXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdjaGlsZHJlbicsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBVbml0Q2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtPcmdVbml0R3VhcmRdLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGN4UGFnZU1ldGE6IHsgYnJlYWRjcnVtYjogJ29yZ1VuaXQuYnJlYWRjcnVtYnMuY2hpbGRyZW4nIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVbml0Q2hpbGRDcmVhdGVDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnYXBwcm92ZXJzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVbml0LmJyZWFkY3J1bWJzLmFwcHJvdmVycycgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdhc3NpZ24nLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRBcHByb3Zlckxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAndXNlcnMnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVW5pdFVzZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGN4UGFnZU1ldGE6IHsgYnJlYWRjcnVtYjogJ29yZ1VuaXQuYnJlYWRjcnVtYnMudXNlcnMnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVbml0VXNlckNyZWF0ZUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtVc2VyR3VhcmRdLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogYDoke1JPVVRFX1BBUkFNUy51c2VyQ29kZX0vcm9sZXNgLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRVc2VyUm9sZXNGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICBjYW5BY3RpdmF0ZTogW1VzZXJHdWFyZF0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnY29zdC1jZW50ZXJzJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRDb3N0Q2VudGVyTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVbml0LmJyZWFkY3J1bWJzLmNvc3RDZW50ZXJzJyB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2NyZWF0ZScsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVW5pdENvc3RDZW50ZXJDcmVhdGVDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnYWRkcmVzc2VzJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVuaXRBZGRyZXNzTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdVbml0LmJyZWFkY3J1bWJzLmFkZHJlc3NlcycsXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVyOiBVbml0QWRkcmVzc1JvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVbml0QWRkcmVzc0Zvcm1Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLmFkZHJlc3NDb2RlfWAsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iOiAnb3JnVW5pdC5icmVhZGNydW1icy5hZGRyZXNzRGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVW5pdEFkZHJlc3NEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2VkaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVbml0QWRkcmVzc0Zvcm1Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdLFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdW5pdHNUYWJsZUNvbmZpZ0ZhY3RvcnkoKTogVGFibGVDb25maWcge1xuICByZXR1cm4gdW5pdHNUYWJsZUNvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IHVuaXRzVGFibGVDb25maWc6IFRhYmxlQ29uZmlnID0ge1xuICB0YWJsZToge1xuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVU5JVF06IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbGF5b3V0OiBUYWJsZUxheW91dC5WRVJUSUNBTCxcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogU3RhdHVzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpZDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFtCUkVBS1BPSU5ULmxnXToge1xuICAgICAgICBjZWxsczogWyduYW1lJywgJ2FjdGl2ZScsICd1aWQnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVRfVVNFUlNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ3JvbGVzJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBwYWdlU2l6ZTogTUFYX09DQ19JTlRFR0VSX1ZBTFVFLFxuICAgICAgICB9LFxuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVzZXJEZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGVzOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBVbml0VXNlclJvbGVzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VTklUX0NISUxEUkVOXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3RpdmUnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIHBhZ2VTaXplOiBNQVhfT0NDX0lOVEVHRVJfVkFMVUUsXG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVW5pdERldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBTdGF0dXNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgICAgbGlua2FibGU6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVRfQVBQUk9WRVJTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdvcmdVbml0JywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBVc2VyRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBBc3NpZ25DZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JnVW5pdDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVW5pdENlbGxDb21wb25lbnQsXG4gICAgICAgICAgICBsaW5rYWJsZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVU5JVF9BU1NJR05FRF9BUFBST1ZFUlNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ29yZ1VuaXQnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgcGFnZVNpemU6IE1BWF9PQ0NfSU5URUdFUl9WQUxVRSxcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBVc2VyRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBBc3NpZ25DZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3JnVW5pdDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVW5pdENlbGxDb21wb25lbnQsXG4gICAgICAgICAgICBsaW5rYWJsZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVU5JVF9DT1NUX0NFTlRFUlNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQ29zdENlbnRlckRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBwYWdlU2l6ZTogTUFYX09DQ19JTlRFR0VSX1ZBTFVFLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VTklUX0FERFJFU1NdOiB7XG4gICAgICBjZWxsczogWydmb3JtYXR0ZWRBZGRyZXNzJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBwYWdlU2l6ZTogTUFYX09DQ19JTlRFR0VSX1ZBTFVFLFxuICAgICAgICB9LFxuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIGZvcm1hdHRlZEFkZHJlc3M6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IExpbmtDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19