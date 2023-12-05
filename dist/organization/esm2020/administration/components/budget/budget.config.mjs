/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { CostCenterDetailsCellComponent } from '../cost-center/details-cell/cost-center-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { ActiveLinkCellComponent } from '../shared/table';
import { AmountCellComponent } from '../shared/table/amount/amount-cell.component';
import { DateRangeCellComponent } from '../shared/table/date-range/date-range-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { BudgetCostCenterListComponent } from './cost-centers/budget-cost-center-list.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetFormComponent } from './form/budget-form.component';
import { BudgetItemService } from './services/budget-item.service';
import { BudgetListService } from './services/budget-list.service';
import { BudgetRoutePageMetaResolver } from './services/budget-route-page-meta.resolver';
export const budgetCmsConfig = {
    cmsComponents: {
        ManageBudgetsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: BudgetListService,
                },
                {
                    provide: ItemService,
                    useExisting: BudgetItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgBudget.breadcrumbs.list',
                            resolver: BudgetRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: BudgetFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.budgetCode}`,
                        component: BudgetDetailsComponent,
                        data: {
                            cxPageMeta: {
                                breadcrumb: 'orgBudget.breadcrumbs.details',
                            },
                        },
                        children: [
                            {
                                path: `edit`,
                                component: BudgetFormComponent,
                            },
                            {
                                path: 'cost-centers',
                                component: BudgetCostCenterListComponent,
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
export function budgetTableConfigFactory() {
    return budgetTableConfig;
}
export const budgetTableConfig = {
    table: {
        [OrganizationTableType.BUDGET]: {
            cells: ['name', 'active', 'amount', 'dateRange', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    amount: {
                        dataComponent: AmountCellComponent,
                    },
                    dateRange: {
                        dataComponent: DateRangeCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS]: {
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
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvYnVkZ2V0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXpGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBYztJQUN4QyxhQUFhLEVBQUU7UUFDYiwwQkFBMEIsRUFBRTtZQUMxQixTQUFTLEVBQUUsYUFBYTtZQUN4QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixXQUFXLEVBQUUsaUJBQWlCO2lCQUMvQjthQUNGO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFOzRCQUNWLFVBQVUsRUFBRSw0QkFBNEI7NEJBQ3hDLFFBQVEsRUFBRSwyQkFBMkI7eUJBQ3RDO3FCQUNGO2lCQUNGO2dCQUNELFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxTQUFTLEVBQUUsbUJBQW1CO3FCQUMvQjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsSUFBSSxZQUFZLENBQUMsVUFBVSxFQUFFO3dCQUNuQyxTQUFTLEVBQUUsc0JBQXNCO3dCQUNqQyxJQUFJLEVBQUU7NEJBQ0osVUFBVSxFQUFFO2dDQUNWLFVBQVUsRUFBRSwrQkFBK0I7NkJBQzVDO3lCQUNGO3dCQUNELFFBQVEsRUFBRTs0QkFDUjtnQ0FDRSxJQUFJLEVBQUUsTUFBTTtnQ0FDWixTQUFTLEVBQUUsbUJBQW1COzZCQUMvQjs0QkFDRDtnQ0FDRSxJQUFJLEVBQUUsY0FBYztnQ0FDcEIsU0FBUyxFQUFFLDZCQUE2Qjs2QkFDekM7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDaEM7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsd0JBQXdCO0lBQ3RDLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFnQjtJQUM1QyxLQUFLLEVBQUU7UUFDTCxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUM7WUFDeEQsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUU7d0JBQ0osYUFBYSxFQUFFLHVCQUF1QjtxQkFDdkM7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLGFBQWEsRUFBRSxtQkFBbUI7cUJBQ25DO29CQUNELE1BQU0sRUFBRTt3QkFDTixhQUFhLEVBQUUsbUJBQW1CO3FCQUNuQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxFQUFFLHNCQUFzQjtxQkFDdEM7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSxpQkFBaUI7cUJBQ2pDO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELENBQUMscUJBQXFCLENBQUMsNEJBQTRCLENBQUMsRUFBRTtZQUNwRCxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsOEJBQThCO3FCQUM5QztpQkFDRjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBUYWJsZUNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBNQVhfT0NDX0lOVEVHRVJfVkFMVUUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQ29zdENlbnRlckRldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vY29zdC1jZW50ZXIvZGV0YWlscy1jZWxsL2Nvc3QtY2VudGVyLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFjdGl2ZUxpbmtDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlJztcbmltcG9ydCB7IEFtb3VudENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvYW1vdW50L2Ftb3VudC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL2RhdGUtcmFuZ2UvZGF0ZS1yYW5nZS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0dXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3N0YXR1cy9zdGF0dXMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvdW5pdC91bml0LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1ZGdldENvc3RDZW50ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb3N0LWNlbnRlcnMvYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1ZGdldERldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2RldGFpbHMvYnVkZ2V0LWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1ZGdldEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vYnVkZ2V0LWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEJ1ZGdldEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9idWRnZXQtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1ZGdldExpc3RTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9idWRnZXQtbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEJ1ZGdldFJvdXRlUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvYnVkZ2V0LXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5cbmV4cG9ydCBjb25zdCBidWRnZXRDbXNDb25maWc6IENtc0NvbmZpZyA9IHtcbiAgY21zQ29tcG9uZW50czoge1xuICAgIE1hbmFnZUJ1ZGdldHNMaXN0Q29tcG9uZW50OiB7XG4gICAgICBjb21wb25lbnQ6IExpc3RDb21wb25lbnQsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IExpc3RTZXJ2aWNlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBCdWRnZXRMaXN0U2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBCdWRnZXRJdGVtU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjaGlsZFJvdXRlczoge1xuICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdCdWRnZXQuYnJlYWRjcnVtYnMubGlzdCcsXG4gICAgICAgICAgICAgIHJlc29sdmVyOiBCdWRnZXRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogJ2NyZWF0ZScsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEJ1ZGdldEZvcm1Db21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLmJ1ZGdldENvZGV9YCxcbiAgICAgICAgICAgIGNvbXBvbmVudDogQnVkZ2V0RGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgY3hQYWdlTWV0YToge1xuICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdCdWRnZXQuYnJlYWRjcnVtYnMuZGV0YWlscycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6IGBlZGl0YCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IEJ1ZGdldEZvcm1Db21wb25lbnQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnY29zdC1jZW50ZXJzJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IEJ1ZGdldENvc3RDZW50ZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBidWRnZXRUYWJsZUNvbmZpZ0ZhY3RvcnkoKTogVGFibGVDb25maWcge1xuICByZXR1cm4gYnVkZ2V0VGFibGVDb25maWc7XG59XG5cbmV4cG9ydCBjb25zdCBidWRnZXRUYWJsZUNvbmZpZzogVGFibGVDb25maWcgPSB7XG4gIHRhYmxlOiB7XG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5CVURHRVRdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGl2ZScsICdhbW91bnQnLCAnZGF0ZVJhbmdlJywgJ3VuaXQnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogU3RhdHVzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQW1vdW50Q2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGVSYW5nZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogRGF0ZVJhbmdlQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVuaXRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLkJVREdFVF9BU1NJR05FRF9DT1NUX0NFTlRFUlNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQ29zdENlbnRlckRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBwYWdlU2l6ZTogTUFYX09DQ19JTlRFR0VSX1ZBTFVFLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==