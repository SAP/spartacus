/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard, UserGuard, } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { PermissionDetailsCellComponent } from '../permission/details-cell/permission-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { RolesCellComponent } from '../shared/table/roles/roles-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserGroupDetailsCellComponent } from '../user-group/details-cell/user-group-details-cell.component';
import { UserAssignedApproverListComponent } from './approvers/assigned/user-assigned-approver-list.component';
import { UserApproverListComponent } from './approvers/user-approver-list.component';
import { UserChangePasswordFormComponent } from './change-password-form/user-change-password-form.component';
import { UserDetailsCellComponent } from './details-cell/user-details-cell.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserFormComponent } from './form/user-form.component';
import { UserAssignedPermissionListComponent } from './permissions/assigned/user-assigned-permission-list.component';
import { UserPermissionListComponent } from './permissions/user-permission-list.component';
import { UserItemService } from './services/user-item.service';
import { UserListService } from './services/user-list.service';
import { UserRoutePageMetaResolver } from './services/user-route-page-meta.resolver';
import { UserUserGroupListComponent } from './user-groups';
import { UserAssignedUserGroupListComponent } from './user-groups/assigned/user-assigned-user-group-list.component';
export const userCmsConfig = {
    cmsComponents: {
        ManageUsersListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UserListService,
                },
                {
                    provide: ItemService,
                    useExisting: UserItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUser.breadcrumbs.list',
                            resolver: UserRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UserFormComponent,
                        canActivate: [UserGuard],
                    },
                    {
                        path: `:${ROUTE_PARAMS.userCode}`,
                        component: UserDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: `edit`,
                                component: UserFormComponent,
                                canActivate: [UserGuard],
                            },
                            {
                                path: `change-password`,
                                component: UserChangePasswordFormComponent,
                                canActivate: [UserGuard],
                            },
                            {
                                path: 'user-groups',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.userGroups' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedUserGroupListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserUserGroupListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'approvers',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.approvers' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedApproverListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserApproverListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'purchase-limits',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.permissions' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedPermissionListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserPermissionListComponent,
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
export function userTableConfigFactory() {
    return userTableConfig;
}
const actions = {
    dataComponent: AssignCellComponent,
};
const pagination = {
    pageSize: MAX_OCC_INTEGER_VALUE,
};
export const userTableConfig = {
    table: {
        [OrganizationTableType.USER]: {
            cells: ['name', 'active', 'uid', 'roles', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                    roles: {
                        dataComponent: RolesCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci91c2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxHQUNWLE1BQU0sNkNBQTZDLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUM5RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOERBQThE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QzFCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSw4QkFBOEI7cUJBQzlDO29CQUNELE9BQU87aUJBQ1I7YUFDRjtTQUNGO1FBQ0QsQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1lBQ2pELEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDMUIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUU7d0JBQ0osYUFBYSxFQUFFLDhCQUE4QjtxQkFDOUM7b0JBQ0QsT0FBTztpQkFDUjtnQkFDRCxVQUFVO2FBQ1g7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEF1dGhHdWFyZCwgQ21zQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEFkbWluR3VhcmQsXG4gIFVzZXJHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IFRhYmxlQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE1BWF9PQ0NfSU5URUdFUl9WQUxVRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGV0YWlsc0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi9wZXJtaXNzaW9uL2RldGFpbHMtY2VsbC9wZXJtaXNzaW9uLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFzc2lnbkNlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvc3ViLWxpc3QvYXNzaWduLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGl2ZUxpbmtDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL2FjdGl2ZS1saW5rL2FjdGl2ZS1saW5rLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9sZXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3JvbGVzL3JvbGVzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXR1c0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvc3RhdHVzL3N0YXR1cy1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0Q2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS91bml0L3VuaXQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckdyb3VwRGV0YWlsc0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi91c2VyLWdyb3VwL2RldGFpbHMtY2VsbC91c2VyLWdyb3VwLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckFzc2lnbmVkQXBwcm92ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hcHByb3ZlcnMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC1hcHByb3Zlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyQXBwcm92ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hcHByb3ZlcnMvdXNlci1hcHByb3Zlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyQ2hhbmdlUGFzc3dvcmRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jaGFuZ2UtcGFzc3dvcmQtZm9ybS91c2VyLWNoYW5nZS1wYXNzd29yZC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyRGV0YWlsc0NlbGxDb21wb25lbnQgfSBmcm9tICcuL2RldGFpbHMtY2VsbC91c2VyLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckRldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2RldGFpbHMvdXNlci1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS91c2VyLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJBc3NpZ25lZFBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9ucy9hc3NpZ25lZC91c2VyLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9ucy91c2VyLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTGlzdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItcm91dGUtcGFnZS1tZXRhLnJlc29sdmVyJztcbmltcG9ydCB7IFVzZXJVc2VyR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWdyb3Vwcyc7XG5pbXBvcnQgeyBVc2VyQXNzaWduZWRVc2VyR3JvdXBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWdyb3Vwcy9hc3NpZ25lZC91c2VyLWFzc2lnbmVkLXVzZXItZ3JvdXAtbGlzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgdXNlckNtc0NvbmZpZzogQ21zQ29uZmlnID0ge1xuICBjbXNDb21wb25lbnRzOiB7XG4gICAgTWFuYWdlVXNlcnNMaXN0Q29tcG9uZW50OiB7XG4gICAgICBjb21wb25lbnQ6IExpc3RDb21wb25lbnQsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IExpc3RTZXJ2aWNlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBVc2VyTGlzdFNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogVXNlckl0ZW1TZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGNoaWxkUm91dGVzOiB7XG4gICAgICAgIHBhcmVudDoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGN4UGFnZU1ldGE6IHtcbiAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ29yZ1VzZXIuYnJlYWRjcnVtYnMubGlzdCcsXG4gICAgICAgICAgICAgIHJlc29sdmVyOiBVc2VyUm91dGVQYWdlTWV0YVJlc29sdmVyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICdjcmVhdGUnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyRm9ybUNvbXBvbmVudCxcbiAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlckd1YXJkXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6IGA6JHtST1VURV9QQVJBTVMudXNlckNvZGV9YCxcbiAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckRldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGN4UGFnZU1ldGE6IHsgYnJlYWRjcnVtYjogJ29yZ1VzZXIuYnJlYWRjcnVtYnMuZGV0YWlscycgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogYGVkaXRgLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckZvcm1Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtVc2VyR3VhcmRdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogYGNoYW5nZS1wYXNzd29yZGAsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyQ2hhbmdlUGFzc3dvcmRGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlckd1YXJkXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICd1c2VyLWdyb3VwcycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY3hQYWdlTWV0YTogeyBicmVhZGNydW1iOiAnb3JnVXNlci5icmVhZGNydW1icy51c2VyR3JvdXBzJyB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckFzc2lnbmVkVXNlckdyb3VwTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdhc3NpZ24nLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJVc2VyR3JvdXBMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ2FwcHJvdmVycycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY3hQYWdlTWV0YTogeyBicmVhZGNydW1iOiAnb3JnVXNlci5icmVhZGNydW1icy5hcHByb3ZlcnMnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyQXNzaWduZWRBcHByb3Zlckxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnYXNzaWduJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyQXBwcm92ZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3B1cmNoYXNlLWxpbWl0cycsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY3hQYWdlTWV0YTogeyBicmVhZGNydW1iOiAnb3JnVXNlci5icmVhZGNydW1icy5wZXJtaXNzaW9ucycgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJBc3NpZ25lZFBlcm1pc3Npb25MaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2Fzc2lnbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlclBlcm1pc3Npb25MaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGd1YXJkczogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyVGFibGVDb25maWdGYWN0b3J5KCk6IFRhYmxlQ29uZmlnIHtcbiAgcmV0dXJuIHVzZXJUYWJsZUNvbmZpZztcbn1cblxuY29uc3QgYWN0aW9ucyA9IHtcbiAgZGF0YUNvbXBvbmVudDogQXNzaWduQ2VsbENvbXBvbmVudCxcbn07XG5cbmNvbnN0IHBhZ2luYXRpb24gPSB7XG4gIHBhZ2VTaXplOiBNQVhfT0NDX0lOVEVHRVJfVkFMVUUsXG59O1xuXG5leHBvcnQgY29uc3QgdXNlclRhYmxlQ29uZmlnOiBUYWJsZUNvbmZpZyA9IHtcbiAgdGFibGU6IHtcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGl2ZScsICd1aWQnLCAncm9sZXMnLCAndW5pdCddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IEFjdGl2ZUxpbmtDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBTdGF0dXNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdWlkOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcm9sZXM6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFJvbGVzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVuaXRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0FQUFJPVkVSU106IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVzZXJEZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0FTU0lHTkVEX0FQUFJPVkVSU106IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVzZXJEZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX1VTRVJfR1JPVVBTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVXNlckdyb3VwRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9BU1NJR05FRF9VU0VSX0dST1VQU106IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVzZXJHcm91cERldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfUEVSTUlTU0lPTlNdOiB7XG4gICAgICBjZWxsczogWydjb2RlJywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBjb2RlOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBQZXJtaXNzaW9uRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9BU1NJR05FRF9QRVJNSVNTSU9OU106IHtcbiAgICAgIGNlbGxzOiBbJ2NvZGUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIGNvZGU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFBlcm1pc3Npb25EZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl19