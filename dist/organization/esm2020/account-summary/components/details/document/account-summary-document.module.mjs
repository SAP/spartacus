/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { IconModule, PaginationModule, SortingModule, } from '@spartacus/storefront';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { AccountSummaryDocumentFilterModule } from './filter';
import * as i0 from "@angular/core";
export const accountSummaryDocumentCmsConfig = {
    cmsComponents: {
        AccountSummaryDocumentComponent: {
            component: AccountSummaryDocumentComponent,
            guards: [AuthGuard, AdminGuard],
        },
    },
};
export class AccountSummaryDocumentModule {
}
AccountSummaryDocumentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryDocumentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, declarations: [AccountSummaryDocumentComponent], imports: [AccountSummaryDocumentFilterModule,
        CommonModule,
        I18nModule,
        SortingModule,
        PaginationModule,
        IconModule] });
AccountSummaryDocumentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)], imports: [AccountSummaryDocumentFilterModule,
        CommonModule,
        I18nModule,
        SortingModule,
        PaginationModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryDocumentComponent],
                    imports: [
                        AccountSummaryDocumentFilterModule,
                        CommonModule,
                        I18nModule,
                        SortingModule,
                        PaginationModule,
                        IconModule,
                    ],
                    providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWRvY3VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWNjb3VudC1zdW1tYXJ5L2NvbXBvbmVudHMvZGV0YWlscy9kb2N1bWVudC9hY2NvdW50LXN1bW1hcnktZG9jdW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU5RCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBYztJQUN4RCxhQUFhLEVBQUU7UUFDYiwrQkFBK0IsRUFBRTtZQUMvQixTQUFTLEVBQUUsK0JBQStCO1lBQzFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7U0FDaEM7S0FDRjtDQUNGLENBQUM7QUFjRixNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBWHhCLCtCQUErQixhQUU1QyxrQ0FBa0M7UUFDbEMsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFVBQVU7MEhBSUQsNEJBQTRCLGFBRjVCLENBQUMsb0JBQW9CLENBQUMsK0JBQStCLENBQUMsQ0FBQyxZQVBoRSxrQ0FBa0M7UUFDbEMsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLFVBQVU7MkZBSUQsNEJBQTRCO2tCQVp4QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMvQyxPQUFPLEVBQUU7d0JBQ1Asa0NBQWtDO3dCQUNsQyxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsK0JBQStCLENBQUMsQ0FBQztpQkFDbkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEFkbWluR3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIFBhZ2luYXRpb25Nb2R1bGUsXG4gIFNvcnRpbmdNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBBY2NvdW50U3VtbWFyeURvY3VtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hY2NvdW50LXN1bW1hcnktZG9jdW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFjY291bnRTdW1tYXJ5RG9jdW1lbnRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2ZpbHRlcic7XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50U3VtbWFyeURvY3VtZW50Q21zQ29uZmlnOiBDbXNDb25maWcgPSB7XG4gIGNtc0NvbXBvbmVudHM6IHtcbiAgICBBY2NvdW50U3VtbWFyeURvY3VtZW50Q29tcG9uZW50OiB7XG4gICAgICBjb21wb25lbnQ6IEFjY291bnRTdW1tYXJ5RG9jdW1lbnRDb21wb25lbnQsXG4gICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdLFxuICAgIH0sXG4gIH0sXG59O1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBY2NvdW50U3VtbWFyeURvY3VtZW50Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIEFjY291bnRTdW1tYXJ5RG9jdW1lbnRGaWx0ZXJNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgU29ydGluZ01vZHVsZSxcbiAgICBQYWdpbmF0aW9uTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnKGFjY291bnRTdW1tYXJ5RG9jdW1lbnRDbXNDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFN1bW1hcnlEb2N1bWVudE1vZHVsZSB7fVxuIl19