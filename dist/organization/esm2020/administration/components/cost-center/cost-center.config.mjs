/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { BudgetDetailsCellComponent } from '../budget/details-cell/budget-details-cell.component';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { CostCenterAssignedBudgetListComponent } from './budgets/assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './budgets/cost-center-budget-list.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterFormComponent } from './form/cost-center-form.component';
import { CostCenterItemService } from './services/cost-center-item.service';
import { CostCenterListService } from './services/cost-center-list.service';
import { CostCenterRoutePageMetaResolver } from './services/cost-center-route-page-meta.resolver';
export const costCenterCmsConfig = {
    cmsComponents: {
        ManageCostCentersListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: CostCenterListService,
                },
                {
                    provide: ItemService,
                    useExisting: CostCenterItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgCostCenter.breadcrumbs.list',
                            resolver: CostCenterRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: CostCenterFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.costCenterCode}`,
                        component: CostCenterDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgCostCenter.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: CostCenterFormComponent,
                            },
                            {
                                path: 'budgets',
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgCostCenter.breadcrumbs.budgets',
                                    },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: CostCenterAssignedBudgetListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: CostCenterBudgetListComponent,
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
export function costCenterTableConfigFactory() {
    return costCenterTableConfig;
}
export const costCenterTableConfig = {
    table: {
        [OrganizationTableType.COST_CENTER]: {
            cells: ['name', 'active', 'currency', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    currency: {
                        dataComponent: CellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: BudgetDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
            },
        },
        [OrganizationTableType.COST_CENTER_BUDGETS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: BudgetDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL2Nvc3QtY2VudGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUN0SCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUs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TyxFQUFFO3dCQUNQLGFBQWEsRUFBRSxtQkFBbUI7cUJBQ25DO2lCQUNGO2dCQUNELFVBQVUsRUFBRTtvQkFDVixRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzthQUNGO1NBQ0Y7UUFFRCxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDM0MsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUMxQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsMEJBQTBCO3FCQUMxQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYSxFQUFFLG1CQUFtQjtxQkFDbkM7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBUYWJsZUNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCdWRnZXREZXRhaWxzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL2J1ZGdldC9kZXRhaWxzLWNlbGwvYnVkZ2V0LWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTUFYX09DQ19JTlRFR0VSX1ZBTFVFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2xpc3QvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBc3NpZ25DZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3N1Yi1saXN0L2Fzc2lnbi1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9hY3RpdmUtbGluay9hY3RpdmUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL2NlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXR1c0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvc3RhdHVzL3N0YXR1cy1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0Q2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS91bml0L3VuaXQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29zdENlbnRlckFzc2lnbmVkQnVkZ2V0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vYnVkZ2V0cy9hc3NpZ25lZC9jb3N0LWNlbnRlci1hc3NpZ25lZC1idWRnZXQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29zdENlbnRlckJ1ZGdldExpc3RDb21wb25lbnQgfSBmcm9tICcuL2J1ZGdldHMvY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvc3RDZW50ZXJEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWxzL2Nvc3QtY2VudGVyLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IENvc3RDZW50ZXJGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Nvc3QtY2VudGVyLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IENvc3RDZW50ZXJJdGVtU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29zdC1jZW50ZXItaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IENvc3RDZW50ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29zdC1jZW50ZXItbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IENvc3RDZW50ZXJSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Nvc3QtY2VudGVyLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5cbmV4cG9ydCBjb25zdCBjb3N0Q2VudGVyQ21zQ29uZmlnOiBDbXNDb25maWcgPSB7XG4gIGNtc0NvbXBvbmVudHM6IHtcbiAgICBNYW5hZ2VDb3N0Q2VudGVyc0xpc3RDb21wb25lbnQ6IHtcbiAgICAgIGNvbXBvbmVudDogTGlzdENvbXBvbmVudCxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IENvc3RDZW50ZXJMaXN0U2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBDb3N0Q2VudGVySXRlbVNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgY2hpbGRSb3V0ZXM6IHtcbiAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY3hQYWdlTWV0YToge1xuICAgICAgICAgICAgICBicmVhZGNydW1iOiAnb3JnQ29zdENlbnRlci5icmVhZGNydW1icy5saXN0JyxcbiAgICAgICAgICAgICAgcmVzb2x2ZXI6IENvc3RDZW50ZXJSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2NyZWF0ZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IENvc3RDZW50ZXJGb3JtQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogYDoke1JPVVRFX1BBUkFNUy5jb3N0Q2VudGVyQ29kZX1gLFxuICAgICAgICAgICAgY29tcG9uZW50OiBDb3N0Q2VudGVyRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgY3hQYWdlTWV0YTogeyBicmVhZGNydW1iOiAnb3JnQ29zdENlbnRlci5icmVhZGNydW1icy5kZXRhaWxzJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnZWRpdCcsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3N0Q2VudGVyRm9ybUNvbXBvbmVudCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdidWRnZXRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdDb3N0Q2VudGVyLmJyZWFkY3J1bWJzLmJ1ZGdldHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldExpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnYXNzaWduJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb3N0Q2VudGVyQnVkZ2V0TGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdLFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29zdENlbnRlclRhYmxlQ29uZmlnRmFjdG9yeSgpOiBUYWJsZUNvbmZpZyB7XG4gIHJldHVybiBjb3N0Q2VudGVyVGFibGVDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBjb3N0Q2VudGVyVGFibGVDb25maWc6IFRhYmxlQ29uZmlnID0ge1xuICB0YWJsZToge1xuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuQ09TVF9DRU5URVJdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGl2ZScsICdjdXJyZW5jeScsICd1bml0J10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQWN0aXZlTGlua0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFN0YXR1c0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVuaXRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLkNPU1RfQ0VOVEVSX0FTU0lHTkVEX0JVREdFVFNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBCdWRnZXREZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IEFzc2lnbkNlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIHBhZ2VTaXplOiBNQVhfT0NDX0lOVEVHRVJfVkFMVUUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLkNPU1RfQ0VOVEVSX0JVREdFVFNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBCdWRnZXREZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IEFzc2lnbkNlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=