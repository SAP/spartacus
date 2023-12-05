/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY } from '@spartacus/organization/account-summary/core';
import { ItemService, ListService, OrganizationTableType, ToggleLinkCellComponent, } from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { AccountSummaryDocumentComponent } from '../details/document/account-summary-document.component';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { AccountSummaryItemService } from '../services/account-summary-item.service';
import { AccountSummaryUnitListService } from '../services/account-summary-unit-list.service';
import { BREAKPOINT, TableLayout } from '@spartacus/storefront';
export const ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY = 'orgAccountSummaryList.breadcrumbs.details';
export function accountSummaryUnitsTableConfigFactory() {
    return {
        table: {
            [OrganizationTableType.ACCOUNT_SUMMARY_UNIT]: {
                cells: ['name'],
                options: {
                    layout: TableLayout.VERTICAL,
                    cells: {
                        name: {
                            dataComponent: ToggleLinkCellComponent,
                        },
                    },
                },
                [BREAKPOINT.lg]: {
                    cells: ['name'],
                },
            },
        },
    };
}
export const accountSummaryListCmsConfig = {
    cmsComponents: {
        ManageAccountSummaryListComponent: {
            component: AccountSummaryListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: AccountSummaryUnitListService,
                },
                {
                    provide: ItemService,
                    useExisting: AccountSummaryItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY,
                        },
                    },
                },
                children: [
                    {
                        path: `:${ROUTE_PARAMS.unitCode}`,
                        component: AccountSummaryDocumentComponent,
                        data: {
                            cxPageMeta: {
                                breadcrumb: ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY,
                            },
                        },
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWxpc3QuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvY29tcG9uZW50cy9saXN0L2FjY291bnQtc3VtbWFyeS1saXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3BHLE9BQU8sRUFDTCxXQUFXLEVBQ1gsV0FBVyxFQUNYLHFCQUFxQixFQUNyQix1QkFBdUIsR0FDeEIsTUFBTSxtREFBbUQsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxVQUFVLEVBQWUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0UsTUFBTSxDQUFDLE1BQU0sdUNBQXVDLEdBQ2xELDJDQUEyQyxDQUFDO0FBRTlDLE1BQU0sVUFBVSxxQ0FBcUM7SUFDbkQsT0FBTztRQUNMLEtBQUssRUFBRTtZQUNMLENBQUMscUJBQXFCLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCxNQUFNLEVBQUUsV0FBVyxDQUFDLFFBQVE7b0JBQzVCLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUU7NEJBQ0osYUFBYSxFQUFFLHVCQUF1Qjt5QkFDdkM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUNoQjthQUNGO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFjO0lBQ3BELGFBQWEsRUFBRTtRQUNiLGlDQUFpQyxFQUFFO1lBQ2pDLFNBQVMsRUFBRSwyQkFBMkI7WUFDdEMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixXQUFXLEVBQUUsNkJBQTZCO2lCQUMzQztnQkFDRDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsV0FBVyxFQUFFLHlCQUF5QjtpQkFDdkM7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFO3dCQUNKLFVBQVUsRUFBRTs0QkFDVixVQUFVLEVBQUUsb0NBQW9DO3lCQUNqRDtxQkFDRjtpQkFDRjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTt3QkFDakMsU0FBUyxFQUFFLCtCQUErQjt3QkFDMUMsSUFBSSxFQUFFOzRCQUNKLFVBQVUsRUFBRTtnQ0FDVixVQUFVLEVBQUUsdUNBQXVDOzZCQUNwRDt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1lBQ0QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztTQUNoQztLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEF1dGhHdWFyZCwgQ21zQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEFDQ09VTlRfU1VNTUFSWV9MSVNUX1RSQU5TTEFUSU9OX0tFWSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9jb3JlJztcbmltcG9ydCB7XG4gIEl0ZW1TZXJ2aWNlLFxuICBMaXN0U2VydmljZSxcbiAgT3JnYW5pemF0aW9uVGFibGVUeXBlLFxuICBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IEFjY291bnRTdW1tYXJ5RG9jdW1lbnRDb21wb25lbnQgfSBmcm9tICcuLi9kZXRhaWxzL2RvY3VtZW50L2FjY291bnQtc3VtbWFyeS1kb2N1bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9hY2NvdW50LXN1bW1hcnktbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlJdGVtU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjY291bnQtc3VtbWFyeS1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlVbml0TGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY2NvdW50LXN1bW1hcnktdW5pdC1saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQlJFQUtQT0lOVCwgVGFibGVDb25maWcsIFRhYmxlTGF5b3V0IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcblxuZXhwb3J0IGNvbnN0IEFDQ09VTlRfU1VNTUFSWV9ERVRBSUxTX1RSQU5TTEFUSU9OX0tFWSA9XG4gICdvcmdBY2NvdW50U3VtbWFyeUxpc3QuYnJlYWRjcnVtYnMuZGV0YWlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY2NvdW50U3VtbWFyeVVuaXRzVGFibGVDb25maWdGYWN0b3J5KCk6IFRhYmxlQ29uZmlnIHtcbiAgcmV0dXJuIHtcbiAgICB0YWJsZToge1xuICAgICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5BQ0NPVU5UX1NVTU1BUllfVU5JVF06IHtcbiAgICAgICAgY2VsbHM6IFsnbmFtZSddLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgbGF5b3V0OiBUYWJsZUxheW91dC5WRVJUSUNBTCxcbiAgICAgICAgICBjZWxsczoge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW0JSRUFLUE9JTlQubGddOiB7XG4gICAgICAgICAgY2VsbHM6IFsnbmFtZSddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgYWNjb3VudFN1bW1hcnlMaXN0Q21zQ29uZmlnOiBDbXNDb25maWcgPSB7XG4gIGNtc0NvbXBvbmVudHM6IHtcbiAgICBNYW5hZ2VBY2NvdW50U3VtbWFyeUxpc3RDb21wb25lbnQ6IHtcbiAgICAgIGNvbXBvbmVudDogQWNjb3VudFN1bW1hcnlMaXN0Q29tcG9uZW50LFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogQWNjb3VudFN1bW1hcnlVbml0TGlzdFNlcnZpY2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogQWNjb3VudFN1bW1hcnlJdGVtU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjaGlsZFJvdXRlczoge1xuICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgIGJyZWFkY3J1bWI6IEFDQ09VTlRfU1VNTUFSWV9MSVNUX1RSQU5TTEFUSU9OX0tFWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLnVuaXRDb2RlfWAsXG4gICAgICAgICAgICBjb21wb25lbnQ6IEFjY291bnRTdW1tYXJ5RG9jdW1lbnRDb21wb25lbnQsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGN4UGFnZU1ldGE6IHtcbiAgICAgICAgICAgICAgICBicmVhZGNydW1iOiBBQ0NPVU5UX1NVTU1BUllfREVUQUlMU19UUkFOU0xBVElPTl9LRVksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBBZG1pbkd1YXJkXSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==