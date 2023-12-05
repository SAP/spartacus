/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
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
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserDetailsCellComponent } from '../user/details-cell/user-details-cell.component';
import { UserGroupDetailsComponent } from './details/user-group-details.component';
import { UserGroupFormComponent } from './form/user-group-form.component';
import { UserGroupAssignedPermissionListComponent } from './permissions/assigned/user-group-assigned-permission-list.component';
import { UserGroupPermissionListComponent } from './permissions/user-group-permission-list.component';
import { UserGroupItemService } from './services/user-group-item.service';
import { UserGroupListService } from './services/user-group-list.service';
import { UserGroupRoutePageMetaResolver } from './services/user-group-route-page-meta.resolver';
import { UserGroupAssignedUserListComponent } from './users/assigned/user-group-assigned-user-list.component';
import { UserGroupUserListComponent } from './users/user-group-user-list.component';
export const userGroupCmsConfig = {
    cmsComponents: {
        ManageUserGroupsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UserGroupListService,
                },
                {
                    provide: ItemService,
                    useExisting: UserGroupItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUserGroup.breadcrumbs.list',
                            resolver: UserGroupRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UserGroupFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.userGroupCode}`,
                        component: UserGroupDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: UserGroupFormComponent,
                            },
                            {
                                path: 'users',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.users' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserGroupAssignedUserListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserGroupUserListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'purchase-limits',
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgUserGroup.breadcrumbs.permissions',
                                    },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserGroupAssignedPermissionListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserGroupPermissionListComponent,
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
export function userGroupTableConfigFactory() {
    return userGroupTableConfig;
}
export const userGroupTableConfig = {
    table: {
        [OrganizationTableType.USER_GROUP]: {
            cells: ['name', 'uid', 'unit'],
            options: {
                dataComponent: CellComponent,
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_ASSIGNED_USERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
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
        [OrganizationTableType.USER_GROUP_USERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
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
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC91c2VyLWdyb3VwLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzlHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFB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U0FBUyxDQUFDO1lBQzFCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLGFBQWEsRUFBRSw4QkFBOEI7cUJBQzlDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxhQUFhLEVBQUUsbUJBQW1CO3FCQUNuQztpQkFDRjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBUYWJsZUNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBNQVhfT0NDX0lOVEVHRVJfVkFMVUUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vcGVybWlzc2lvbi9kZXRhaWxzLWNlbGwvcGVybWlzc2lvbi1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2xpc3QvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBc3NpZ25DZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3N1Yi1saXN0L2Fzc2lnbi1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9hY3RpdmUtbGluay9hY3RpdmUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL2NlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVuaXRDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3VuaXQvdW5pdC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyRGV0YWlsc0NlbGxDb21wb25lbnQgfSBmcm9tICcuLi91c2VyL2RldGFpbHMtY2VsbC91c2VyLWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckdyb3VwRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vZGV0YWlscy91c2VyLWdyb3VwLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJHcm91cEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vdXNlci1ncm91cC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyR3JvdXBBc3NpZ25lZFBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9ucy9hc3NpZ25lZC91c2VyLWdyb3VwLWFzc2lnbmVkLXBlcm1pc3Npb24tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckdyb3VwUGVybWlzc2lvbkxpc3RDb21wb25lbnQgfSBmcm9tICcuL3Blcm1pc3Npb25zL3VzZXItZ3JvdXAtcGVybWlzc2lvbi1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyR3JvdXBJdGVtU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXNlci1ncm91cC1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckdyb3VwTGlzdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItZ3JvdXAtbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJHcm91cFJvdXRlUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvdXNlci1ncm91cC1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXInO1xuaW1wb3J0IHsgVXNlckdyb3VwQXNzaWduZWRVc2VyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXNlcnMvYXNzaWduZWQvdXNlci1ncm91cC1hc3NpZ25lZC11c2VyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJHcm91cFVzZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91c2Vycy91c2VyLWdyb3VwLXVzZXItbGlzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgdXNlckdyb3VwQ21zQ29uZmlnOiBDbXNDb25maWcgPSB7XG4gIGNtc0NvbXBvbmVudHM6IHtcbiAgICBNYW5hZ2VVc2VyR3JvdXBzTGlzdENvbXBvbmVudDoge1xuICAgICAgY29tcG9uZW50OiBMaXN0Q29tcG9uZW50LFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogVXNlckdyb3VwTGlzdFNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogVXNlckdyb3VwSXRlbVNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgY2hpbGRSb3V0ZXM6IHtcbiAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY3hQYWdlTWV0YToge1xuICAgICAgICAgICAgICBicmVhZGNydW1iOiAnb3JnVXNlckdyb3VwLmJyZWFkY3J1bWJzLmxpc3QnLFxuICAgICAgICAgICAgICByZXNvbHZlcjogVXNlckdyb3VwUm91dGVQYWdlTWV0YVJlc29sdmVyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6ICdjcmVhdGUnLFxuICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyR3JvdXBGb3JtQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogYDoke1JPVVRFX1BBUkFNUy51c2VyR3JvdXBDb2RlfWAsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJHcm91cERldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGN4UGFnZU1ldGE6IHsgYnJlYWRjcnVtYjogJ29yZ1VzZXJHcm91cC5icmVhZGNydW1icy5kZXRhaWxzJyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnZWRpdCcsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyR3JvdXBGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3VzZXJzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVc2VyR3JvdXAuYnJlYWRjcnVtYnMudXNlcnMnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyR3JvdXBBc3NpZ25lZFVzZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2Fzc2lnbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckdyb3VwVXNlckxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAncHVyY2hhc2UtbGltaXRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdVc2VyR3JvdXAuYnJlYWRjcnVtYnMucGVybWlzc2lvbnMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJHcm91cEFzc2lnbmVkUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnYXNzaWduJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyR3JvdXBQZXJtaXNzaW9uTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdLFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlckdyb3VwVGFibGVDb25maWdGYWN0b3J5KCk6IFRhYmxlQ29uZmlnIHtcbiAgcmV0dXJuIHVzZXJHcm91cFRhYmxlQ29uZmlnO1xufVxuXG5leHBvcnQgY29uc3QgdXNlckdyb3VwVGFibGVDb25maWc6IFRhYmxlQ29uZmlnID0ge1xuICB0YWJsZToge1xuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9HUk9VUF06IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAndWlkJywgJ3VuaXQnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZGF0YUNvbXBvbmVudDogQ2VsbENvbXBvbmVudCxcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpZDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVuaXRDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0dST1VQX0FTU0lHTkVEX1VTRVJTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVXNlckRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQXNzaWduQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgcGFnZVNpemU6IE1BWF9PQ0NfSU5URUdFUl9WQUxVRSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9HUk9VUF9VU0VSU106IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFVzZXJEZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IEFzc2lnbkNlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfR1JPVVBfUEVSTUlTU0lPTlNdOiB7XG4gICAgICBjZWxsczogWydjb2RlJywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBjb2RlOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBQZXJtaXNzaW9uRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBBc3NpZ25DZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0dST1VQX0FTU0lHTkVEX1BFUk1JU1NJT05TXToge1xuICAgICAgY2VsbHM6IFsnY29kZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgY29kZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogUGVybWlzc2lvbkRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQXNzaWduQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgcGFnZVNpemU6IE1BWF9PQ0NfSU5URUdFUl9WQUxVRSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=