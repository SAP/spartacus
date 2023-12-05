/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { LimitCellComponent } from '../shared/table/limit/limit-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { PermissionDetailsComponent } from './details/permission-details.component';
import { PermissionFormComponent } from './form/permission-form.component';
import { PermissionItemService } from './services/permission-item.service';
import { PermissionListService } from './services/permission-list.service';
import { PermissionRoutePageMetaResolver } from './services/permission-route-page-meta.resolver';
export const permissionCmsConfig = {
    cmsComponents: {
        ManagePermissionsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: PermissionListService,
                },
                {
                    provide: ItemService,
                    useExisting: PermissionItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgPurchaseLimit.breadcrumbs.list',
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
                            cxPageMeta: {
                                breadcrumb: 'orgPurchaseLimit.breadcrumbs.details',
                            },
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
export function permissionTableConfigFactory() {
    return permissionTableConfig;
}
export const permissionTableConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9wZXJtaXNzaW9uLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFakcsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWM7SUFDNUMsYUFBYSxFQUFFO1FBQ2IsOEJBQThCLEVBQUU7WUFDOUIsU0FBUyxFQUFFLGFBQWE7WUFDeEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixXQUFXLEVBQUUscUJBQXFCO2lCQUNuQztnQkFDRDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsV0FBVyxFQUFFLHFCQUFxQjtpQkFDbkM7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFO3dCQUNKLFVBQVUsRUFBRTs0QkFDVixVQUFVLEVBQUUsbUNBQW1DOzRCQUMvQyxRQUFRLEVBQUUsK0JBQStCO3lCQUMxQztxQkFDRjtpQkFDRjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsU0FBUyxFQUFFLHVCQUF1QjtxQkFDbkM7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDLGNBQWMsRUFBRTt3QkFDdkMsU0FBUyxFQUFFLDBCQUEwQjt3QkFDckMsSUFBSSxFQUFFOzRCQUNKLFVBQVUsRUFBRTtnQ0FDVixVQUFVLEVBQUUsc0NBQXNDOzZCQUNuRDt5QkFDRjt3QkFDRCxRQUFRLEVBQUU7NEJBQ1I7Z0NBQ0UsSUFBSSxFQUFFLE1BQU07Z0NBQ1osU0FBUyxFQUFFLHVCQUF1Qjs2QkFDbkM7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDaEM7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsNEJBQTRCO0lBQzFDLE9BQU8scUJBQXFCLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFnQjtJQUNoRCxLQUFLLEVBQUU7UUFDTCxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUMxQyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsdUJBQXVCO3FCQUN2QztvQkFDRCxNQUFNLEVBQUU7d0JBQ04sYUFBYSxFQUFFLG1CQUFtQjtxQkFDbkM7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSxpQkFBaUI7cUJBQ2pDO29CQUNELEtBQUssRUFBRTt3QkFDTCxhQUFhLEVBQUUsa0JBQWtCO3FCQUNsQztpQkFDRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBdXRoR3VhcmQsIENtc0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IFRhYmxlQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2xpc3QvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9hY3RpdmUtbGluay9hY3RpdmUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW1pdENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvbGltaXQvbGltaXQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhdHVzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9zdGF0dXMvc3RhdHVzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3VuaXQvdW5pdC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vZGV0YWlscy9wZXJtaXNzaW9uLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1pc3Npb25Gb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL3Blcm1pc3Npb24tZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uTGlzdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3Blcm1pc3Npb24tbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFBlcm1pc3Npb25Sb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL3Blcm1pc3Npb24tcm91dGUtcGFnZS1tZXRhLnJlc29sdmVyJztcblxuZXhwb3J0IGNvbnN0IHBlcm1pc3Npb25DbXNDb25maWc6IENtc0NvbmZpZyA9IHtcbiAgY21zQ29tcG9uZW50czoge1xuICAgIE1hbmFnZVBlcm1pc3Npb25zTGlzdENvbXBvbmVudDoge1xuICAgICAgY29tcG9uZW50OiBMaXN0Q29tcG9uZW50LFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogUGVybWlzc2lvbkxpc3RTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IFBlcm1pc3Npb25JdGVtU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjaGlsZFJvdXRlczoge1xuICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdQdXJjaGFzZUxpbWl0LmJyZWFkY3J1bWJzLmxpc3QnLFxuICAgICAgICAgICAgICByZXNvbHZlcjogUGVybWlzc2lvblJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogUGVybWlzc2lvbkZvcm1Db21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLnBlcm1pc3Npb25Db2RlfWAsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFBlcm1pc3Npb25EZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ29yZ1B1cmNoYXNlTGltaXQuYnJlYWRjcnVtYnMuZGV0YWlscycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdlZGl0JyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFBlcm1pc3Npb25Gb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJtaXNzaW9uVGFibGVDb25maWdGYWN0b3J5KCk6IFRhYmxlQ29uZmlnIHtcbiAgcmV0dXJuIHBlcm1pc3Npb25UYWJsZUNvbmZpZztcbn1cblxuZXhwb3J0IGNvbnN0IHBlcm1pc3Npb25UYWJsZUNvbmZpZzogVGFibGVDb25maWcgPSB7XG4gIHRhYmxlOiB7XG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5QRVJNSVNTSU9OXToge1xuICAgICAgY2VsbHM6IFsnY29kZScsICdhY3RpdmUnLCAnbGltaXQnLCAndW5pdCddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIGNvZGU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IEFjdGl2ZUxpbmtDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBTdGF0dXNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdW5pdDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVW5pdENlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsaW1pdDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogTGltaXRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19